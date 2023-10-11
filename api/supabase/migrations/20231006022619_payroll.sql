CREATE TABLE payroll (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES company(id) NOT NULL,
	payroll_date DATE NOT NULL,
	payroll_data JSONB NOT NULL,
  is_closed BOOLEAN NOT NULL DEFAULT TRUE,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id),
  disabled_at TIMESTAMPTZ,
  disabled_by UUID REFERENCES auth.users(id)
);

-- Dias no laborados
CREATE OR REPLACE FUNCTION monthly_unpaid_absence_count(
  p_employee_id UUID,
  p_start_date DATE,
  p_end_date DATE
) RETURNS INTEGER AS $$
DECLARE
    counter INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO counter
    FROM work_absences wa
    WHERE wa.employee_id = p_employee_id
        AND wa.absence_date BETWEEN p_start_date AND p_end_date
        AND wa.is_approved = TRUE
        AND wa.is_with_pay = FALSE
        AND wa.is_disabled = FALSE;
    
    RETURN counter;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION monthly_discount_for_absences(
  p_employee_id UUID,
  p_start_date DATE,
  p_end_date DATE
) RETURNS NUMERIC AS $$
DECLARE
    discount NUMERIC(10, 2);
BEGIN
    SELECT
    ROUND((ej.current_salary / 30) * (SELECT monthly_unpaid_absence_count(
        p_employee_id,
        p_start_date,
        p_end_date
    )), 2)
    INTO discount
    FROM employee e
    INNER JOIN employee_job ej ON ej.employee_id = e.id
    WHERE e.id = p_employee_id;
    
    RETURN discount;
END;
$$ LANGUAGE plpgsql;

-- Horas extras simples

CREATE OR REPLACE FUNCTION monthly_simple_overtime_count(
  p_employee_id UUID,
  p_start_date DATE,
  p_end_date DATE
) RETURNS INT AS $$
DECLARE
    counter INT;
BEGIN
    SELECT COALESCE(SUM(o.quantity), 0)
    INTO counter
    FROM overtime o
    WHERE o.employee_id = p_employee_id
        AND o.date BETWEEN p_start_date AND p_end_date
        AND o.type = 'SIMPLE'
        AND o.is_disabled = FALSE;
    
    RETURN counter;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION monthly_simple_overtime(
  p_employee_id UUID,
  p_start_date DATE,
  p_end_date DATE
) RETURNS NUMERIC AS $$
DECLARE
    overtime NUMERIC(10, 2);
BEGIN
    SELECT
    COALESCE(ROUND((ej.current_salary / 30 / 8 * 1.5) * (SELECT monthly_simple_overtime_count(
        p_employee_id,
        p_start_date,
        p_end_date
    )), 2), 0)
    INTO overtime
    FROM employee e
    INNER JOIN employee_job ej ON ej.employee_id = e.id
    WHERE e.id = p_employee_id;
    
    RETURN overtime;
END;
$$ LANGUAGE plpgsql;

-- Horas extras dobles

CREATE OR REPLACE FUNCTION monthly_double_overtime_count(
  p_employee_id UUID,
  p_start_date DATE,
  p_end_date DATE
) RETURNS INT AS $$
DECLARE
    counter INT;
BEGIN
    SELECT COALESCE(SUM(o.quantity), 0)
    INTO counter
    FROM overtime o
    WHERE o.employee_id = p_employee_id
        AND o.date BETWEEN p_start_date AND p_end_date
        AND o.type = 'DOUBLE'
        AND o.is_disabled = FALSE;
    
    RETURN counter;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION monthly_double_overtime(
  p_employee_id UUID,
  p_start_date DATE,
  p_end_date DATE
) RETURNS NUMERIC AS $$
DECLARE
    overtime NUMERIC(10, 2);
BEGIN
    SELECT
    COALESCE(ROUND((ej.current_salary / 30 / 8 * 2) * (SELECT monthly_double_overtime_count(
        p_employee_id,
        p_start_date,
        p_end_date
    )), 2), 0)
    INTO overtime
    FROM employee e
    INNER JOIN employee_job ej ON ej.employee_id = e.id
    WHERE e.id = p_employee_id;
    
    RETURN overtime;
END;
$$ LANGUAGE plpgsql;

-- Calculo de la nomina mensual por empleado

CREATE OR REPLACE FUNCTION calculate_monthly_payroll(
    p_employee_id UUID,
    p_start_date DATE,
    p_end_date DATE
) RETURNS TABLE (
    full_name TEXT,
    base_salary NUMERIC(10, 2),
    days_worked INT,
    absences INT,
    absences_discount NUMERIC(10, 2),
    igss_discount NUMERIC(10, 2),
    simple_overtime_count INT,
    simple_overtime_total NUMERIC(10, 2),
    double_overtime_count INT,
    double_overtime_total NUMERIC(10, 2),
    total_liquid NUMERIC(10, 2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    CONCAT(e.first_name, ' ', e.last_name) AS full_name,
    ej.current_salary AS base_salary,
    (30 - (SELECT monthly_unpaid_absence_count(p_employee_id, p_start_date, p_end_date))) as days_worked,
    (SELECT monthly_unpaid_absence_count(p_employee_id, p_start_date, p_end_date)) AS absences,
    (SELECT monthly_discount_for_absences(p_employee_id, p_start_date, p_end_date)) AS absences_discount,
    ROUND((ej.current_salary * 0.0487), 2) AS igss_discount,
    (SELECT monthly_simple_overtime_count(p_employee_id, p_start_date, p_end_date)) AS simple_overtime_count,
    (SELECT monthly_simple_overtime(p_employee_id, p_start_date, p_end_date)) AS simple_overtime_total,
    (SELECT monthly_double_overtime_count(p_employee_id, p_start_date, p_end_date)) AS double_overtime_count,
    (SELECT monthly_double_overtime(p_employee_id, p_start_date, p_end_date)) AS double_overtime_total,
    (ej.current_salary - (SELECT monthly_discount_for_absences(p_employee_id, p_start_date, p_end_date)) - ROUND((ej.current_salary * 0.0487), 2) +
    (SELECT monthly_simple_overtime(p_employee_id, p_start_date, p_end_date)) +
    (SELECT monthly_double_overtime(p_employee_id, p_start_date, p_end_date))) as total_liquid
  FROM employee e
  INNER JOIN employee_job ej ON ej.employee_id = e.id
  WHERE e.id = p_employee_id;
END;
$$ LANGUAGE plpgsql;