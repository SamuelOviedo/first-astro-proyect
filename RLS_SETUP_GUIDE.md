# Guía: Configurar Row Level Security (RLS) para Formulario de Mantenimiento

## ✅ Formulario funcionando - Ahora asegurar con RLS

El formulario ya funciona, pero RLS está deshabilitado. Sigue estos pasos para re-habilitarlo de forma segura.

## ¿Qué es RLS?

**Row Level Security (RLS)** es una capa de seguridad en PostgreSQL/Supabase que controla qué usuarios pueden ver, insertar, actualizar o eliminar filas específicas en una tabla.

## Solución Rápida

### Opción A: Ejecutar SQL (RECOMENDADO)

1. Ve a **Supabase Dashboard** → Tu proyecto
2. Click en **SQL Editor** en el menú lateral
3. Crea una nueva query
4. Copia y pega el contenido de `FIX_RLS_POLICY.sql`
5. Click en **Run** (Ctrl+Enter)

### Opción B: Usar la interfaz gráfica

1. Ve a **Authentication** → **Policies**
2. Busca la tabla `mantenimiento`
3. Click en **New Policy**
4. Selecciona **"Enable insert access for all users"** o crea una política personalizada:
   - **Policy name**: `Permitir inserciones públicas`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `anon`, `authenticated`
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`
5. Click en **Review** y luego **Save policy**

## ¿Es seguro permitir inserciones públicas?

**SÍ**, para un formulario de contacto/mantenimiento es completamente normal y seguro porque:

✅ Solo permite **INSERT** (crear), no modificar o eliminar
✅ Los usuarios solo pueden agregar nuevas solicitudes
✅ No pueden ver, editar o eliminar solicitudes de otros
✅ Es el comportamiento esperado de un formulario público

## Políticas adicionales (opcional)

Si en el futuro quieres que los usuarios vean sus propias solicitudes:

```sql
-- Permitir que usuarios autenticados vean solo sus propias solicitudes
CREATE POLICY "Los usuarios ven sus propias solicitudes"
ON mantenimiento
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
```

(Esto requeriría agregar una columna `user_id` a la tabla)

## Verificación

Después de aplicar la política:

1. Recarga la página del formulario
2. Llena y envía el formulario
3. Deberías ver el mensaje: **"¡Solicitud enviada exitosamente! Te contactaremos pronto."** ✅
4. Verifica en **Table Editor** → `mantenimiento` que el registro se creó

## Troubleshooting

Si aún no funciona:

1. Verifica que RLS está habilitado: `Authentication` → `Policies` → tabla `mantenimiento`
2. Verifica que la política se creó correctamente
3. Revisa que tu `SUPABASE_ANON_KEY` en `.env` es correcta
4. Intenta refrescar el schema cache en Supabase
