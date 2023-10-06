-- Tablas

CREATE TABLE company (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id),
  disabled_at TIMESTAMPTZ,
  disabled_by UUID REFERENCES auth.users(id)
);

CREATE TYPE USER_TYPE AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

CREATE TABLE app_user (
  id UUID PRIMARY KEY NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES company(id),
  first_name TEXT,
	last_name TEXT,
  email TEXT NOT NULL,
  type USER_TYPE NOT NULL DEFAULT 'USER',
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  is_super_admin BOOLEAN NOT NULL DEFAULT FALSE,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id),
  disabled_at TIMESTAMPTZ,
  disabled_by UUID REFERENCES auth.users(id)
);

CREATE TABLE employee (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
	company_id UUID REFERENCES company(id) NOT NULL,
  first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	birth_date DATE,
	address TEXT,
	phone TEXT,
	email TEXT,
	photo_url TEXT,
	hire_date DATE NOT NULL,
	termination_date DATE,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id),
  disabled_at TIMESTAMPTZ,
  disabled_by UUID REFERENCES auth.users(id)
);

CREATE TABLE spouse (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES company(id) NOT NULL,
	employee_id UUID REFERENCES employee(id) NOT NULL,
  first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id),
  disabled_at TIMESTAMPTZ,
  disabled_by UUID REFERENCES auth.users(id)
);

CREATE TABLE child (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES company(id) NOT NULL,
	employee_id UUID REFERENCES employee(id) NOT NULL,
  first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id),
  disabled_at TIMESTAMPTZ,
  disabled_by UUID REFERENCES auth.users(id)
);

CREATE TABLE department (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES company(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id)
);

CREATE TABLE job (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES company(id) NOT NULL,
  department_id UUID REFERENCES department(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  base_salary NUMERIC(10, 2),
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id)
);

CREATE TABLE employee_job (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES company(id) NOT NULL,
  employee_id UUID REFERENCES employee(id) NOT NULL,
  job_id UUID REFERENCES job(id) NOT NULL,
  current_salary NUMERIC(10, 2),
  start_date DATE NOT NULL,
	end_date DATE,
  is_current_job BOOLEAN NOT NULL DEFAULT TRUE,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id)
);

CREATE TABLE raise (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES company(id) NOT NULL,
  employee_job_id UUID REFERENCES employee_job(id) NOT NULL,
  raise_amount NUMERIC(10, 2),
  raise_date DATE NOT NULL,
  description TEXT,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id)
);

CREATE TABLE work_absences (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES company(id) NOT NULL,
  employee_id UUID REFERENCES employee(id) NOT NULL,
  type TEXT NOT NULL,
  absence_date DATE NOT NULL,
  request_url TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  is_with_pay BOOLEAN NOT NULL DEFAULT FALSE,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id)
);

CREATE TYPE OVERTIME_TYPE AS ENUM ('SIMPLE', 'DOUBLE');

CREATE TABLE overtime (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES company(id) NOT NULL,
  employee_id UUID REFERENCES employee(id) NOT NULL,
  type OVERTIME_TYPE NOT NULL,
  date DATE NOT NULL,
  quantity INTEGER NOT NULL,
  is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'utc'),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ,
  updated_by UUID REFERENCES auth.users(id)
);

-- Funciones

CREATE FUNCTION public.get_current_company_id()
RETURNS UUID
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN ((SELECT (auth.jwt() -> 'user_metadata' ->> 'company_id')::UUID));
END
$$;

CREATE FUNCTION public.get_is_super_admin()
RETURNS BOOLEAN
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN ((SELECT (auth.jwt() -> 'user_metadata' ->> 'is_super_admin')::BOOLEAN));
END
$$;

CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET SEARCH_PATH = public
AS $$
BEGIN
  IF (new.raw_user_meta_data->>'is_super_admin')::BOOLEAN IS TRUE THEN
    INSERT INTO public.app_user (id, email, is_super_admin, type)
    VALUES (new.id, new.email, (new.raw_user_meta_data->>'is_super_admin')::BOOLEAN, 'SUPER_ADMIN');
  ELSIF (new.raw_user_meta_data->>'is_admin')::BOOLEAN IS TRUE AND new.raw_user_meta_data->>'company_id' IS NOT NULL THEN
    INSERT INTO public.app_user (id, email, is_admin, company_id, type)
    VALUES (new.id, new.email, (new.raw_user_meta_data->>'is_admin')::BOOLEAN, (new.raw_user_meta_data->>'company_id')::UUID, 'ADMIN');
  ELSE
    INSERT INTO public.app_user (id, email, company_id, type)
    VALUES (new.id, new.email, (new.raw_user_meta_data->>'company_id')::UUID, 'USER');
  END IF;

  RETURN NEW;
END
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- Establecer el current_salary por defecto

CREATE OR REPLACE FUNCTION set_current_salary()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE employee_job
  SET current_salary = j.base_salary
  FROM job j
  WHERE employee_job.job_id = j.id
    AND employee_job.id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER on_set_current_salary
AFTER INSERT ON employee_job
FOR EACH ROW
EXECUTE FUNCTION set_current_salary();


-- Activar Row Level Security (RLS) en todas las tablas

DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', table_name);
  END LOOP;
END$$;

-- Politicas

-- Politica de super admin para los usuarios autorizados
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('CREATE POLICY super_admin_policy ON %I FOR ALL TO authenticated USING (get_is_super_admin() = TRUE)', table_name);
  END LOOP;
END$$;

-- Politica para acceder solo a la información de la empresa a la que pertenece el usuario
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    IF table_name <> 'company' THEN
      EXECUTE format('CREATE POLICY %1$s_policy ON %1$I USING (company_id = get_current_company_id()) WITH CHECK (company_id = get_current_company_id())', table_name);
    ELSE
      EXECUTE format('CREATE POLICY %1$s_policy ON %1$I USING (id = get_current_company_id()) WITH CHECK (true)', table_name);
    END IF;
  END LOOP;
END$$;

-- Politica para dar acceso a los buckets de Supabase

CREATE POLICY "Give access to the storage.buckets table to authenticated users"
ON storage.buckets
AS PERMISSIVE FOR ALL
TO authenticated
USING (TRUE)
WITH CHECK (TRUE);

CREATE POLICY "Give access to the storage.objects table to authenticated users"
ON storage.objects
AS PERMISSIVE FOR ALL
TO public
USING (TRUE)
WITH CHECK (TRUE);
