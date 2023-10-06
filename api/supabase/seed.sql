INSERT INTO storage.buckets (id, name, public)
VALUES
  ('employee-files', 'employee-files', TRUE)
;

INSERT INTO company (id, name)
VALUES
  ('22bbdc2f-8c21-43cf-893a-032faf6da847', 'Dispro'),
  ('1f6f32f0-438f-4796-8e3b-838f44fca2bd', 'Jumbagua')
;

INSERT INTO employee (id, company_id, first_name, last_name, hire_date, birth_date, address, phone, email)
VALUES
  (
    'bb6ccada-8f50-4ce5-8a16-ff69f927d015',
    '22bbdc2f-8c21-43cf-893a-032faf6da847',
    'Elio Alejandro',
    'Ojeda Martinez',
    '2022-01-15',
    '2000-07-15',
    'Barrio San Miguel Centro, Guazacapan',
    '42939234',
    'elio4392@gmail.com'
  ),
  (
    '06241f41-2a16-4010-8101-e99d0d0f6f3c',
    '22bbdc2f-8c21-43cf-893a-032faf6da847',
    'Sasuke Uchiha',
    'Rodrigues Miller',
    '2022-05-01',
    '2003-03-17',
    'Barrio San Miguel Oriente, Guazacapan',
    '45023489',
    'sasukeuchiha@gmail.com'
  ),
  (
    '86874661-8480-4b0d-9547-35414b518f8e',
    '22bbdc2f-8c21-43cf-893a-032faf6da847',
    'Luis Madara',
    'Gonzales Auxpuaca',
    '2022-04-18',
    '1996-04-27',
    'Barrio San Miguel Condominio, Guazacapan',
    '42563587',
    'madara@gmail.com'
  ),
  (
    '0e434c6f-50d6-4b7d-9572-b78ff626be9b',
    '1f6f32f0-438f-4796-8e3b-838f44fca2bd',
    'Alejandro Shadooow',
    'Licenciado Depilador',
    '2022-08-09',
    '1999-08-09',
    'Barrio San Miguel, Chiquimulilla',
    '44789654',
    'shadooow@gmail.com'
  ),
  (
    '507e2273-8e2d-4157-b935-040fc73d9848',
    '1f6f32f0-438f-4796-8e3b-838f44fca2bd',
    'Manfredy Manco',
    'Terracan FourLoko',
    '2023-10-13',
    '2004-09-29',
    'Barrio San Pedro, Guazacapan',
    '87965246',
    'manfredy@gmail.com'
  ),
  (
    '8bd57ba3-1c2e-4fbd-a8c3-e6c74f0db361',
    '1f6f32f0-438f-4796-8e3b-838f44fca2bd',
    'Andy de Jesus',
    'Drogon Bolo',
    '2020-01-01',
    '1999-05-18',
    'El Barro, Guazacapan',
    '85463210',
    'drogonbolo@gmail.com'
  )
;

INSERT INTO spouse (id, company_id, employee_id, first_name, last_name)
VALUES
 (
  '25a4f907-9048-43e7-8e91-61c149d88443',
  '22bbdc2f-8c21-43cf-893a-032faf6da847',
  'bb6ccada-8f50-4ce5-8a16-ff69f927d015',
  'Fernanda Luisa',
  'Guitierrez Pacox'
 ),
 (
  '0fb0c1f2-7d24-4c99-b4a2-80b527193507',
  '22bbdc2f-8c21-43cf-893a-032faf6da847',
  '06241f41-2a16-4010-8101-e99d0d0f6f3c',
  'Fiona Ximena',
  'Davila Orantes'
 ),
 (
  '047e4166-a9d0-4fca-b213-a5f58a7501a9',
  '22bbdc2f-8c21-43cf-893a-032faf6da847',
  '86874661-8480-4b0d-9547-35414b518f8e',
  'Maira Julia',
  'Suriano estrada'
 ),
 (
  '71242f99-8c7e-437e-a5b1-5df5b93b9ce0',
  '1f6f32f0-438f-4796-8e3b-838f44fca2bd',
  '0e434c6f-50d6-4b7d-9572-b78ff626be9b',
  'Linda Sofia',
  'Chua Corondao'
 ),
 (
  '6bf2b6ff-d887-4dd8-80da-684e02fb3785',
  '1f6f32f0-438f-4796-8e3b-838f44fca2bd',
  '507e2273-8e2d-4157-b935-040fc73d9848',
  'Juana Ana',
  'Oliva Bautista'
 ),
 (
  '3cf172d0-c036-45ac-b9c6-2acee6e13b2b',
  '1f6f32f0-438f-4796-8e3b-838f44fca2bd',
  '8bd57ba3-1c2e-4fbd-a8c3-e6c74f0db361',
  'Cony Sara',
  'Ibarra Ayala'
 )
;

INSERT INTO child (id, company_id, employee_id, first_name, last_name)
VALUES
 (
   'c6a00b66-4dea-4e71-9c0e-97fb68901c7e',
   '22bbdc2f-8c21-43cf-893a-032faf6da847',
   'bb6ccada-8f50-4ce5-8a16-ff69f927d015',
   'Eliot Alex',
   'Ojeda Martinez'
 ),
 (
   'f61b736f-36a0-42c6-abe5-88820b28b9cf',
   '22bbdc2f-8c21-43cf-893a-032faf6da847',
   'bb6ccada-8f50-4ce5-8a16-ff69f927d015',
   'Daniel Antonio',
   'Alcatras Roca'
 ),
 (
   '0734afaf-b65d-43cf-a54a-6b5a6aa31e1c',
   '22bbdc2f-8c21-43cf-893a-032faf6da847',
   '06241f41-2a16-4010-8101-e99d0d0f6f3c',
   'Rocio Londra',
   'Rodrigues Perez'
 ),
 (
   '0fa5119b-f145-4bb6-be65-5bece1fdb983',
   '22bbdc2f-8c21-43cf-893a-032faf6da847',
   '86874661-8480-4b0d-9547-35414b518f8e',
   'Chiqui Gisselle',
   'Godoy Auxpacua'
 ),
 (
   'c28de2a6-b471-4309-815b-5b90f06ac5f2',
   '1f6f32f0-438f-4796-8e3b-838f44fca2bd',
   '0e434c6f-50d6-4b7d-9572-b78ff626be9b',
   'Kalich Aritides',
   'Rodriguez Monterroso'
 ),
 (
   'd9cde5fd-cb33-47fa-a978-ab18aeb240d3',
   '1f6f32f0-438f-4796-8e3b-838f44fca2bd',
   '507e2273-8e2d-4157-b935-040fc73d9848',
   'Cory Kimberly',
   'Cruz Lorisa'
 )
;

INSERT INTO department (id, company_id, name, description)
VALUES
  ('cb4f7b55-d824-496e-bce1-6167ac771a52', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'Recursos Humanos', 'Se encarga de gestionar y administrar el capital humano de una organización.'),
  ('8e358d4a-48d5-476d-9ae7-08c36654794c', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'Ventas', 'Se encarga de promover y vender los productos o servicios de una empresa a clientes potenciales o existentes.'),
  ('d86c6a60-0ebb-4ef5-a777-93850ba41f60', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'Producción', 'Es responsable de planificar, coordinar y supervisar el proceso de fabricación o producción de bienes o servicios de una empresa.'),
  ('6985aaa7-c0f1-4496-a002-749192b59930', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', 'Recursos Humanos', 'Se encarga de gestionar y administrar el capital humano de una organización.'),
  ('622da48e-3a03-46ba-9d8a-5d8c3b3d69c2', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', 'Ventas', 'Se encarga de promover y vender los productos o servicios de una empresa a clientes potenciales o existentes.'),
  ('73f932d2-8bf8-4bdd-a57a-229ba5a673cd', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', 'Producción', 'Es responsable de planificar, coordinar y supervisar el proceso de fabricación o producción de bienes o servicios de una empresa.')
;

INSERT INTO job (id, company_id, department_id, title, description, base_salary)
VALUES
  ('35653716-9d62-4c24-93b5-32e0bd43584a', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'cb4f7b55-d824-496e-bce1-6167ac771a52', 'Gerente de Recursos Humanos', 'Supervisa y dirige todas las actividades del departamento de RRHH, incluyendo la gestión de personal, reclutamiento y relaciones laborales.', 20000),
  ('91b1311a-9efb-4582-a34f-24218f5daf09', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'cb4f7b55-d824-496e-bce1-6167ac771a52', 'Especialista en Reclutamiento y Selección', 'Identifica, atrae y selecciona candidatos para las vacantes de la empresa.', 10000),
  ('a80d0ca4-bdf1-4d12-ba71-2e1cce2421b5', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'cb4f7b55-d824-496e-bce1-6167ac771a52', 'Analista de Compensación y Beneficios', 'Gestiona programas de remuneración y beneficios para los empleados.', 8000),
  ('bb42af58-5914-416b-926a-b65c2bc11a43', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'cb4f7b55-d824-496e-bce1-6167ac771a52', 'Especialista en Desarrollo Organizacional', 'Trabaja en el desarrollo de estrategias y programas de capacitación y desarrollo de los empleados.', 8000),
  ('9be20a9f-815b-4ad2-8bd6-ce354696c68a', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'cb4f7b55-d824-496e-bce1-6167ac771a52', 'Especialista en Relaciones Laborales', 'Resuelve conflictos laborales y garantiza el cumplimiento de regulaciones laborales.', 7500),
  ('a7fc5921-117f-48c2-a16e-5f605b86a626', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'cb4f7b55-d824-496e-bce1-6167ac771a52', 'Asistente de Recursos Humanos', 'Brinda apoyo administrativo en tareas como la gestión de documentos y registros de empleados.', 4000),
  ('9d1ba801-9c36-4949-a751-bf80e8355658', '22bbdc2f-8c21-43cf-893a-032faf6da847', '8e358d4a-48d5-476d-9ae7-08c36654794c', 'Representante de Ventas', 'Vende productos o servicios de la empresa a clientes potenciales.', 9000),
  ('c28484a9-c09d-489e-8fd5-c7f8b79661fb', '22bbdc2f-8c21-43cf-893a-032faf6da847', '8e358d4a-48d5-476d-9ae7-08c36654794c', 'Gerente de Ventas', 'Supervisa y dirige el equipo de ventas, establece metas y estrategias de ventas.', 20000),
  ('f5170c9f-1d88-4328-9d52-5b569529ff1d', '22bbdc2f-8c21-43cf-893a-032faf6da847', '8e358d4a-48d5-476d-9ae7-08c36654794c', 'Especialista en Desarrollo de Clientes', 'Identifica nuevas oportunidades de negocio y desarrolla relaciones con clientes clave.', 12000),
  ('7a3003cf-dcf1-4cf7-82b1-a51f58189751', '22bbdc2f-8c21-43cf-893a-032faf6da847', '8e358d4a-48d5-476d-9ae7-08c36654794c', 'Ejecutivo de Cuentas', 'Gestiona relaciones con clientes existentes y asegura su satisfacción y retención.', 8000),
  ('fd7d6cd3-426f-45ff-942e-86304d79e2fe', '22bbdc2f-8c21-43cf-893a-032faf6da847', '8e358d4a-48d5-476d-9ae7-08c36654794c', 'Gerente de Ventas en Línea', 'Se especializa en la venta de productos o servicios en línea y a través de canales digitales.', 17000),
  ('c41a4e4e-2f76-4179-9db7-4e71f9032d48', '22bbdc2f-8c21-43cf-893a-032faf6da847', '8e358d4a-48d5-476d-9ae7-08c36654794c', 'Analista de Ventas', 'Realiza análisis de datos y tendencias para informar las estrategias de ventas.', 5000),
  ('ed7181ff-a80b-40ce-999d-779e53d7e21d', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'd86c6a60-0ebb-4ef5-a777-93850ba41f60', 'Gerente de Producción', 'Supervisa la producción y garantiza la eficiencia.', 18000),
  ('d828428f-8df0-414d-8426-884b6e38e51f', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'd86c6a60-0ebb-4ef5-a777-93850ba41f60', 'Supervisor de Línea de Producción', 'Dirige equipos en la línea de montaje.', 12000),
  ('0e230ea7-aacb-4a80-8c72-bd3bdf7ad2cd', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'd86c6a60-0ebb-4ef5-a777-93850ba41f60', 'Ingeniero de Procesos', 'Optimiza los procesos de fabricación.', 15000),
  ('50a357fc-4fe3-4fb3-bacd-e46b7b903265', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'd86c6a60-0ebb-4ef5-a777-93850ba41f60', 'Técnico de Mantenimiento', 'Realiza mantenimiento de maquinaria.', 6500),
  ('5e3689b4-e2a1-4eb2-bd4c-2dd7601fedc5', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'd86c6a60-0ebb-4ef5-a777-93850ba41f60', 'Operario de Producción', 'Trabaja en la línea de producción.', 8000),
  ('43c77c38-636f-433f-bdaa-9872ff9240df', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'd86c6a60-0ebb-4ef5-a777-93850ba41f60', 'Planificador de Producción', 'Coordina la programación de producción.', 8000),
  ('40fbad21-a51d-4306-916f-5c189a83fc36', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '6985aaa7-c0f1-4496-a002-749192b59930', 'Gerente de Recursos Humanos', 'Supervisa y dirige todas las actividades del departamento de RRHH, incluyendo la gestión de personal, reclutamiento y relaciones laborales.', 20000),
  ('c0fefb0a-d530-40ea-a101-f16a69263a30', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '6985aaa7-c0f1-4496-a002-749192b59930', 'Especialista en Reclutamiento y Selección', 'Identifica, atrae y selecciona candidatos para las vacantes de la empresa.', 10000),
  ('c008c898-518c-40f1-bd04-191e391f1e93', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '6985aaa7-c0f1-4496-a002-749192b59930', 'Analista de Compensación y Beneficios', 'Gestiona programas de remuneración y beneficios para los empleados.', 8000),
  ('8f234216-65e5-4bc3-9318-930245a99b90', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '6985aaa7-c0f1-4496-a002-749192b59930', 'Especialista en Desarrollo Organizacional', 'Trabaja en el desarrollo de estrategias y programas de capacitación y desarrollo de los empleados.', 8000),
  ('41a424b4-1860-4dd6-907f-0d92d84e798a', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '6985aaa7-c0f1-4496-a002-749192b59930', 'Especialista en Relaciones Laborales', 'Resuelve conflictos laborales y garantiza el cumplimiento de regulaciones laborales.', 7500),
  ('0f2d4a21-6649-4e73-8560-1ee07560cff9', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '6985aaa7-c0f1-4496-a002-749192b59930', 'Asistente de Recursos Humanos', 'Brinda apoyo administrativo en tareas como la gestión de documentos y registros de empleados.', 4000),
  ('6c47e383-ee81-4fae-ad47-fab02f3c3549', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '622da48e-3a03-46ba-9d8a-5d8c3b3d69c2', 'Representante de Ventas', 'Vende productos o servicios de la empresa a clientes potenciales.', 9000),
  ('d02ac33b-3b83-4eda-a0c8-c365db5afbff', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '622da48e-3a03-46ba-9d8a-5d8c3b3d69c2', 'Gerente de Ventas', 'Supervisa y dirige el equipo de ventas, establece metas y estrategias de ventas.', 20000),
  ('c48a862c-7104-43a9-9359-9be3d3f0c829', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '622da48e-3a03-46ba-9d8a-5d8c3b3d69c2', 'Especialista en Desarrollo de Clientes', 'Identifica nuevas oportunidades de negocio y desarrolla relaciones con clientes clave.', 12000),
  ('0733718b-93f3-4420-bc48-e537cdb0e47d', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '622da48e-3a03-46ba-9d8a-5d8c3b3d69c2', 'Ejecutivo de Cuentas', 'Gestiona relaciones con clientes existentes y asegura su satisfacción y retención.', 8000),
  ('fcf88dde-b250-436b-a2eb-d3793804a844', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '622da48e-3a03-46ba-9d8a-5d8c3b3d69c2', 'Gerente de Ventas en Línea', 'Se especializa en la venta de productos o servicios en línea y a través de canales digitales.', 17000),
  ('611cce03-640e-44d6-94ae-a04e9be3ae09', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '622da48e-3a03-46ba-9d8a-5d8c3b3d69c2', 'Analista de Ventas', 'Realiza análisis de datos y tendencias para informar las estrategias de ventas.', 5000),
  ('02773a0d-b459-43e7-90af-7fdc8fdc9755', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '73f932d2-8bf8-4bdd-a57a-229ba5a673cd', 'Gerente de Producción', 'Supervisa la producción y garantiza la eficiencia.', 18000),
  ('b8a294aa-ffdb-40a7-af74-85865d572129', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '73f932d2-8bf8-4bdd-a57a-229ba5a673cd', 'Supervisor de Línea de Producción', 'Dirige equipos en la línea de montaje.', 12000),
  ('7bb2d69d-3a1a-414a-9741-537911163844', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '73f932d2-8bf8-4bdd-a57a-229ba5a673cd', 'Ingeniero de Procesos', 'Optimiza los procesos de fabricación.', 15000),
  ('9ff6b52d-5d55-451d-8b05-376748c1e8e0', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '73f932d2-8bf8-4bdd-a57a-229ba5a673cd', 'Técnico de Mantenimiento', 'Realiza mantenimiento de maquinaria.', 6500),
  ('12b7fda3-bfb1-474d-99c3-a4d5b1b8e1b0', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '73f932d2-8bf8-4bdd-a57a-229ba5a673cd', 'Operario de Producción', 'Trabaja en la línea de producción.', 8000),
  ('631eab58-d7cf-44a9-8779-ef84d3f0dd2c', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '73f932d2-8bf8-4bdd-a57a-229ba5a673cd', 'Planificador de Producción', 'Coordina la programación de producción.', 8000)
;

INSERT INTO employee_job (id, company_id, employee_id, job_id, current_salary, start_date)
VALUES
  ('00d11dac-3445-4652-8c3b-d015c977470b', '22bbdc2f-8c21-43cf-893a-032faf6da847', 'bb6ccada-8f50-4ce5-8a16-ff69f927d015', '35653716-9d62-4c24-93b5-32e0bd43584a', 20000, '2022-01-17'),
  ('6667aca4-456f-4450-897c-50539ff35b23', '22bbdc2f-8c21-43cf-893a-032faf6da847', '06241f41-2a16-4010-8101-e99d0d0f6f3c', 'c28484a9-c09d-489e-8fd5-c7f8b79661fb', 20000, '2021-03-24'),
  ('b6d72b63-301b-4630-9c65-e41637879a1a', '22bbdc2f-8c21-43cf-893a-032faf6da847', '86874661-8480-4b0d-9547-35414b518f8e', 'ed7181ff-a80b-40ce-999d-779e53d7e21d', 18000, '2022-07-04'),
  ('79573658-32d9-4de7-a730-060cc2c2c832', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '0e434c6f-50d6-4b7d-9572-b78ff626be9b', 'c0fefb0a-d530-40ea-a101-f16a69263a30', 10000, '2021-06-22'),
  ('a9f0a12f-c334-49fb-8472-29cce2666ae7', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '507e2273-8e2d-4157-b935-040fc73d9848', 'c48a862c-7104-43a9-9359-9be3d3f0c829', 12000, '2022-02-01'),
  ('7db5ca92-b5ba-41a2-bc8a-25e5302a196b', '1f6f32f0-438f-4796-8e3b-838f44fca2bd', '8bd57ba3-1c2e-4fbd-a8c3-e6c74f0db361', 'b8a294aa-ffdb-40a7-af74-85865d572129', 12000, '2023-05-05')
;