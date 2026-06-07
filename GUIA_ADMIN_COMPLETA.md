# Guía de Administración - ByHormiga
## Manual de Usuario del Panel de Administración

---

# 🔐 ACCESO AL SISTEMA

## URL del Panel de Administración
**Producción:** https://byhormiga-production.up.railway.app/admin

**Desarrollo (local):** http://localhost:8000/admin

## Usuarios Administradores Disponibles

### Lu Parada
- **Username:** `lu.parada`
- **Email:** lu.parada@byhormiga.com
- **Contraseña inicial:** `ByHormiga2026!`
- **Permisos:** Superusuario (acceso total)

**🔒 IMPORTANTE:** Cambia tu contraseña la primera vez que ingreses. Ver sección "📱 CAMBIAR TU CONTRASEÑA" más abajo.

### Seba Veres
- **Username:** `seba.veres`
- **Email:** seba.veres@byhormiga.com
- **Contraseña inicial:** `ByHormiga2026!`
- **Permisos:** Superusuario (acceso total)

**🔒 IMPORTANTE:** Cambia tu contraseña la primera vez que ingreses. Ver sección "📱 CAMBIAR TU CONTRASEÑA" más abajo.

## Credenciales de Acceso
Para acceder necesitas:
- **Usuario** (username)
- **Contraseña**

Si no tienes usuario y no eres Lu o Seba, contacta al administrador del sistema.

---

# 👥 CREAR USUARIOS DEL SISTEMA

## ¿Qué datos necesitas pedir a un nuevo usuario?

Cuando alguien del equipo necesite acceso al admin, pídeles:

1. **Nombre completo** (ej: "María Pérez")
2. **Email corporativo** (ej: "maria@byhormiga.com")
3. **Username preferido** (ej: "maria.perez" o "mperez")
   - Sin espacios, todo en minúsculas
   - Puede incluir punto o guion bajo

**TÚ le crearás la contraseña inicial** y se la envías por privado. Ellos podrán cambiarla después.

## Paso a paso: Crear un nuevo usuario

### 1. Acceder a la gestión de usuarios
1. Ingresa al admin: https://byhormiga-production.up.railway.app/admin
2. En el menú lateral izquierdo, busca la sección **"Authentication and Authorization"**
3. Click en **"Users"**
4. Click en el botón **"ADD USER +"** (esquina superior derecha)

### 2. Crear el usuario básico
1. Completar:
   - **Username**: El username que te dio (ej: `maria.perez`)
   - **Password**: Crear una contraseña temporal segura
   - **Password confirmation**: Repetir la misma contraseña
2. Click en **"SAVE"**

### 3. Configurar permisos y datos
Ahora verás una pantalla con más opciones:

#### Datos Personales
- **First name**: Nombre (ej: "María")
- **Last name**: Apellido (ej: "Pérez")
- **Email address**: Email (ej: "maria@byhormiga.com")

#### Permisos (IMPORTANTE)
Marca estas opciones según el rol:

**Para administradores completos:**
- ✅ **Active** (siempre marcado)
- ✅ **Staff status** (permite acceder al admin)
- ✅ **Superuser status** (acceso total)

**Para usuarios con permisos limitados:**
- ✅ **Active** (siempre marcado)
- ✅ **Staff status** (permite acceder al admin)
- ❌ **Superuser status** (NO marcar)
- En la sección **"User permissions"** más abajo, selecciona permisos específicos:
  - Para gestionar eventos: buscar y agregar `events | event | Can add/change/delete event`
  - Para gestionar blog: buscar y agregar `blog | post | Can add/change/delete post`
  - etc.

#### Fechas
- **Date joined**: Se completa automático, no tocar

4. Click en **"SAVE"** al final de la página

### 4. Enviar credenciales al usuario
Envíale por mensaje privado:
```
Hola! Ya creé tu acceso al admin de ByHormiga.

URL: https://byhormiga-production.up.railway.app/admin
Usuario: [username]
Contraseña: [contraseña_temporal]

Por favor cambia tu contraseña al ingresar por primera vez.
```

---

# 🎪 GESTIÓN DE EVENTOS

## Crear un nuevo evento

### 1. Acceder a eventos
1. En el menú lateral, click en **"EVENTS"**
2. Click en **"Events"**
3. Click en **"ADD EVENT +"** (botón verde arriba)

### 2. Completar información del evento

#### Información Básica
- **Name**: Nombre completo del evento
  - Ejemplo: "Tomorrowland Uruguay 2026"

- **Slug**: URL amigable (se genera automático)
  - Ejemplo: "tomorrowland-uruguay-2026"
  - Solo modificar si es necesario

- **Venue**: Lugar del evento
  - Seleccionar de la lista existente
  - O crear uno nuevo con el botón **"+"** verde al lado

- **Date**: Fecha del evento
  - Usar el calendario

- **Time**: Hora de inicio
  - Formato 24hs (ej: 20:00)

#### Descripción del Evento
- **Short description**: Descripción breve (máx 200 caracteres)
  - Aparece en las cards de eventos
  - Ejemplo: "El festival de música electrónica más grande de Sudamérica llega a Uruguay"

- **Long description**: Descripción completa
  - Aparece en la página de detalle del evento
  - Incluir todos los detalles: artistas, actividades, etc.

#### Información de Tickets
- **Ticket URL**: Link directo a la compra
  - Ejemplo: "https://tickantel.com.uy/evento/tomorrowland-2026"

- **Price**: Precio o rango de precios
  - Ejemplos:
    - "$2500"
    - "Desde $1800"
    - "$1800 - $3500"

#### Estado del Evento
- **Status**: Estado de venta
  - 🟢 **On sale** (En venta) - Tiene tickets disponibles
  - 🔴 **Sold out** (Agotado) - Sin tickets
  - 🟡 **Coming soon** (Próximamente) - Pronto en venta

- **Is published**: ¿Mostrar en el sitio?
  - ✅ Marcado = Visible para todos
  - ❌ Desmarcado = Oculto (borrador)

- **Is featured**: ¿Destacar en home?
  - ✅ Marcado = Aparece en sección destacados
  - ❌ Desmarcado = Solo aparece en lista normal
  - **Recomendación:** Destacar solo 3-4 eventos a la vez

#### Imágenes
- **Poster**: Imagen principal del evento (REQUERIDA)
  - **Tamaño recomendado:** 1200 x 1600 pixels (vertical)
  - **Formato:** JPG o PNG
  - **Peso máximo:** 2MB (comprimir en https://tinypng.com si es necesario)
  - Aparece en: Cards de eventos, página de detalle

- **Banner**: Imagen para header (OPCIONAL)
  - **Tamaño recomendado:** 1920 x 600 pixels (horizontal)
  - **Formato:** JPG o PNG
  - **Peso máximo:** 2MB
  - Aparece en: Header de la página de detalle

### 3. Guardar el evento
- **"SAVE"**: Guarda y vuelve a la lista
- **"Save and add another"**: Guarda y abre formulario para crear otro
- **"Save and continue editing"**: Guarda y sigue editando este

## Editar un evento existente

1. **Events** → **Events**
2. Click en el nombre del evento
3. Modificar lo necesario
4. Click en **"SAVE"**

## Eliminar un evento

1. **Events** → **Events**
2. Marcar checkbox(es) del/los evento(s) a eliminar
3. En el dropdown **"Action"** seleccionar **"Delete selected events"**
4. Click en **"GO"**
5. Confirmar la eliminación

---

# 📸 GESTIÓN DE GALERÍA DE FOTOS

## Agregar fotos a un evento

### Método 1: Desde el evento
1. **Events** → **Events**
2. Click en el evento
3. Scrollear hasta abajo: sección **"EVENT PHOTOS"**
4. Click en **"Add another Event photo"**
5. Para cada foto:
   - **Image**: Click en "Choose File" y seleccionar foto
   - **Caption**: Descripción opcional (ej: "Momento del show principal")
   - **Order**: Número de orden (1, 2, 3...)
6. Puedes agregar múltiples fotos de una vez
7. Click en **"SAVE"** al final

### Recomendaciones para fotos
- **Cantidad:** Mínimo 8-10 fotos por evento
- **Tamaño:** 1920 x 1080 pixels (horizontal preferido)
- **Formato:** JPG
- **Peso:** Máximo 1MB por foto
- **Orden:** Poner la mejor foto como #1

## Reordenar fotos

1. Entrar a editar el evento
2. En la sección **"EVENT PHOTOS"**
3. Cambiar los números en **"Order"**
   - 1 = Primera foto
   - 2 = Segunda foto
   - etc.
4. Click en **"SAVE"**

## Eliminar fotos

1. Entrar a editar el evento
2. En la sección **"EVENT PHOTOS"**
3. Marcar ✅ **"DELETE"** en las fotos a eliminar
4. Click en **"SAVE"**

---

# 📰 GESTIÓN DE BLOG / PRENSA

## Crear un artículo nuevo

### 1. Acceder al blog
1. En el menú lateral, click en **"BLOG"**
2. Click en **"Posts"**
3. Click en **"ADD POST +"**

### 2. Completar el artículo

- **Title**: Título del artículo
  - Claro y atractivo
  - Ejemplo: "Tomorrowland Uruguay rompe récord de asistencia"

- **Slug**: URL del artículo (se genera automático)
  - Ejemplo: "tomorrowland-uruguay-rompe-record"

- **Author**: Nombre del autor
  - Tu nombre o "Equipo ByHormiga"

- **Excerpt**: Resumen corto (1-2 líneas)
  - Aparece en las cards de noticias
  - Ejemplo: "Más de 50,000 personas disfrutaron del festival..."

- **Content**: Contenido completo del artículo
  - Usa el editor de texto enriquecido
  - Puedes agregar:
    - Negritas, cursivas
    - Listas
    - Enlaces
    - Imágenes dentro del texto

- **Featured image**: Imagen principal
  - **Tamaño:** 1200 x 800 pixels
  - **Formato:** JPG o PNG
  - **Peso:** Máximo 1MB

- **Category**: Categoría del artículo
  - Seleccionar de la lista o crear nueva
  - Ejemplos: "Prensa", "Noticias", "Eventos"

- **Tags**: Etiquetas (separadas por coma)
  - Ejemplo: "tomorrowland, festival, música electrónica"

- **Published date**: Fecha de publicación
  - Se completa automático con la fecha actual
  - Puedes cambiarla si quieres programar

- **Is published**: ¿Publicar?
  - ✅ Marcado = Visible en el sitio
  - ❌ Desmarcado = Borrador

### 3. Guardar
Click en **"SAVE"**

## Editar/Eliminar artículos
Mismo proceso que con eventos.

---

# 🤝 GESTIÓN DE SPONSORS

## Agregar un nuevo sponsor

### 1. Acceder a sponsors
1. En el menú lateral, click en **"PARTNERS"**
2. Click en **"Sponsors"**
3. Click en **"ADD SPONSOR +"**

### 2. Completar información

- **Name**: Nombre de la marca
  - Ejemplo: "Pilsen", "Red Bull", "Coca-Cola"

- **Logo**: Subir logo
  - **Formato:** PNG con fondo transparente (preferido)
  - **Tamaño:** 400 x 400 pixels (cuadrado)
  - **Peso:** Máximo 500KB
  - **Color:** Preferiblemente blanco o que contraste con fondo oscuro

- **Website URL**: Link al sitio web (opcional)
  - Ejemplo: "https://www.pilsen.com.uy"

- **Order**: Orden de aparición
  - Números más bajos aparecen primero
  - Ejemplo: 1, 2, 3...

- **Is active**: ¿Mostrar en el sitio?
  - ✅ Marcado = Visible
  - ❌ Desmarcado = Oculto

### 3. Guardar
Click en **"SAVE"**

---

# 📧 MENSAJES DE CONTACTO

## Ver mensajes recibidos

### 1. Acceder a mensajes
1. En el menú lateral, click en **"CONTACT"**
2. Click en **"Contact messages"**
3. Verás la lista de todos los mensajes ordenados por fecha

### 2. Ver detalles de un mensaje
Click en el mensaje para ver:
- **Name**: Nombre de quien escribió
- **Email**: Email de contacto
- **Subject**: Asunto del mensaje
- **Message**: Contenido completo
- **Created at**: Fecha y hora de envío
- **Is read**: Estado (leído/no leído)

### 3. Marcar como leído
1. Abrir el mensaje
2. Marcar ✅ **"Is read"**
3. Click en **"SAVE"**

### 4. Filtrar mensajes
En el sidebar derecho puedes filtrar:
- **By Is read**: Solo leídos o solo no leídos
- **By created at**: Por fecha

---

# 🎯 CONSEJOS Y MEJORES PRÁCTICAS

## Para Eventos

### ✅ HACER:
1. **Imágenes de calidad**
   - Mínimo 1200px de ancho
   - Comprimir antes de subir (https://tinypkg.com)
   - Verificar que se vean bien en móvil

2. **Descripciones completas**
   - Siempre llenar descripción corta Y larga
   - Incluir información relevante: horarios, qué incluye, artistas, etc.

3. **Información de tickets clara**
   - Precio visible
   - Link directo a compra
   - Estado correcto (en venta/agotado)

4. **Publicar solo cuando esté listo**
   - No marcar "Is published" hasta tener todo completo
   - Revisar antes de publicar

5. **Featured con criterio**
   - Máximo 3-4 eventos destacados a la vez
   - Destacar solo los eventos más importantes

### ❌ EVITAR:
1. **Imágenes pesadas**
   - No subir fotos de más de 2-3MB
   - Comprimir siempre

2. **Eventos viejos publicados**
   - Desmarcar "Is published" cuando el evento ya pasó
   - O eliminar si ya no es relevante

3. **Demasiados eventos destacados**
   - Si todo es destacado, nada lo es
   - Ser selectivo

## Para Galería de Fotos

### ✅ HACER:
1. **Nombrar fotos antes de subir**
   - Ejemplo: "tomorrowland-escenario-1.jpg"
   - No dejar nombres como "IMG_1234.jpg"

2. **Orden lógico**
   - Primera foto = La mejor/más representativa
   - Resto en orden cronológico o temático

3. **Fotos horizontales**
   - Preferir formato 16:9
   - Se ven mejor en el sitio

4. **Cantidad adecuada**
   - Mínimo 8-10 fotos por evento
   - Máximo 30-40 fotos
   - Calidad sobre cantidad

### ❌ EVITAR:
1. **Fotos duplicadas**
   - Revisar antes de subir

2. **Fotos borrosas o oscuras**
   - Solo fotos de buena calidad

3. **Fotos sin orden**
   - Siempre asignar números de orden

## Para Blog/Prensa

### ✅ HACER:
1. **Títulos atractivos**
   - Claros y concisos
   - Que den ganas de leer

2. **Excerpt siempre**
   - 1-2 líneas que resuman el artículo
   - Aparece en las tarjetas

3. **Imagen destacada obligatoria**
   - Cada artículo debe tener su imagen

4. **Categorías consistentes**
   - Usar las mismas categorías
   - No crear muchas categorías diferentes

### ❌ EVITAR:
1. **Artículos sin imagen**
2. **Excerpt muy largo**
3. **Muchas categorías diferentes**

---

# 🆘 PROBLEMAS COMUNES Y SOLUCIONES

## "No puedo subir una imagen"

**Posibles causas:**
- La imagen es muy pesada

**Solución:**
1. Comprimir la imagen en https://tinypng.com
2. Reducir el tamaño a máximo 2MB
3. Intentar de nuevo

## "El evento no aparece en el sitio"

**Verificar:**
1. ✅ ¿Está marcado "Is published"?
2. ⏱️ Esperar 1-2 minutos (cache del servidor)
3. 🔄 Hacer "hard refresh" en el navegador:
   - Mac: Cmd + Shift + R
   - Windows: Ctrl + Shift + R

## "Olvidé mi contraseña"

**Solución 1:** Recuperar contraseña
1. En la pantalla de login, click en **"Forgot password?"**
2. Ingresar tu email
3. Seguir instrucciones del email

**Solución 2:** Contactar al admin
- Que el administrador te restablezca la contraseña

## "No tengo permiso para hacer algo"

**Causa:**
- Tu usuario no tiene los permisos necesarios

**Solución:**
- Contactar al administrador para que te de permisos

## "El sitio no se actualiza con mis cambios"

**Causa:**
- Cache del navegador

**Solución:**
1. Hacer "hard refresh":
   - Mac: Cmd + Shift + R
   - Windows: Ctrl + Shift + R
2. O borrar cache del navegador

---

# 📱 CAMBIAR TU CONTRASEÑA

## Desde el panel de admin

1. Login al admin
2. En la esquina superior derecha, click en tu nombre de usuario
3. Click en **"Change password"**
4. Completar:
   - **Old password**: Tu contraseña actual
   - **New password**: Nueva contraseña
   - **New password confirmation**: Repetir nueva contraseña
5. Click en **"CHANGE MY PASSWORD"**

## Requisitos de contraseña segura
- Mínimo 8 caracteres
- Combinar letras, números y símbolos
- No usar tu username ni email
- No usar contraseñas obvias (123456, password, etc.)

---

# 📞 SOPORTE Y CONTACTO

Si tienes problemas que no pudiste resolver con esta guía, contacta al equipo técnico de ByHormiga.

---

**Guía actualizada:** Mayo 2026
**Versión:** 2.0
**Sistema:** Django Admin + Unfold Theme

---

# ANEXO: Atajos de Teclado Útiles

**En cualquier parte del admin:**
- `Cmd/Ctrl + S` = Guardar (funciona en formularios)
- `Cmd/Ctrl + K` = Búsqueda rápida

**En listas:**
- Click en encabezado de columna = Ordenar por esa columna
- Usar filtros del sidebar derecho = Filtrar resultados

**Tips adicionales:**
- Todos los cambios se guardan con "SAVE"
- El botón rojo "DELETE" es irreversible
- Usa "Save and continue editing" para seguir trabajando en el mismo item
