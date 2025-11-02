-- Re-habilitar RLS de forma segura en la tabla mantenimiento
-- Esto protegerá tus datos mientras permite inserciones públicas

-- PASO 1: Habilitar RLS en la tabla
ALTER TABLE mantenimiento ENABLE ROW LEVEL SECURITY;

-- PASO 2: Eliminar políticas antiguas si existen
DROP POLICY IF EXISTS "allow_public_insert_mantenimiento" ON mantenimiento;
DROP POLICY IF EXISTS "Permitir inserciones públicas en mantenimiento" ON mantenimiento;
DROP POLICY IF EXISTS "Permitir inserciones públicas de mantenimiento" ON mantenimiento;

-- PASO 3: Crear política para permitir INSERT público (formulario)
CREATE POLICY "public_insert_mantenimiento"
ON mantenimiento
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- PASO 4: Crear política para que solo usuarios autenticados vean TODOS los registros
-- (útil si tienes un panel de administración)
CREATE POLICY "authenticated_select_all_mantenimiento"
ON mantenimiento
FOR SELECT
TO authenticated
USING (true);

-- PASO 5 (OPCIONAL): Si quieres que usuarios anónimos NO puedan leer
-- Comenta o elimina la política de SELECT de arriba y usa esta:
-- CREATE POLICY "no_public_select_mantenimiento"
-- ON mantenimiento
-- FOR SELECT
-- TO anon
-- USING (false);

-- VERIFICACIÓN: Confirmar que RLS está habilitado
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as "RLS Habilitado (debe ser true)"
FROM pg_tables
WHERE tablename = 'mantenimiento';

-- Ver todas las políticas activas
SELECT 
  policyname as "Nombre de Política",
  cmd as "Operación",
  roles as "Roles Permitidos",
  CASE 
    WHEN qual IS NULL THEN 'N/A'
    ELSE qual::text
  END as "USING (para SELECT/UPDATE/DELETE)",
  CASE 
    WHEN with_check IS NULL THEN 'N/A'
    ELSE with_check::text
  END as "WITH CHECK (para INSERT/UPDATE)"
FROM pg_policies 
WHERE tablename = 'mantenimiento'
ORDER BY cmd, policyname;
