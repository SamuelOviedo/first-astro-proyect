-- Agregar columnas para vincular solicitudes con usuarios autenticados
-- Ejecutar en Supabase SQL Editor

-- Agregar columna user_id (referencia al usuario de auth.users)
ALTER TABLE mantenimiento 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Agregar columna user_email para referencia rápida
ALTER TABLE mantenimiento 
ADD COLUMN IF NOT EXISTS user_email TEXT;

-- Crear índice para mejorar consultas por usuario
CREATE INDEX IF NOT EXISTS idx_mantenimiento_user_id ON mantenimiento(user_id);

-- Verificar las columnas
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'mantenimiento' 
  AND column_name IN ('user_id', 'user_email')
ORDER BY ordinal_position;
