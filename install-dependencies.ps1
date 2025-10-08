# Script para instalar las dependencias necesarias para el formulario de contacto

Write-Host "🚀 Instalando dependencias para el formulario de contacto con Supabase..." -ForegroundColor Cyan

# Instalar dependencias de React y Supabase
npm install @supabase/supabase-js @astrojs/react react react-dom

Write-Host "✅ Dependencias instaladas correctamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Lee el archivo SETUP_SUPABASE.md para configurar Supabase"
Write-Host "2. Crea un archivo .env con tus credenciales de Supabase"
Write-Host "3. Ejecuta 'npm run dev' para iniciar el servidor"
Write-Host ""
