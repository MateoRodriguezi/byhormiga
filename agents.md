# 🤖 Agents Guide - ByHormiga Project

Esta guía está diseñada para agentes de IA (Claude, GPT, etc.) que trabajan en el proyecto ByHormiga. Contiene el contexto del negocio, patrones arquitectónicos, reglas de negocio y mejores prácticas específicas del proyecto.

---

## 📖 Contexto del Proyecto

### ¿Qué es ByHormiga?
ByHormiga es una **productora de eventos** fundada por Fernando Herrero en Montevideo, Uruguay con más de **30 años de experiencia** en la industria del entretenimiento. Organizan eventos de música electrónica, experiencias culturales y festivales.

### Eventos Principales
- **Hormiga Negra**: Serie icónica de eventos en el Cine Universitario
- **Subterránea**: Experiencias underground en venues como La Trastienda
- **Open Air**: Festivales al aire libre
- **Hormiga Sessions**: Serie íntima de experiencias experimentales

### Estética del Brand
- **Dark/Underground**: Blanco y negro, alto contraste
- **Tipografía**: Bold, uppercase, impactante
- **Vibe**: Auténtico, genuino, no comercial
- **Target**: Personas que valoran experiencias genuinas sobre eventos masivos

---

## 🏗️ Arquitectura del Proyecto

### Filosofía de Diseño
1. **Separación clara**: Frontend y Backend completamente desacoplados
2. **API-First**: El backend expone todo via REST API
3. **Content Management**: Panel de admin para gestión sin código
4. **Cloud-Native**: Diseñado para deployment en cloud (Vercel + Railway)
5. **Docker-First**: Desarrollo local con Docker para consistencia

### Flujo de Datos
```
Admin (Unfold) → Django Models → DRF Serializers → REST API → Next.js → User
     ↓
  Cloudinary (imágenes)
```

---

## 🎯 Reglas de Negocio

### Eventos
1. Un evento SIEMPRE tiene un `venue` (lugar)
2. Estados posibles: `draft`, `published`, `sold_out`, `cancelled`
3. Solo eventos `published` aparecen en el sitio público
4. `featured=True` marca eventos destacados que aparecen en el home
5. Los slugs se generan automáticamente del título
6. Un evento puede tener o no tener álbum de fotos

### Galería
1. Un álbum está vinculado 1:1 con un evento
2. Las fotos tienen un campo `order` para controlar el orden de visualización
3. Solo álbumes con `published=True` se muestran públicamente
4. Las imágenes se suben a Cloudinary automáticamente

### Contacto
1. Los mensajes de contacto se guardan en la BD
2. El propietario los ve en el admin
3. NO se envían emails automáticos (feature pendiente)

---

## 💻 Patrones de Código

### Backend (Django)

#### Modelos
**SIEMPRE:**
- Usa `verbose_name` en español para el admin
- Implementa `__str__()` para representación legible
- Usa `auto_now_add` para `created_at`
- Usa `auto_now` para `updated_at`
- Ordena con `class Meta: ordering`

**EJEMPLO:**
```python
class Event(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="Slug")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Evento"
        verbose_name_plural = "Eventos"
        ordering = ['-date']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
```

#### Serializers
**SIEMPRE:**
- Mapea campos del modelo a nombres esperados por el frontend
- Usa `source` para renombrar campos
- Marca campos computados como `read_only=True`
- Incluye relaciones con serializers nested cuando sea necesario

**EJEMPLO:**
```python
class EventSerializer(serializers.ModelSerializer):
    venue = serializers.CharField(source='venue.name', read_only=True)
    name = serializers.CharField(source='title', read_only=True)
    day = serializers.ReadOnlyField()

    class Meta:
        model = Event
        fields = ['id', 'slug', 'name', 'venue', 'date', 'day']
```

#### ViewSets
**SIEMPRE:**
- Usa `ModelViewSet` o `ReadOnlyModelViewSet`
- Filtra por estado cuando sea público (ej: `queryset = Event.objects.filter(status='published')`)
- Implementa custom actions con `@action` decorator

**EJEMPLO:**
```python
class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.filter(status='published')
    serializer_class = EventSerializer
    lookup_field = 'slug'

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = self.queryset.filter(featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)
```

#### Admin (Unfold)
**SIEMPRE:**
- Registra modelos con `@admin.register(Model)`
- Personaliza `list_display`, `list_filter`, `search_fields`
- Usa `readonly_fields` para timestamps
- Ordena campos con `fields` o `fieldsets`

---

### Frontend (Next.js)

#### Componentes
**SIEMPRE:**
- Server Components por defecto
- Solo usa `'use client'` cuando necesites hooks o interactividad
- Props tipadas con TypeScript interfaces
- Nombres de componentes en PascalCase

**EJEMPLO:**
```typescript
// Server Component
interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="...">
      <h3>{event.name}</h3>
      <p>{event.venue}</p>
    </div>
  )
}

// Client Component
'use client'

export function ContactForm() {
  const [formData, setFormData] = useState({...})
  // ... resto del componente
}
```

#### API Calls
**SIEMPRE:**
- Funciones de API en `lib/api.ts`
- Manejo de errores con try/catch
- Fallback a mock data si falla el API
- Usa `fetch` con `next: { revalidate: 60 }`

**EJEMPLO:**
```typescript
export async function getEvents(): Promise<Event[]> {
  if (!API_BASE_URL) {
    return mockEvents
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/events/`, {
      next: { revalidate: 60 }
    })
    if (!res.ok) throw new Error(`Failed: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error('Error fetching events:', error)
    return mockEvents
  }
}
```

#### Estilos
**SIEMPRE:**
- Usa Tailwind CSS, NUNCA CSS modules
- Sigue la paleta de colores: blanco y negro
- Tipografía uppercase para headings
- Mobile-first responsive design

**CLASES COMUNES:**
```typescript
// Headings
"text-4xl font-bold uppercase tracking-tight"

// Cards
"border border-white/10 bg-black p-6 hover:border-white/30 transition-colors"

// Buttons
"bg-white text-black px-8 py-3 font-bold uppercase hover:bg-white/90 transition-colors"
```

---

## 🚨 Errores Comunes a Evitar

### Backend
❌ **NO HACER:**
- Exponer todos los eventos (incluye drafts)
- Olvidar agregar `verbose_name` en campos
- Hardcodear URLs o paths
- Olvidar migraciones después de cambiar modelos
- Retornar 500 en lugar de 404 cuando no existe

✅ **HACER:**
- Filtrar por `status='published'` en queries públicos
- Usar `verbose_name` en español
- Usar `settings` para configuración
- `uv run --no-sync python manage.py makemigrations` después de cambios
- Retornar 404 con `get_object_or_404()`

### Frontend
❌ **NO HACER:**
- Hacer fetch en Client Components
- Hardcodear la URL del API
- No manejar estados de loading/error
- Usar `any` en TypeScript
- CSS inline o CSS modules

✅ **HACER:**
- Fetch en Server Components o Route Handlers
- Usar `process.env.NEXT_PUBLIC_API_URL`
- Mostrar fallbacks mientras carga
- Tipos estrictos con interfaces
- Tailwind CSS exclusivamente

---

## 🎨 Guía de Estilo

### Nombres
- **Modelos**: Singular en inglés (`Event`, `Photo`)
- **Apps**: Plural en inglés (`events`, `gallery`)
- **Serializers**: `{Model}Serializer`
- **ViewSets**: `{Model}ViewSet`
- **Componentes React**: PascalCase (`EventCard`)
- **Funciones**: camelCase (`getEvents`)
- **Variables**: camelCase (`eventData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Commits
```
feat: agregar endpoint de eventos destacados
fix: corregir filtro de álbumes publicados
docs: actualizar README con instrucciones Docker
style: aplicar formato a serializers
refactor: simplificar lógica de eventos
test: agregar tests para EventViewSet
chore: actualizar dependencias
```

---

## 🔧 Modificaciones Comunes

### Agregar un campo a Event
1. Editar `backend/events/models.py`
```python
class Event(models.Model):
    # ... campos existentes
    capacity = models.IntegerField(null=True, blank=True, verbose_name="Capacidad")
```

2. Crear migración
```bash
make makemigrations
make migrate
```

3. Actualizar serializer
```python
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        fields = [..., 'capacity']  # agregar al final
```

4. Actualizar tipo en frontend
```typescript
export interface Event {
  // ... campos existentes
  capacity?: number
}
```

### Agregar una nueva página
1. Crear `app/nueva-pagina/page.tsx`
```typescript
export default function NuevaPaginaPage() {
  return <main>...</main>
}
```

2. Agregar link en `Navbar.tsx`
```typescript
<Link href="/nueva-pagina">Nueva Página</Link>
```

### Crear un nuevo endpoint
1. Agregar método en ViewSet
```python
@action(detail=False, methods=['get'])
def mi_endpoint(self, request):
    data = self.queryset.filter(...)
    serializer = self.get_serializer(data, many=True)
    return Response(serializer.data)
```

2. Crear función en `lib/api.ts`
```typescript
export async function getMiData(): Promise<Event[]> {
  const res = await fetch(`${API_BASE_URL}/api/events/mi_endpoint/`)
  return await res.json()
}
```

---

## 🐳 Workflow con Docker

### Desarrollo diario
1. `make up` - levantar servicios
2. Hacer cambios en código
3. Los cambios se reflejan automáticamente (hot reload)
4. `make logs` - ver logs si algo falla
5. `make down` - apagar al terminar

### Cambios en modelos
1. Editar modelos
2. `make makemigrations`
3. `make migrate`
4. Verificar en admin

### Agregar dependencia
```bash
# Backend
make uv-add PKG=requests

# Frontend
make frontend-shell
pnpm add axios
```

---

## 📚 Recursos del Proyecto

### Documentación
- [Django Docs](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Django Unfold](https://unfoldadmin.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

### Comandos de Referencia
- Ver `skills.md` para lista completa de comandos
- `make help` para ver comandos disponibles
- `README.md` para overview del proyecto

---

## ✨ Mejores Prácticas

1. **Lee el código existente** antes de agregar nuevo código
2. **Sigue los patrones** ya establecidos en el proyecto
3. **Usa Docker** para desarrollo local
4. **Prueba en local** antes de hacer commit
5. **Commits pequeños** y descriptivos
6. **Documenta** cambios significativos
7. **Tipos estrictos** en TypeScript
8. **Filtra queries** apropiadamente (no expongas drafts)
9. **Maneja errores** gracefully
10. **Mobile-first** en diseño

---

## 🎯 Próximos Pasos Potenciales

Algunas ideas para mejorar el proyecto:

1. **Email notifications** cuando llega un mensaje de contacto
2. **Newsletter signup** para eventos
3. **Social sharing** de eventos
4. **Event calendar view** (vista de calendario)
5. **Filter/search** en galería y eventos
6. **SEO optimization** (meta tags dinámicos)
7. **Analytics** integration (Google Analytics, Vercel Analytics)
8. **Tests** (Django tests, E2E tests con Playwright)
9. **i18n** (internacionalización para inglés/español)
10. **PWA** (Progressive Web App capabilities)

---

## 💡 Cuando Trabajes en Este Proyecto

**RECUERDA:**
- ByHormiga es una marca **auténtica y underground**, no comercial
- El diseño es **blanco y negro**, minimalista, impactante
- El propietario gestiona contenido via **admin**, no código
- Prioriza **simplicidad** sobre features complejas
- El proyecto está en **producción**, ten cuidado con cambios

**SIEMPRE PREGUNTA** si no estás seguro sobre:
- Cambios que afecten el brand/estética
- Modificaciones a la estructura de datos
- Nuevas dependencias o tecnologías
- Cambios en el flujo de deployment

**PRIORIZA:**
- Funcionalidad sobre complejidad
- Performance sobre features
- UX simple sobre opciones múltiples
- Código mantenible sobre código "clever"

---

## 📞 Contacto del Proyecto

- **Equipo**: Mateo Rodriguez, Panita Isaac
- **Repositorio**: https://github.com/MateoRodriguezi/byhormiga
- **Producción**: https://byhormiga.vercel.app

---

**¡Bienvenido al equipo! 🐜**
