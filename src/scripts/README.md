# 📜 Scripts del Proyecto

Este directorio contiene todos los scripts JavaScript que se utilizan en el proyecto.

## 📁 Estructura

```
src/scripts/
└── main.js          # Script principal con toda la funcionalidad de la página
```

## 🎯 main.js

Contiene toda la lógica JavaScript para la página principal (`index.astro`).

### Funcionalidades incluidas:

#### 1. **Header con transparencia al hacer scroll**
- Detecta cuando el usuario hace scroll más de 50px
- Agrega la clase `scrolled` al header para cambiar su apariencia
- Se puede personalizar en los estilos CSS

#### 2. **Botón "Scroll to Top"**
- Aparece cuando el usuario hace scroll más de 300px
- Animación suave de entrada/salida
- Click para volver al inicio de la página con scroll suave

#### 3. **Menú móvil (hamburguesa)**
- Toggle para abrir/cerrar el menú en dispositivos móviles
- Animación del icono hamburguesa a "X"
- Bloqueo del scroll del body cuando el menú está abierto
- Cierre automático al hacer click en un enlace
- Cierre al hacer click fuera del menú

#### 4. **Optimización de scroll**
- Usa `requestAnimationFrame` para throttling
- Mejora el rendimiento evitando múltiples ejecuciones

## 🔧 Uso

El script se importa automáticamente en `index.astro`:

```html
<script src="../scripts/main.js"></script>
```

## 📝 Elementos del DOM requeridos

Para que el script funcione correctamente, necesitas estos elementos en tu HTML:

### Header
```html
<header>
  <!-- Tu contenido del header -->
</header>
```

### Botón Scroll to Top
```html
<button id="scrollToTop">
  <!-- Icono -->
</button>
```

### Menú Móvil
```html
<!-- Botón hamburguesa -->
<button id="mobileMenuBtn">
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
</button>

<!-- Overlay del menú -->
<div id="mobileMenu">
  <nav>
    <a href="#inicio" class="mobile-menu-link">Inicio</a>
    <a href="#servicios" class="mobile-menu-link">Servicios</a>
    <a href="#contacto" class="mobile-menu-link">Contacto</a>
  </nav>
</div>
```

## 🎨 Clases CSS necesarias

El script manipula estas clases CSS:

- `.scrolled` - Se agrega al header al hacer scroll
- `.opacity-0` / `.opacity-100` - Control de opacidad
- `.translate-y-0` / `.translate-y-4` - Animaciones de posición
- `.pointer-events-none` / `.pointer-events-auto` - Control de interactividad

## 🚀 Personalización

### Cambiar el umbral de scroll del header
```javascript
// En main.js, línea ~13
if (currentScrollY > 50) {  // Cambia 50 por el valor deseado
```

### Cambiar cuándo aparece el botón "Scroll to Top"
```javascript
// En main.js, línea ~22
if (currentScrollY > 300) {  // Cambia 300 por el valor deseado
```

### Modificar la animación del menú móvil
```javascript
// En main.js, líneas ~75-77
lines[0].style.transform = 'rotate(45deg) translateY(6px)';
lines[1].style.opacity = '0';
lines[2].style.transform = 'rotate(-45deg) translateY(-6px)';
```

## 🐛 Debugging

Si algo no funciona, verifica:

1. ✅ Los IDs de los elementos coinciden con los del script
2. ✅ El script se carga después del DOM (al final del body)
3. ✅ Las clases CSS están definidas en tus estilos
4. ✅ No hay errores en la consola del navegador

## 📚 Recursos adicionales

- [MDN - requestAnimationFrame](https://developer.mozilla.org/es/docs/Web/API/window/requestAnimationFrame)
- [MDN - Intersection Observer API](https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API) (alternativa para scroll)
- [Web.dev - Optimizing JavaScript](https://web.dev/fast/#optimize-your-javascript)
