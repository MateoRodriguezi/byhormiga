# 🐜 Guía de Administración - Panel Admin BYHORMIGA

## 📋 Índice
1. [Acceso al Panel Admin](#acceso-al-panel-admin)
2. [Gestión de Eventos](#gestión-de-eventos)
3. [Gestión de Galerías/Momentos](#gestión-de-galeriasmomentoss)
4. [Gestión de Noticias/Prensa](#gestión-de-noticiasprensa)
5. [Gestión de Sponsors](#gestión-de-sponsors)
6. [Mensajes de Contacto](#mensajes-de-contacto)
7. [Mejores Prácticas](#mejores-prácticas)

---

## 🔐 Acceso al Panel Admin

### URL del Admin
```
https://byhormiga-production.up.railway.app/admin
```

### Credenciales
- **Usuario:** [Tu usuario de admin]
- **Contraseña:** [Tu contraseña]

> ⚠️ **Importante:** Guarda estas credenciales en un lugar seguro. No las compartas con nadie fuera del equipo.

---

## 🎉 Gestión de Eventos

### Ver Todos los Eventos
1. Entra al admin: https://byhormiga-production.up.railway.app/admin
2. Click en **"Eventos"** en el menú lateral

### Crear un Nuevo Evento

1. Click en **"+ Agregar Evento"** (arriba a la derecha)
2. Completa los campos:

#### Campos Obligatorios ⭐
- **Título:** Nombre del evento (ej: "Wonder Abril 2026")
- **Slug:** Se genera automáticamente del título
- **Descripción:** Descripción corta del evento (1-2 líneas)
- **Fecha y hora:** Fecha y hora exacta del evento
- **Venue:** Selecciona el lugar del evento (ej: "Antel Arena")
- **Estado:** Selecciona el estado del evento:
  - **Borrador:** No se muestra en el sitio (para eventos en preparación)
  - **Publicado:** Se muestra en el sitio como "EN VENTA"
  - **Agotado:** Se muestra como "AGOTADO"
  - **Cancelado:** No se muestra en el sitio

#### Campos Opcionales
- **Descripción larga:** Descripción detallada para la página "Todos los Eventos"
- **Poster:** Imagen del flyer/poster del evento (IMPORTANTE: ver formato más abajo)
- **Logo del evento:** Logo para mostrar en categorías
- **URL de tickets:** Link para comprar tickets (ej: Tickantel, Abitab)
- **Información de precio:** Texto con precios (ej: "$1500 - $2000")
- **Categoría:** Selecciona la categoría del evento:
  - Matineé (12-15 años)
  - +15 (15-17 años)
  - +18 (18+ años)
  - Co-Producción Internacional
  - Co-Producción Nacional
- **Promedio de asistencia:** Promedio de personas por evento
- **Frecuencia:** Ej: "Mensual", "Trimestral", "Anual"
- **Activo desde (año):** Año de inicio del evento
- **Destacado:** ✅ Marcar para que aparezca en el home

3. Click en **"GUARDAR"**

### Editar un Evento Existente
1. En la lista de eventos, click en el nombre del evento
2. Modifica los campos que necesites
3. Click en **"GUARDAR"**

### Formato de Imágenes para Eventos 📸

**Poster/Flyer:**
- Formato: PNG o JPG
- Tamaño recomendado: 1080x1350px (vertical, formato Instagram)
- Peso máximo: 5MB
- Calidad: Alta resolución

**Logo:**
- Formato: PNG con fondo transparente
- Tamaño recomendado: 500x500px
- Peso máximo: 1MB

---

## 📷 Gestión de Galerías/Momentos

### Ver Todas las Galerías
1. En el admin, busca la sección **"Gallery"** o **"Galería"**
2. Click en **"Álbumes"** para ver todas las galerías

### Crear una Nueva Galería de Fotos

1. Click en **"+ Agregar Álbum"**
2. Completa los campos:
   - **Nombre del evento:** Nombre del evento (ej: "Wonder Marzo 2026")
   - **Slug:** Se genera automáticamente
   - **Fecha:** Fecha del evento
   - **Descripción:** Descripción opcional del evento
   - **Publicado:** ✅ Marcar para que se vea en el sitio

3. Click en **"GUARDAR Y CONTINUAR EDITANDO"**

### Agregar Fotos a una Galería

Una vez creado el álbum:

1. Scroll hacia abajo hasta la sección **"Fotos de galería"**
2. Click en **"Agregar otra foto de galería"**
3. Para cada foto:
   - **Imagen:** Click en "Elegir archivo" y selecciona la foto
   - **Caption:** Descripción opcional de la foto
   - **Orden:** Número para ordenar las fotos (1, 2, 3...)

4. Repite para todas las fotos que quieras agregar
5. Click en **"GUARDAR"**

### Formato de Fotos para Galerías 📸

- Formato: JPG (preferido) o PNG
- Tamaño recomendado: 1920x1080px o mayor
- Peso por foto: Máximo 3MB
- Calidad: Alta resolución
- Cantidad recomendada: 10-30 fotos por evento

### Establecer Foto de Portada

La primera foto en orden (Orden = 1) se usará como portada del álbum.

---

## 📰 Gestión de Noticias/Prensa

### Ver Todas las Noticias
1. En el admin, busca **"Blog"** o **"Artículos"**
2. Click para ver todos los posts

### Crear un Artículo de Prensa

1. Click en **"+ Agregar Post"**
2. Completa los campos:
   - **Título:** Título del artículo
   - **Slug:** Se genera automáticamente
   - **Contenido:** Texto del artículo (puedes usar formato Markdown)
   - **Imagen destacada:** Imagen principal del artículo
   - **Categoría:** Tipo de artículo (ej: "Prensa", "Noticias", "Cobertura")
   - **Publicado:** ✅ Marcar para que se vea en el sitio
   - **Destacado:** ✅ Marcar para que aparezca en el home

3. Click en **"GUARDAR"**

### Formato de Imágenes para Noticias 📸

- Formato: JPG o PNG
- Tamaño recomendado: 1200x630px (formato horizontal)
- Peso máximo: 2MB

---

## 🤝 Gestión de Sponsors

### Ver Todos los Sponsors
1. En el admin, busca **"Partners"** o **"Sponsors"**
2. Click para ver todos los sponsors

### Agregar un Nuevo Sponsor

1. Click en **"+ Agregar Partner"**
2. Completa los campos:
   - **Nombre:** Nombre de la marca/empresa
   - **Logo:** Logo del sponsor (ver formato abajo)
   - **URL del sitio web:** Link opcional al sitio del sponsor
   - **Orden:** Número para ordenar (sponsors con número menor aparecen primero)
   - **Activo:** ✅ Marcar para que se muestre en el sitio

3. Click en **"GUARDAR"**

### Formato de Logos de Sponsors 📸

- Formato: PNG con fondo transparente (IMPORTANTE)
- Tamaño recomendado: 400x200px
- Peso máximo: 500KB
- El logo debe ser horizontal o cuadrado

---

## 💬 Mensajes de Contacto

### Ver Mensajes Recibidos

1. En el admin, busca **"Contact"** o **"Contacto"**
2. Click en **"Mensajes"**
3. Verás una lista de todos los mensajes recibidos a través del formulario web

Los mensajes incluyen:
- Nombre de quien contactó
- Email
- Teléfono
- Asunto
- Mensaje
- Fecha de recepción

> 💡 **Tip:** No puedes responder directamente desde el admin. Copia el email y responde desde tu cliente de email habitual.

---

## ✅ Mejores Prácticas

### Al Subir Imágenes

1. **Optimiza antes de subir:**
   - Usa herramientas como TinyPNG.com o Squoosh.app
   - Reduce el peso sin perder calidad
   - Las imágenes más livianas = sitio más rápido

2. **Nombres de archivo:**
   - Usa nombres descriptivos: `wonder-marzo-2026.jpg`
   - Evita caracteres especiales o espacios
   - Usa guiones en lugar de espacios

3. **Formato correcto:**
   - JPG para fotos
   - PNG para logos y gráficos con transparencia

### Al Crear Eventos

1. **Completa todos los campos importantes:**
   - Título claro y específico
   - Fecha y hora exactas
   - Poster de alta calidad
   - URL de tickets funcional

2. **Usa el estado correcto:**
   - **Borrador:** Mientras preparas el evento
   - **Publicado:** Cuando las entradas estén a la venta
   - **Agotado:** Cuando se agoten las entradas
   - **Cancelado:** Si el evento se cancela (no se mostrará)

3. **Categoriza correctamente:**
   - Selecciona la categoría apropiada para que aparezca en la página "Todos los Eventos"

### Al Gestionar Galerías

1. **Selecciona las mejores fotos:**
   - Calidad sobre cantidad
   - 10-30 fotos por evento es ideal
   - Variedad de ángulos y momentos

2. **Ordena las fotos:**
   - La primera foto (Orden = 1) es la más importante
   - Ordena de forma que cuenten una historia

3. **Sube las fotos en lotes:**
   - Puedes agregar múltiples fotos a la vez
   - Usa "Agregar otra foto de galería" varias veces antes de guardar

### Seguridad

- ✅ Cierra sesión cuando termines
- ✅ No compartas credenciales
- ✅ Usa una contraseña fuerte
- ✅ Accede solo desde computadoras seguras

---

## 🆘 Soporte y Ayuda

### Problemas Comunes

**"No puedo subir una imagen"**
- Verifica que el archivo no supere los 5MB
- Prueba con formato JPG en lugar de PNG
- Asegúrate de tener buena conexión a internet

**"El evento no aparece en el sitio"**
- Verifica que el estado sea "Publicado"
- Verifica que la fecha no esté muy en el pasado
- Espera 2-3 minutos y recarga el sitio (puede haber caché)

**"Olvidé mi contraseña"**
- Contacta al administrador técnico del sitio
- Ellos pueden resetear tu contraseña desde Railway

### Contacto Técnico

Si tienes problemas técnicos o preguntas:
- **Email:** [Agregar email de soporte]
- **WhatsApp:** [Agregar número de soporte]

---

## 🎯 Checklist: Publicar un Nuevo Evento

Usa esta lista para asegurarte de no olvidar nada:

- [ ] Crear el evento en el admin
- [ ] Completar título, descripción, fecha y hora
- [ ] Subir poster de alta calidad
- [ ] Agregar URL de venta de tickets
- [ ] Seleccionar venue correcto
- [ ] Seleccionar categoría apropiada
- [ ] Marcar como "Publicado"
- [ ] Marcar "Destacado" si es importante
- [ ] Verificar que aparezca en el sitio web
- [ ] Compartir en redes sociales

---

## 📱 Accesos Rápidos

- **Admin Panel:** https://byhormiga-production.up.railway.app/admin
- **Sitio Web:** https://byhormiga.vercel.app
- **Eventos Activos:** https://byhormiga.vercel.app/eventos/activos
- **Todos los Eventos:** https://byhormiga.vercel.app/eventos/todos
- **Momentos:** https://byhormiga.vercel.app/momentos

---

**¡Listo para empezar! 🚀**

Si tienes dudas o sugerencias para mejorar esta guía, no dudes en contactar al equipo técnico.

---

*Última actualización: Junio 2026*
