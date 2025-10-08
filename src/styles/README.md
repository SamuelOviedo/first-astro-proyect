# 🎨 Estilos del Proyecto

Este directorio contiene todos los estilos CSS personalizados del proyecto.

## 📁 Estructura

```
src/styles/
├── global.css       # Estilos globales y personalizados
└── README.md        # Esta documentación
```

## 🎯 global.css

Contiene todos los estilos personalizados que complementan Tailwind CSS.

### Contenido:

#### 1. **Animaciones de flotación (Float)**
Animaciones para las formas geométricas decorativas en el hero section.

```css
@keyframes float
.animate-float
.animate-float-delayed
.animate-float-delayed-2
```

**Uso:**
```html
<div class="animate-float">
  <!-- Elemento flotante -->
</div>
```

#### 2. **Gradientes personalizados**
```css
.bg-gradient-radial
```

**Uso:**
```html
<div class="bg-gradient-radial from-blue-500 to-purple-500">
  <!-- Contenido con gradiente radial -->
</div>
```

#### 3. **Efectos del header al hacer scroll**
```css
header.scrolled
```

Estilos aplicados automáticamente por JavaScript cuando el usuario hace scroll.

**Características:**
- Fondo más oscuro y translúcido
- Efecto blur mejorado
- Sombra sutil

#### 4. **Animaciones de pulso lentas**
Para los orbes de gradiente en el hero section.

```css
@keyframes pulse-slow
.animate-pulse-slow

@keyframes pulse-slower
.animate-pulse-slower
```

**Uso:**
```html
<div class="animate-pulse-slow">
  <!-- Elemento con pulso lento -->
</div>
```

## 🔧 Importación

Los estilos se importan automáticamente en `src/layouts/Layout.astro`:

```astro
---
import '../styles/global.css';
---
```

Esto significa que todos los estilos están disponibles en todas las páginas del proyecto.

## 🎨 Personalización

### Cambiar la velocidad de las animaciones

**Float:**
```css
.animate-float {
	animation: float 6s ease-in-out infinite;  /* Cambia 6s */
}
```

**Pulse:**
```css
.animate-pulse-slow {
	animation: pulse-slow 3s ease-in-out infinite;  /* Cambia 3s */
}
```

### Modificar el efecto del header scrolled

```css
header.scrolled {
	background: rgba(0, 0, 0, 0.7) !important;  /* Ajusta la opacidad */
	backdrop-filter: blur(20px) !important;     /* Ajusta el blur */
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;  /* Ajusta la sombra */
}
```

### Agregar delays personalizados

Puedes crear más variaciones de delays:

```css
.animate-float-delayed-3 {
	animation: float 6s ease-in-out infinite;
	animation-delay: 6s;
}
```

## 🎭 Clases de animación disponibles

| Clase | Descripción | Duración | Delay |
|-------|-------------|----------|-------|
| `.animate-float` | Flotación básica | 6s | 0s |
| `.animate-float-delayed` | Flotación con delay | 6s | 2s |
| `.animate-float-delayed-2` | Flotación con más delay | 6s | 4s |
| `.animate-pulse-slow` | Pulso lento | 3s | 0s |
| `.animate-pulse-slower` | Pulso más lento | 4s | 0s |

## 🔍 Debugging

Si los estilos no se aplican:

1. ✅ Verifica que `global.css` esté importado en `Layout.astro`
2. ✅ Limpia la caché del navegador (Ctrl + Shift + R)
3. ✅ Reinicia el servidor de desarrollo
4. ✅ Verifica que no haya errores de sintaxis CSS

## 🚀 Mejores prácticas

### ✅ Hacer:
- Usar clases de utilidad de Tailwind cuando sea posible
- Agregar comentarios descriptivos para estilos complejos
- Agrupar estilos relacionados
- Usar variables CSS para valores reutilizables

### ❌ Evitar:
- Estilos inline en componentes (usar clases)
- !important innecesarios
- Animaciones muy pesadas que afecten el rendimiento
- Duplicar estilos que ya existen en Tailwind

## 📚 Recursos adicionales

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN - CSS Animations](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Animations)
- [CSS Tricks - Animation](https://css-tricks.com/almanac/properties/a/animation/)
- [Web.dev - CSS Performance](https://web.dev/css-performance/)

## 🎯 Próximas mejoras sugeridas

- [ ] Agregar variables CSS para colores personalizados
- [ ] Crear mixins para animaciones reutilizables
- [ ] Implementar dark mode
- [ ] Optimizar animaciones para reducir el uso de CPU
- [ ] Agregar transiciones suaves entre páginas
