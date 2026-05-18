# 📋 Guía de Uso del Panel de Administración - ByHormiga

## 🔐 Acceso al Panel de Admin

**URL:** `https://tu-dominio.com/admin`
(o en desarrollo local: `http://localhost:8000/admin`)

**Necesitas:**
- Usuario de administrador
- Contraseña

---

## 👥 Gestión de Usuarios

### Crear un nuevo usuario administrador

1. Ingresar al panel de admin
2. Click en **"Users"** en el menú lateral
3. Click en **"Add User +"** (botón verde arriba a la derecha)
4. Completar:
   - **Username**: nombre de usuario (ej: `maria.perez`)
   - **Password**: contraseña segura
   - **Password confirmation**: repetir contraseña
5. Click en **"Save"**
6. En la siguiente pantalla, completar datos adicionales:
   - **First name**: María
   - **Last name**: Pérez
   - **Email**: maria@byhormiga.com
7. En **"Permissions"**:
   - Marcar ✅ **"Staff status"** (para que pueda acceder al admin)
   - Marcar ✅ **"Superuser status"** (solo si quieres que tenga control total)
   - O seleccionar permisos específicos más abajo
8. Click en **"Save"**

### Tipos de permisos

- **Superuser**: Control total del admin
- **Staff status**: Puede acceder al admin pero con permisos limitados
- **Permisos específicos**:
  - `Can add event`, `Can change event`, `Can delete event`
  - `Can add post`, `Can change post`, `Can delete post`
  - etc.

---

## 🎪 Gestión de Eventos

### Crear un nuevo evento

1. Click en **"Events"** → **"Events"**
2. Click en **"Add Event +"**
3. Completar formulario:

#### Información básica
- **Name**: Nombre del evento (ej: "Tomorrowland")
- **Slug**: Se genera automático del nombre (ej: "tomorrowland")
- **Venue**: Seleccionar lugar (o crear uno nuevo con el botón +)
- **Date**: Fecha del evento
- **Time**: Hora del evento

#### Descripción y detalles
- **Short description**: Descripción breve (aparece en cards)
- **Long description**: Descripción completa (aparece en página de detalle)
- **Ticket URL**: Link a compra de entradas (ej: "https://tickantel.com.uy/evento/123")
- **Price**: Precio (ej: "$500" o "Desde $500")

#### Estado
- **Status**:
  - 🟢 `on_sale` (En venta)
  - 🔴 `sold_out` (Agotado)
  - 🟡 `coming_soon` (Próximamente)
- **Is published**: ✅ Marcar para que aparezca en el sitio
- **Is featured**: ✅ Marcar para destacar en home

#### Imágenes
- **Poster**: Imagen principal del evento (recomendado: 1200x1600px)
- **Banner**: Imagen para header (opcional, recomendado: 1920x600px)

4. Click en **"Save"** o **"Save and add another"**

### Editar un evento existente

1. Click en **"Events"** → **"Events"**
2. Buscar el evento en la lista
3. Click en el nombre del evento
4. Modificar lo que necesites
5. Click en **"Save"**

### Eliminar un evento

1. Click en **"Events"** → **"Events"**
2. Marcar checkbox del evento a eliminar
3. En el dropdown **"Action"** seleccionar **"Delete selected events"**
4. Click en **"Go"**
5. Confirmar eliminación

---

## 📸 Gestión de Galería (Fotos de Eventos)

### Agregar fotos a un evento

1. Click en **"Events"** → **"Events"**
2. Click en el evento al que quieres agregar fotos
3. Scrollear hasta la sección **"Event Photos"** (al final)
4. Click en **"Add another Event Photo"**
5. Para cada foto:
   - **Image**: Subir la foto
   - **Caption**: Descripción opcional (ej: "Público disfrutando")
   - **Order**: Orden de aparición (1, 2, 3...)
6. Click en **"Save"**

### Reordenar fotos

1. Editar el evento
2. En la sección **"Event Photos"**
3. Cambiar el número en **"Order"** (1 = primera, 2 = segunda, etc.)
4. Click en **"Save"**

### Eliminar fotos

1. Editar el evento
2. En la sección **"Event Photos"**
3. Marcar ✅ **"Delete"** en la foto que quieres eliminar
4. Click en **"Save"**

---

## 📰 Gestión de Blog/Prensa

### Crear un artículo nuevo

1. Click en **"Blog"** → **"Posts"**
2. Click en **"Add Post +"**
3. Completar:
   - **Title**: Título del artículo
   - **Slug**: Se genera automático
   - **Author**: Tu nombre
   - **Excerpt**: Resumen corto (aparece en cards)
   - **Content**: Contenido completo (usa editor WYSIWYG)
   - **Featured image**: Imagen principal (recomendado: 1200x800px)
   - **Category**: Categoría (ej: "Prensa", "Noticias")
   - **Tags**: Etiquetas separadas por coma (ej: "tomorrowland, festival")
   - **Is published**: ✅ Marcar para publicar
4. Click en **"Save"**

### Editar/eliminar artículos

Mismo proceso que con eventos.

---

## 🤝 Gestión de Sponsors/Partners

### Agregar un nuevo sponsor

1. Click en **"Partners"** → **"Sponsors"**
2. Click en **"Add Sponsor +"**
3. Completar:
   - **Name**: Nombre de la marca (ej: "Pilsen")
   - **Logo**: Subir logo (PNG transparente recomendado)
   - **Website URL**: Link al sitio web (opcional)
   - **Order**: Orden de aparición
   - **Is active**: ✅ Marcar para mostrar en el sitio
4. Click en **"Save"**

---

## 📧 Mensajes de Contacto

### Ver mensajes recibidos

1. Click en **"Contact"** → **"Contact Messages"**
2. Ver lista de mensajes ordenados por fecha
3. Click en un mensaje para ver detalles completos:
   - Nombre
   - Email
   - Asunto
   - Mensaje
   - Fecha de envío

### Marcar como leído

1. Abrir el mensaje
2. Marcar ✅ **"Is read"**
3. Click en **"Save"**

### Filtrar mensajes

- Usar el sidebar derecho para filtrar:
  - Por estado (leído/no leído)
  - Por fecha

---

## 🎯 Consejos y Buenas Prácticas

### Para Eventos

✅ **Hacer:**
- Usar imágenes de alta calidad (mínimo 1200px de ancho)
- Completar siempre la descripción corta y larga
- Poner precio claro y link de tickets
- Marcar "Is published" solo cuando el evento esté listo
- Usar "Featured" solo para 3-4 eventos principales

❌ **Evitar:**
- Subir imágenes muy pesadas (máx 2MB, comprimir antes)
- Dejar eventos viejos publicados (marcar como no publicados)
- Tener muchos eventos "featured" a la vez

### Para Fotos de Galería

✅ **Hacer:**
- Nombrar las fotos descriptivamente antes de subir
- Mantener un orden lógico (1, 2, 3...)
- Usar fotos horizontales de preferencia (16:9)
- Subir mínimo 5-10 fotos por evento

❌ **Evitar:**
- Subir fotos duplicadas
- Dejar fotos borrosas o de mala calidad

### Para Blog/Prensa

✅ **Hacer:**
- Usar títulos atractivos y claros
- Escribir excerpts (resumen) de 1-2 líneas
- Agregar imagen destacada siempre
- Usar categorías consistentes

---

## 🆘 Problemas Comunes

### "No puedo subir imágenes"
**Solución:** Verificar que la imagen no sea muy pesada (máx 5MB). Comprimir en https://tinypng.com

### "El evento no aparece en el sitio"
**Solución:**
1. Verificar que "Is published" esté marcado
2. Esperar 1-2 minutos (cache del servidor)
3. Hacer hard refresh en el navegador (Cmd+Shift+R o Ctrl+Shift+R)

### "Olvidé mi contraseña"
**Solución:**
1. Click en "Forgot password?" en la pantalla de login
2. O contactar al administrador técnico

---

## 📞 Soporte Técnico

Si tienes problemas que no puedes resolver con esta guía, contacta a:
- **Email**: soporte@byhormiga.com
- **Desarrollador**: [Tu contacto]

---

**Última actualización:** Mayo 2026
**Versión:** 1.0
