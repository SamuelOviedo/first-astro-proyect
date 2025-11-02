# Migración de Base de Datos - Campo Código de País

## Cambio realizado
Se agregó un selector de código de país al formulario de mantenimiento.

## Acción requerida en Supabase

Debes agregar una nueva columna a la tabla `mantenimiento` en tu base de datos Supabase:

### SQL para ejecutar en Supabase SQL Editor:

```sql
-- Agregar columna codigopais a la tabla mantenimiento
ALTER TABLE mantenimiento 
ADD COLUMN codigopais VARCHAR(10) DEFAULT '+504';

-- Actualizar registros existentes (opcional)
UPDATE mantenimiento 
SET codigopais = '+504' 
WHERE codigopais IS NULL;
```

### Pasos en Supabase Dashboard:

1. Ve a tu proyecto en https://supabase.com
2. Navega a **SQL Editor** en el menú lateral
3. Crea una nueva query
4. Copia y pega el SQL de arriba
5. Ejecuta la query (botón Run o Ctrl+Enter)

### Alternativa usando Table Editor:

1. Ve a **Table Editor** → tabla `mantenimiento`
2. Click en **Add Column**
3. Configura:
   - **Name**: `codigopais`
   - **Type**: `varchar` o `text`
   - **Default Value**: `'+504'`
   - **Nullable**: ✅ (permitir nulos)
4. Click en **Save**

## Verificación

Después de agregar la columna, recarga la página del formulario y prueba enviar una solicitud. El código de país seleccionado debería guardarse correctamente.

## Países incluidos en el selector

- 🇺🇸 +1 (Estados Unidos/Canadá)
- 🇲🇽 +52 (México)
- 🇬🇹 +502 (Guatemala)
- 🇸🇻 +503 (El Salvador)
- 🇭🇳 +504 (Honduras) - **Por defecto**
- 🇳🇮 +505 (Nicaragua)
- 🇨🇷 +506 (Costa Rica)
- 🇵🇦 +507 (Panamá)
- 🇵🇪 +51 (Perú)
- 🇨🇱 +56 (Chile)
- 🇨🇴 +57 (Colombia)
- 🇻🇪 +58 (Venezuela)
- 🇧🇴 +591 (Bolivia)
- 🇪🇨 +593 (Ecuador)
- 🇪🇸 +34 (España)
- 🇦🇷 +54 (Argentina)
