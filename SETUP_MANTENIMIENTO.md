# Configuración de la Tabla de Mantenimiento en Supabase

## 📋 SQL para crear la tabla

Ejecuta el siguiente SQL en el **SQL Editor** de Supabase:

```sql
-- Crear tabla de solicitudes de mantenimiento
CREATE TABLE mantenimiento (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Datos del cliente
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  ubicacion TEXT,
  
  -- Información del equipo
  tipoDispositivo TEXT NOT NULL,
  otroDispositivo TEXT,
  marca TEXT,
  modelo TEXT,
  sistemaOperativo TEXT,
  otroSO TEXT,
  
  -- Descripción del problema
  problemaPrincipal TEXT NOT NULL,
  otroProblem TEXT,
  descripcionDetallada TEXT NOT NULL,
  cuandoComenzo TEXT NOT NULL,
  intentoSolucion TEXT,
  
  -- Archivos adjuntos (flags)
  tiene_imagenes BOOLEAN DEFAULT FALSE,
  tiene_error_imagen BOOLEAN DEFAULT FALSE,
  
  -- Preferencias de servicio
  urgencia TEXT NOT NULL,
  modalidad TEXT NOT NULL,
  horarioContacto TEXT,
  comentariosAdicionales TEXT,
  
  -- Metadata
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estado TEXT DEFAULT 'pendiente' -- pendiente, en_proceso, completado, cancelado
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE mantenimiento ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserciones públicas
CREATE POLICY "Permitir inserciones públicas de mantenimiento" 
ON mantenimiento 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Crear política para permitir lectura solo a usuarios autenticados
CREATE POLICY "Permitir lectura a usuarios autenticados de mantenimiento" 
ON mantenimiento 
FOR SELECT 
TO authenticated 
USING (true);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_mantenimiento_fecha ON mantenimiento(fecha DESC);
CREATE INDEX idx_mantenimiento_estado ON mantenimiento(estado);
CREATE INDEX idx_mantenimiento_urgencia ON mantenimiento(urgencia);
CREATE INDEX idx_mantenimiento_email ON mantenimiento(email);

-- Comentarios en la tabla
COMMENT ON TABLE mantenimiento IS 'Solicitudes de servicio de mantenimiento de equipos';
COMMENT ON COLUMN mantenimiento.estado IS 'Estado de la solicitud: pendiente, en_proceso, completado, cancelado';
COMMENT ON COLUMN mantenimiento.urgencia IS 'Nivel de urgencia: urgente, normal, puede_esperar';
COMMENT ON COLUMN mantenimiento.modalidad IS 'Modalidad de servicio: domicilio, taller, remoto';
```

## 🎯 Estructura de la Página

### Archivos Creados:

1. **`src/pages/mantenimiento.astro`**
   - Página principal del formulario de mantenimiento
   - Usa el mismo header y footer que el index
   - Diseño responsive y moderno

2. **`src/components/MaintenanceForm.tsx`**
   - Componente React con el formulario completo
   - Validación en tiempo real
   - Integración con Supabase
   - Manejo de archivos adjuntos

3. **`src/components/Header.astro`**
   - Componente reutilizable del header
   - Incluye menú móvil

4. **`src/components/Footer.astro`**
   - Componente reutilizable del footer
   - Incluye botón scroll to top

## 📝 Secciones del Formulario

### 1. Datos del Cliente
- ✅ Nombre completo (requerido)
- ✅ Correo electrónico (requerido, validado)
- ✅ Teléfono de contacto (requerido, validado)
- ✅ Ubicación (opcional)

### 2. Información del Equipo
- ✅ Tipo de dispositivo (dropdown, requerido)
- ✅ Marca del equipo (opcional)
- ✅ Modelo (opcional)
- ✅ Sistema operativo (dropdown)
- ✅ Campo condicional para especificar si es "Otro"

### 3. Descripción del Problema
- ✅ Problema principal (dropdown, requerido)
- ✅ Descripción detallada (textarea, requerido, mín 20 caracteres)
- ✅ Cuándo comenzó (radio buttons, requerido)
- ✅ Intentos de solución (textarea, opcional)

### 4. Archivos Adjuntos
- ✅ Imágenes del problema (hasta 3, máx 5MB cada una)
- ✅ Captura de mensajes de error (1 imagen, máx 5MB)
- ✅ Validación de tamaño y cantidad

### 5. Preferencias de Servicio
- ✅ Urgencia del servicio (radio buttons, requerido)
- ✅ Modalidad preferida (radio buttons, requerido)
- ✅ Horario de contacto (dropdown, opcional)
- ✅ Comentarios adicionales (textarea, opcional)

## 🎨 Características de Diseño

- ✨ Diseño consistente con el index
- 🎯 Iconos de Font Awesome para cada sección
- 📱 Completamente responsive
- ⚡ Validación en tiempo real
- 🔴 Mensajes de error claros
- ✅ Feedback visual de éxito/error
- 🌟 Animaciones suaves
- 🎨 Efectos hover y focus

## 🔗 Navegación

El botón "Solicitar servicio" en la sección de **Mantenimiento** del index ahora redirige a `/mantenimiento`.

## 🚀 Uso

1. El usuario hace clic en "Solicitar servicio" en la sección de Mantenimiento
2. Es redirigido a `/mantenimiento`
3. Completa el formulario con todos los detalles
4. Puede adjuntar imágenes del problema
5. Envía la solicitud
6. Los datos se guardan en Supabase
7. Recibe confirmación visual

## 📊 Ver las Solicitudes

Para ver las solicitudes de mantenimiento en Supabase:

1. Ve a **Table Editor**
2. Selecciona la tabla `mantenimiento`
3. Verás todas las solicitudes con:
   - Datos del cliente
   - Información del equipo
   - Descripción del problema
   - Preferencias de servicio
   - Estado de la solicitud
   - Fecha de creación

## 🔧 Gestión de Estados

Puedes actualizar el estado de las solicitudes:

```sql
-- Cambiar estado a "en_proceso"
UPDATE mantenimiento 
SET estado = 'en_proceso' 
WHERE id = 'uuid-de-la-solicitud';

-- Cambiar estado a "completado"
UPDATE mantenimiento 
SET estado = 'completado' 
WHERE id = 'uuid-de-la-solicitud';
```

## 📈 Consultas Útiles

```sql
-- Ver solicitudes pendientes
SELECT * FROM mantenimiento 
WHERE estado = 'pendiente' 
ORDER BY fecha DESC;

-- Ver solicitudes urgentes
SELECT * FROM mantenimiento 
WHERE urgencia = 'urgente' AND estado = 'pendiente'
ORDER BY fecha DESC;

-- Contar solicitudes por estado
SELECT estado, COUNT(*) as total 
FROM mantenimiento 
GROUP BY estado;

-- Ver solicitudes de hoy
SELECT * FROM mantenimiento 
WHERE DATE(fecha) = CURRENT_DATE
ORDER BY fecha DESC;
```

## 🎯 Próximas Mejoras (Opcional)

- [ ] Implementar subida real de imágenes a Supabase Storage
- [ ] Enviar email de confirmación al cliente
- [ ] Notificar al equipo técnico por email
- [ ] Panel de administración para gestionar solicitudes
- [ ] Sistema de seguimiento con número de ticket
- [ ] Chat en vivo para soporte
- [ ] Estimación automática de tiempo y costo
