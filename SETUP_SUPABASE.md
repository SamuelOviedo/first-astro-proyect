# Configuración de Supabase para el Formulario de Contacto

## 📋 Pasos para configurar Supabase

### 1. Instalar dependencias necesarias

```bash
npm install @supabase/supabase-js @astrojs/react react react-dom
```

### 2. Configurar Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que el proyecto se inicialice (puede tomar unos minutos)

### 3. Crear la tabla en Supabase

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Ejecuta el siguiente SQL:

```sql
-- Crear tabla de contactos
CREATE TABLE contactos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  servicio TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE contactos ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserciones públicas
CREATE POLICY "Permitir inserciones públicas" 
ON contactos 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Crear política para permitir lectura solo a usuarios autenticados
CREATE POLICY "Permitir lectura a usuarios autenticados" 
ON contactos 
FOR SELECT 
TO authenticated 
USING (true);
```

### 4. Obtener las credenciales

1. Ve a **Settings** > **API**
2. Copia los siguientes valores:
   - **Project URL** (URL del proyecto)
   - **anon public** key (Clave pública anónima)

### 5. Configurar variables de entorno

1. Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

2. Edita el archivo `.env` y agrega tus credenciales:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-clave-publica-anonima
```

⚠️ **IMPORTANTE**: Asegúrate de que `.env` esté en tu `.gitignore` para no subir las credenciales a GitHub.

### 6. Verificar la configuración de Astro

El archivo `astro.config.mjs` ya debe tener la integración de React:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
```

### 7. Reiniciar el servidor de desarrollo

```bash
npm run dev
```

## 🎯 Características del formulario

✅ **Validación en tiempo real**
- Nombre: mínimo 3 caracteres
- Email: formato válido
- Servicio: selección obligatoria
- Mensaje: mínimo 10 caracteres

✅ **Mensajes de error** personalizados para cada campo

✅ **Feedback visual**
- Estado de envío (Enviando...)
- Mensaje de éxito
- Mensaje de error

✅ **Integración con Supabase**
- Los datos se guardan automáticamente
- Timestamp de creación

## 📊 Ver los datos enviados

1. Ve a tu proyecto en Supabase
2. Navega a **Table Editor**
3. Selecciona la tabla `contactos`
4. Verás todos los mensajes enviados desde el formulario

## 🔒 Seguridad

- La tabla usa Row Level Security (RLS)
- Solo se permiten inserciones públicas
- La lectura requiere autenticación
- Las credenciales están en variables de entorno

## 🐛 Solución de problemas

### Error: "Cannot find module '@astrojs/react'"
```bash
npm install @astrojs/react react react-dom
```

### Error: "supabase is not defined"
Verifica que el archivo `.env` existe y tiene las variables correctas.

### Los datos no se guardan
1. Verifica que la tabla `contactos` existe en Supabase
2. Verifica que las políticas RLS están configuradas
3. Revisa la consola del navegador para ver errores específicos

## 📝 Estructura de archivos

```
src/
├── components/
│   └── contactForm.tsx       # Componente React del formulario
├── lib/
│   └── supabase.ts           # Cliente de Supabase
└── pages/
    └── index.astro           # Página principal con el formulario
```

## ✨ Próximos pasos (opcional)

- Agregar notificaciones por email cuando llegue un mensaje
- Crear un panel de administración para ver los mensajes
- Agregar captcha para prevenir spam
- Implementar rate limiting
