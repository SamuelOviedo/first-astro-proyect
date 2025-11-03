# Guía: Personalizar Correos de Confirmación en Supabase

## 📧 Cómo personalizar los emails de Supabase

### Paso 1: Acceder a la configuración de Email Templates

1. Ve a tu proyecto en **Supabase Dashboard**: https://supabase.com
2. En el menú lateral, ve a **Authentication** → **Email Templates**
3. Verás varias plantillas disponibles:
   - **Confirm signup** (Confirmar registro)
   - **Invite user** (Invitar usuario)
   - **Magic Link** (Link mágico)
   - **Change Email Address** (Cambiar email)
   - **Reset Password** (Restablecer contraseña)

### Paso 2: Editar la plantilla "Confirm signup"

1. Click en **"Confirm signup"**
2. Verás un editor con HTML
3. Reemplaza el contenido con la plantilla personalizada (ver abajo)
4. Click en **Save** para guardar los cambios

---

## 🎨 Plantilla Personalizada para GrayStackDev

### Plantilla HTML para "Confirm Signup"

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirma tu cuenta - GrayStackDev</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Container principal -->
        <table width="600" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1);">
          
          <!-- Header con gradiente naranja -->
          <tr>
            <td style="background: linear-gradient(135deg, #c2410c 0%, #ea580c 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                🔧 GrayStackDev
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 500;">
                Soluciones Tecnológicas
              </p>
            </td>
          </tr>

          <!-- Contenido principal -->
          <tr>
            <td style="padding: 40px 30px; background: #1a1a1a;">
              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                ¡Bienvenido a GrayStackDev! 👋
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Gracias por registrarte. Estamos emocionados de tenerte con nosotros.
              </p>

              <p style="margin: 0 0 30px 0; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Para completar tu registro y activar tu cuenta, por favor confirma tu correo electrónico haciendo click en el botón de abajo:
              </p>

              <!-- Botón de confirmación -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 10px 0 30px 0;">
                    <a href="{{ .ConfirmationURL }}" 
                       style="display: inline-block; background: linear-gradient(135deg, #c2410c 0%, #ea580c 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.4); transition: all 0.3s;">
                      ✓ Confirmar mi correo
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Información adicional -->
              <div style="background: rgba(255, 255, 255, 0.05); border-left: 3px solid #ea580c; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">
                  ℹ️ Información importante:
                </p>
                <p style="margin: 0; color: #9ca3af; font-size: 14px; line-height: 1.5;">
                  Este enlace expirará en <strong style="color: #ea580c;">24 horas</strong>. Si no solicitaste esta cuenta, puedes ignorar este correo de forma segura.
                </p>
              </div>

              <!-- Link alternativo -->
              <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
                Si el botón no funciona, copia y pega este enlace en tu navegador:
              </p>
              <p style="margin: 0; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 6px; word-break: break-all;">
                <a href="{{ .ConfirmationURL }}" style="color: #ea580c; text-decoration: none; font-size: 13px;">
                  {{ .ConfirmationURL }}
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">
                ¿Necesitas ayuda? Contáctanos
              </p>
              <p style="margin: 0 0 20px 0;">
                <a href="mailto:soporte@graystackdev.com" style="color: #ea580c; text-decoration: none; font-size: 14px; font-weight: 500;">
                  soporte@graystackdev.com
                </a>
              </p>
              
              <div style="margin: 20px 0; height: 1px; background: rgba(255, 255, 255, 0.1);"></div>
              
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © 2024 GrayStackDev. Todos los derechos reservados.
              </p>
              <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 12px;">
                Soluciones integrales de mantenimiento, desarrollo web y plataformas educativas
              </p>
            </td>
          </tr>

        </table>

        <!-- Texto de opt-out -->
        <table width="600" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
          <tr>
            <td align="center">
              <p style="margin: 0; color: #6b7280; font-size: 11px;">
                Recibiste este correo porque te registraste en GrayStackDev.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 🎨 Colores utilizados (tu paleta)

- **Fondo oscuro**: `#1a1a1a`, `#0a0a0a`
- **Naranja principal**: `#ea580c` (orange-600)
- **Naranja oscuro**: `#c2410c` (orange-700)
- **Texto blanco**: `#ffffff`
- **Texto gris claro**: `#d1d5db`
- **Texto gris**: `#9ca3af`
- **Texto gris oscuro**: `#6b7280`

---

## 📝 Otras plantillas a personalizar

### 1. **Reset Password** (Restablecer contraseña)

```html
<!-- Similar estructura, cambiar título y texto -->
<h2>Restablece tu contraseña 🔐</h2>
<p>Recibimos una solicitud para restablecer tu contraseña...</p>
<a href="{{ .ConfirmationURL }}">Restablecer contraseña</a>
```

### 2. **Magic Link** (Enlace mágico)

```html
<h2>Tu enlace de acceso mágico ✨</h2>
<p>Haz click en el botón para iniciar sesión sin contraseña...</p>
<a href="{{ .ConfirmationURL }}">Iniciar sesión</a>
```

### 3. **Change Email** (Cambiar email)

```html
<h2>Confirma tu nuevo correo 📧</h2>
<p>Para completar el cambio de correo electrónico...</p>
<a href="{{ .ConfirmationURL }}">Confirmar nuevo correo</a>
```

---

## ⚙️ Variables disponibles en las plantillas

Supabase proporciona estas variables que puedes usar:

- `{{ .ConfirmationURL }}` - URL de confirmación
- `{{ .Token }}` - Token de confirmación
- `{{ .TokenHash }}` - Hash del token
- `{{ .SiteURL }}` - URL de tu sitio
- `{{ .Email }}` - Email del usuario

---

## ✅ Checklist de implementación

- [ ] Acceder a Supabase Dashboard
- [ ] Ir a Authentication → Email Templates
- [ ] Editar "Confirm signup"
- [ ] Pegar la plantilla personalizada
- [ ] Guardar cambios
- [ ] Probar registrando un nuevo usuario
- [ ] Verificar que el email se vea correctamente
- [ ] Repetir para otras plantillas (Reset Password, etc.)

---

## 🧪 Cómo probar

1. Cierra sesión en tu aplicación
2. Registra una nueva cuenta con un email real
3. Revisa tu bandeja de entrada
4. Verifica que el email tenga los colores de GrayStackDev
5. Haz click en el botón de confirmación
6. Verifica que funcione correctamente

---

## 💡 Tips adicionales

### Responsive en móviles
La plantilla usa tablas HTML (compatible con todos los clientes de email) y es responsive.

### Testing
Usa servicios como:
- **Litmus** - Para probar en diferentes clientes de email
- **Email on Acid** - Testing de compatibilidad
- **Gmail, Outlook, Apple Mail** - Prueba manual

### Personalización adicional
Puedes agregar:
- Logo de tu empresa (usando `<img>` con URL absoluta)
- Enlaces a redes sociales
- Información de contacto adicional
- Términos y condiciones

---

## 🚨 Notas importantes

1. **Usa URLs absolutas** para imágenes (no relativas)
2. **Inline CSS** es más compatible que `<style>` tags
3. **Tablas HTML** funcionan mejor que divs para emails
4. **Prueba en múltiples clientes** (Gmail, Outlook, etc.)
5. **No uses JavaScript** - no funciona en emails

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que guardaste los cambios en Supabase
2. Revisa la carpeta de spam
3. Confirma que las variables `{{ }}` estén correctas
4. Consulta la documentación de Supabase: https://supabase.com/docs/guides/auth/auth-email-templates
