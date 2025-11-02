# Guía de Configuración de Autenticación

## ✅ Implementación completada

Se ha agregado un sistema completo de autenticación al formulario de mantenimiento.

## Componentes creados:

1. **`/login`** - Página de inicio de sesión y registro
2. **`AuthGuard.tsx`** - Componente que protege páginas (redirige si no está autenticado)
3. **`UserHeader.tsx`** - Header con información del usuario y botón de logout
4. **`MaintenanceForm.tsx`** - Actualizado para guardar `user_id` y `user_email`

## Pasos para completar la configuración:

### 1. Ejecutar SQL en Supabase

Ve a **Supabase SQL Editor** y ejecuta el archivo `ADD_USER_COLUMNS.sql`:

```sql
-- Agregar columnas para vincular solicitudes con usuarios
ALTER TABLE mantenimiento 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE mantenimiento 
ADD COLUMN IF NOT EXISTS user_email TEXT;

CREATE INDEX IF NOT EXISTS idx_mantenimiento_user_id ON mantenimiento(user_id);
```

### 2. Configurar Email en Supabase (IMPORTANTE)

Para que el registro funcione, debes configurar el proveedor de email:

#### Opción A: Usar email de Supabase (Desarrollo)
1. Ve a **Authentication** → **Providers** → **Email**
2. Asegúrate de que esté habilitado
3. En **Settings** → **Auth** → **Email Templates**, personaliza los emails si quieres

#### Opción B: Configurar SMTP personalizado (Producción)
1. Ve a **Project Settings** → **Auth** → **SMTP Settings**
2. Configura tu servidor SMTP (Gmail, SendGrid, etc.)

### 3. Configurar URL del sitio

1. Ve a **Authentication** → **URL Configuration**
2. Configura:
   - **Site URL**: `http://localhost:4324` (desarrollo) o tu dominio en producción
   - **Redirect URLs**: Agrega `http://localhost:4324/**` y tu dominio

### 4. Actualizar políticas RLS (si es necesario)

Si quieres que los usuarios solo vean sus propias solicitudes:

```sql
-- Política para que usuarios vean solo sus solicitudes
CREATE POLICY "users_select_own_mantenimiento"
ON mantenimiento
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
```

## Flujo de usuario:

1. **Usuario no autenticado** intenta acceder a `/mantenimiento`
2. **AuthGuard** detecta que no hay sesión
3. **Redirige automáticamente** a `/login`
4. Usuario **se registra o inicia sesión**
5. **Redirige a `/mantenimiento`** automáticamente
6. Usuario ve su **información en el header** (nombre/email)
7. Usuario **llena y envía el formulario**
8. El formulario guarda automáticamente el `user_id` y `user_email`
9. Usuario puede **cerrar sesión** con el botón en el header

## Características de seguridad:

✅ **Autenticación requerida** - Solo usuarios registrados pueden enviar solicitudes
✅ **Sesión persistente** - El usuario permanece logueado entre visitas
✅ **User ID guardado** - Cada solicitud está vinculada a un usuario
✅ **RLS habilitado** - Protección a nivel de base de datos
✅ **Logout seguro** - Cierra sesión correctamente

## Probar la autenticación:

1. Recarga el navegador
2. Intenta acceder a `/mantenimiento` - Debería redirigir a `/login`
3. Crea una cuenta nueva en la pestaña "Registrarse"
4. Revisa tu email para confirmar (si está configurado)
5. Inicia sesión
6. Deberías ver el formulario con tu información en el header
7. Envía una solicitud de prueba
8. Verifica en Supabase Table Editor que el `user_id` se guardó

## Desactivar confirmación de email (solo desarrollo):

Si quieres que los usuarios puedan iniciar sesión inmediatamente sin confirmar email:

1. Ve a **Authentication** → **Providers** → **Email**
2. Desactiva **"Confirm email"**
3. Guarda cambios

⚠️ **NO recomendado para producción**

## Próximos pasos opcionales:

- Crear página de perfil de usuario
- Mostrar historial de solicitudes del usuario
- Agregar recuperación de contraseña
- Implementar login con Google/Facebook
- Agregar roles (admin, usuario)
