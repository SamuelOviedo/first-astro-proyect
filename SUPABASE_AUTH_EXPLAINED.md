# Cómo Funciona la Autenticación en Supabase

## 🔐 Sistema de Usuarios

### ¿Dónde se almacenan los usuarios?

Cuando un usuario se registra en tu aplicación, Supabase **automáticamente** lo guarda en una tabla especial del sistema llamada `auth.users`.

```
📦 Tu Base de Datos Supabase
├── 🔒 auth (Schema del sistema - NO EDITABLE directamente)
│   ├── users ← Aquí están todos tus usuarios
│   ├── sessions
│   ├── refresh_tokens
│   └── audit_log_entries
│
└── 📊 public (Schema público - TUS TABLAS)
    ├── mantenimiento ← Tu tabla de solicitudes
    └── otras_tablas
```

### Tabla `auth.users` (Automática)

Esta tabla contiene:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `id` | UUID único del usuario | `550e8400-e29b-41d4-a716-446655440000` |
| `email` | Correo electrónico | `usuario@example.com` |
| `encrypted_password` | Contraseña encriptada | (hash seguro) |
| `email_confirmed_at` | Fecha de confirmación | `2024-11-02 18:00:00` |
| `created_at` | Fecha de registro | `2024-11-02 17:30:00` |
| `updated_at` | Última actualización | `2024-11-02 18:00:00` |
| `raw_user_meta_data` | Datos personalizados | `{"full_name": "Juan Pérez"}` |
| `role` | Rol del usuario | `authenticated` |

---

## 🔍 Cómo Ver los Usuarios Registrados

### Opción 1: Desde el Dashboard de Supabase (Recomendado)

1. Ve a tu proyecto en **Supabase Dashboard**
2. Click en **Authentication** en el menú lateral
3. Click en **Users**
4. Verás una lista de todos los usuarios registrados con:
   - Email
   - Fecha de registro
   - Estado de confirmación
   - Último login
   - Opciones para editar/eliminar

### Opción 2: Consulta SQL

Puedes consultar directamente la tabla desde el **SQL Editor**:

```sql
-- Ver todos los usuarios
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at,
  raw_user_meta_data->>'full_name' as nombre_completo,
  last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;
```

### Opción 3: Desde tu aplicación (JavaScript)

```javascript
// Obtener el usuario actual autenticado
const { data: { user } } = await supabase.auth.getUser();

console.log(user.id);           // UUID del usuario
console.log(user.email);        // Email
console.log(user.user_metadata); // Datos personalizados
```

---

## 🔗 Relación con tus Tablas

### Cómo vincular usuarios con tus datos

En tu tabla `mantenimiento`, ya tienes las columnas `user_id` y `user_email` que hacen referencia a `auth.users`:

```sql
-- Tu tabla mantenimiento
CREATE TABLE mantenimiento (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  email TEXT,
  telefono TEXT,
  -- ... otros campos ...
  
  -- Campos de usuario (ya los tienes)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Flujo completo:

```
1. Usuario se registra
   ↓
2. Supabase crea registro en auth.users
   ↓
3. Usuario inicia sesión
   ↓
4. Usuario envía formulario de mantenimiento
   ↓
5. Tu app guarda en tabla mantenimiento con:
   - user_id (UUID de auth.users)
   - user_email (email del usuario)
   ↓
6. Ahora puedes relacionar solicitudes con usuarios
```

---

## 📊 Consultas Útiles

### Ver todas las solicitudes de un usuario específico

```sql
-- Desde SQL Editor
SELECT 
  m.*,
  u.email,
  u.raw_user_meta_data->>'full_name' as nombre_usuario
FROM mantenimiento m
JOIN auth.users u ON m.user_id = u.id
WHERE u.email = 'usuario@example.com'
ORDER BY m.created_at DESC;
```

### Contar solicitudes por usuario

```sql
SELECT 
  u.email,
  u.raw_user_meta_data->>'full_name' as nombre,
  COUNT(m.id) as total_solicitudes
FROM auth.users u
LEFT JOIN mantenimiento m ON u.id = m.user_id
GROUP BY u.id, u.email, u.raw_user_meta_data
ORDER BY total_solicitudes DESC;
```

### Ver usuarios registrados hoy

```sql
SELECT 
  email,
  raw_user_meta_data->>'full_name' as nombre,
  created_at
FROM auth.users
WHERE created_at::date = CURRENT_DATE
ORDER BY created_at DESC;
```

---

## 🛡️ Seguridad y Permisos (RLS)

### Row Level Security (RLS)

Puedes configurar políticas para que los usuarios solo vean sus propias solicitudes:

```sql
-- Habilitar RLS en la tabla mantenimiento
ALTER TABLE mantenimiento ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propias solicitudes
CREATE POLICY "Users can view own requests"
ON mantenimiento
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Política: Los usuarios solo pueden insertar con su propio ID
CREATE POLICY "Users can insert own requests"
ON mantenimiento
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Política: Los usuarios pueden actualizar sus propias solicitudes
CREATE POLICY "Users can update own requests"
ON mantenimiento
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());
```

### Función útil: `auth.uid()`

Esta función devuelve el UUID del usuario autenticado actualmente:

```sql
-- En tus políticas RLS
WHERE user_id = auth.uid()

-- En triggers
NEW.user_id := auth.uid();
```

---

## 🎯 Crear una Vista de Usuarios con Estadísticas

Puedes crear una vista para tener información más útil:

```sql
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  u.id,
  u.email,
  u.raw_user_meta_data->>'full_name' as nombre_completo,
  u.created_at as fecha_registro,
  u.last_sign_in_at as ultimo_acceso,
  COUNT(m.id) as total_solicitudes,
  COUNT(CASE WHEN m.created_at > NOW() - INTERVAL '30 days' THEN 1 END) as solicitudes_mes
FROM auth.users u
LEFT JOIN mantenimiento m ON u.id = m.user_id
GROUP BY u.id, u.email, u.raw_user_meta_data, u.created_at, u.last_sign_in_at;

-- Ahora puedes consultar:
SELECT * FROM user_stats ORDER BY total_solicitudes DESC;
```

---

## 📱 Actualizar Estadísticas en el Menú de Usuario

Para mostrar las estadísticas reales en el menú desplegable del usuario:

### 1. Crear función en Supabase

```sql
-- Función para obtener estadísticas del usuario
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE (
  total_solicitudes BIGINT,
  solicitudes_completadas BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_solicitudes,
    COUNT(CASE WHEN estado = 'completado' THEN 1 END) as solicitudes_completadas
  FROM mantenimiento
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 2. Llamar desde tu componente React

```typescript
// En AuthHeader.tsx
const [stats, setStats] = useState({ total: 0, completed: 0 });

useEffect(() => {
  if (user) {
    fetchUserStats();
  }
}, [user]);

const fetchUserStats = async () => {
  const { data, error } = await supabase
    .rpc('get_user_stats', { user_uuid: user.id });
  
  if (data && data.length > 0) {
    setStats({
      total: data[0].total_solicitudes,
      completed: data[0].solicitudes_completadas
    });
  }
};

// En el JSX:
<div className="px-3 py-2 bg-white/5 rounded-lg">
  <p className="text-xs text-gray-500">Solicitudes</p>
  <p className="text-lg font-bold text-white">{stats.total}</p>
</div>
<div className="px-3 py-2 bg-white/5 rounded-lg">
  <p className="text-xs text-gray-500">Completadas</p>
  <p className="text-lg font-bold text-green-400">{stats.completed}</p>
</div>
```

---

## 🔑 Datos Personalizados (Metadata)

### Guardar datos adicionales al registrarse

Cuando un usuario se registra, puedes guardar datos personalizados:

```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'usuario@example.com',
  password: 'contraseña123',
  options: {
    data: {
      full_name: 'Juan Pérez',
      phone: '+52 123 456 7890',
      company: 'Mi Empresa S.A.',
      // Cualquier dato adicional
    }
  }
});
```

### Acceder a los datos personalizados

```javascript
// Desde el cliente
const { data: { user } } = await supabase.auth.getUser();
console.log(user.user_metadata.full_name);
console.log(user.user_metadata.phone);

// Desde SQL
SELECT 
  email,
  raw_user_meta_data->>'full_name' as nombre,
  raw_user_meta_data->>'phone' as telefono
FROM auth.users;
```

---

## 🗂️ Crear Tabla de Perfiles (Opcional)

Si necesitas más información de usuario, puedes crear una tabla de perfiles:

```sql
-- Tabla de perfiles de usuario
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  company TEXT,
  address TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Trigger para crear perfil automáticamente
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- RLS para perfiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
ON user_profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
TO authenticated
USING (id = auth.uid());
```

---

## 📋 Resumen

### ✅ Lo que ya tienes funcionando:

1. **Usuarios se registran** → Se guardan en `auth.users` automáticamente
2. **Usuarios inician sesión** → Supabase maneja la sesión
3. **Formularios vinculados** → Guardas `user_id` en tabla `mantenimiento`
4. **Relación establecida** → Puedes consultar solicitudes por usuario

### 🎯 Próximos pasos opcionales:

1. **Ver usuarios** en el Dashboard de Supabase
2. **Crear consultas SQL** para reportes
3. **Implementar estadísticas** reales en el menú de usuario
4. **Agregar tabla de perfiles** si necesitas más datos
5. **Configurar RLS** para seguridad adicional

### 🔗 Enlaces útiles:

- **Ver usuarios**: Dashboard → Authentication → Users
- **SQL Editor**: Dashboard → SQL Editor
- **Documentación**: https://supabase.com/docs/guides/auth
- **API Reference**: https://supabase.com/docs/reference/javascript/auth-signup

---

## 💡 Tip Final

Para ver rápidamente cuántos usuarios tienes registrados:

```sql
SELECT COUNT(*) as total_usuarios FROM auth.users;
```

Para ver cuántos confirmaron su email:

```sql
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as confirmados,
  COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as sin_confirmar
FROM auth.users;
```
