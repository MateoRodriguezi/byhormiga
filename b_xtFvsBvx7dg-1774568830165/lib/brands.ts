import type { Production } from './types'

// Fallback si la API de /api/productions/ no responde. Contenido real de las
// producciones (marcas/fiestas) migrado a /admin/productions/.
export const mockProductions: Production[] = [
  {
    "slug": "wonder",
    "name": "Wonder",
    "logo": "/logos/logos_Wonder.png",
    "category": "matinee",
    "card_description": "Con una edición mensual y un promedio de 1.300 personas por apertura, desde 2019 se posiciona como una propuesta consolidada dentro del entretenimiento para menores en Uruguay.",
    "hero_image": "/brands/wonder/hero.jpg",
    "destacado": "Desde 2019, Wonder se ha consolidado como una de las propuestas referentes en entretenimiento para menores de edad en Uruguay.",
    "venues_intro": "",
    "venues": [
      {
        "name": "Montevideo Music Box",
        "image": "/brands/wonder/venue-musicbox.jpg"
      },
      {
        "name": "Rambla de Punta Carretas Golf",
        "image": "/brands/wonder/venue-clubdegolf.jpg"
      },
      {
        "name": "Antel Arena",
        "image": "/brands/wonder/venue-antelarena.jpg"
      },
      {
        "name": "Punta Del Este",
        "image": "/brands/wonder/venue-puntadeleste.jpg"
      }
    ],
    "sections": [
      {
        "side": "right",
        "text": "Llevamos adelante una edición mensual con una convocatoria promedio de 1.300 personas por evento.",
        "label": "",
        "images": [
          "/brands/wonder/section1-1.jpg",
          "/brands/wonder/section1-2.jpg",
          "/brands/wonder/section1-3.jpg",
          "/brands/wonder/section1-4.jpg",
          "/brands/wonder/section1-5.jpg"
        ]
      },
      {
        "side": "left",
        "text": "Cada edición propone una experiencia diferente, con temáticas innovadoras y una producción pensada para sorprender en cada encuentro.",
        "label": "",
        "images": [
          "/brands/wonder/section2-1.jpg",
          "/brands/wonder/section2-2.jpg",
          "/brands/wonder/section2-3.jpg",
          "/brands/wonder/section2-4.jpg",
          "/brands/wonder/section2-5.jpg"
        ]
      },
      {
        "side": "right",
        "text": "A lo largo de sus ediciones, Wonder ha contado con la presencia de destacados artistas nacionales e internacionales, potenciando la experiencia y la conexión con su público.",
        "label": "",
        "images": [
          "/brands/wonder/section3-1.jpg",
          "/brands/wonder/section3-2.jpg",
          "/brands/wonder/section3-3.jpg",
          "/brands/wonder/section3-4.jpg",
          "/brands/wonder/section3-5.jpg"
        ]
      }
    ],
    "closing_text": "Trabajamos con todas las medidas de seguridad, habilitaciones y protocolos necesarios para garantizar un espacio de entretenimiento cuidado, confiable y adecuado para menores de edad.",
    "closing_image": "/brands/wonder/closing.jpg"
  },
  {
    "slug": "mood",
    "name": "Mood",
    "logo": "/logos/logos_mood-46.png",
    "category": "matinee",
    "card_description": "Con una edición trimestral y un promedio de 800 personas por apertura, desde 2023 se consolida como una propuesta de entretenimiento para menores, pensada desde la música, la producción y la seguridad.",
    "hero_image": "/brands/mood/hero.jpg",
    "destacado": "Desde 2023, Mood se consolida como una propuesta de entretenimiento para menores de edad, pensada desde la música, la producción y la seguridad.",
    "venues_intro": "",
    "venues": [
      {
        "name": "Carrasco",
        "image": "/brands/mood/venue-carrasco.jpg"
      },
      {
        "name": "Punta Del Este",
        "image": "/brands/mood/venue-puntadeleste.jpg"
      },
      {
        "name": "Kibón",
        "image": "/brands/mood/venue-kibon.jpg"
      }
    ],
    "sections": [
      {
        "side": "right",
        "text": "Realizamos una edición trimestral, con una convocatoria promedio de 800 personas por evento.",
        "label": "",
        "images": [
          "/brands/mood/section1-1.jpg",
          "/brands/mood/section1-2.jpg",
          "/brands/mood/section1-3.jpg",
          "/brands/mood/section1-4.jpg",
          "/brands/mood/section1-5.jpg"
        ]
      },
      {
        "side": "right",
        "text": "Desarrollamos una producción innovadora, creando diferentes temáticas para cada edición y ofreciendo una experiencia dinámica, segura y divertida.",
        "label": "",
        "images": [
          "/brands/mood/section2-1.jpg",
          "/brands/mood/section2-2.jpg",
          "/brands/mood/section2-3.jpg",
          "/brands/mood/section2-4.jpg",
          "/brands/mood/section2-5.jpg"
        ]
      }
    ],
    "closing_text": "Contamos con seguridad, autorizaciones y todos los protocolos necesarios para el desarrollo de cada evento, generando un entorno cuidado y adecuado para el entretenimiento de menores de edad.",
    "closing_image": "/brands/mood/closing.jpg"
  },
  {
    "slug": "madness",
    "name": "Madness",
    "logo": "/logos/logos_Madness.png",
    "category": "plus15",
    "card_description": "Con una edición trimestral y un promedio de 1.300 personas por apertura, desde 2023 se posiciona como una propuesta consolidada dentro del entretenimiento para adolescentes en Uruguay.",
    "hero_image": "/brands/madness/hero.jpg",
    "destacado": "Desde 2023, Madness se posiciona como una propuesta consolidada dentro del entretenimiento para adolescentes en Uruguay.",
    "venues_intro": "",
    "venues": [
      {
        "name": "Montevideo Music Box",
        "image": "/brands/madness/venue-musicbox.jpg"
      },
      {
        "name": "Punta Del Este",
        "image": "/brands/madness/venue-puntadeleste.jpg"
      }
    ],
    "sections": [
      {
        "side": "right",
        "text": "Realizamos una edición trimestral, con una convocatoria promedio de 1.300 personas por evento.",
        "label": "",
        "images": [
          "/brands/madness/section1-1.jpg",
          "/brands/madness/section1-2.jpg",
          "/brands/madness/section1-3.jpg",
          "/brands/madness/section1-4.jpg"
        ]
      },
      {
        "side": "right",
        "text": "Desarrollamos una producción innovadora, creando diferentes temáticas para cada edición y ofreciendo una experiencia dinámica, segura y memorable.",
        "label": "",
        "images": [
          "/brands/madness/section2-1.jpg",
          "/brands/madness/section2-2.jpg",
          "/brands/madness/section2-3.jpg",
          "/brands/madness/section2-4.jpg",
          "/brands/madness/section2-5.jpg"
        ]
      },
      {
        "side": "left",
        "text": "En algunas de nuestras ediciones contamos con shows de artistas nacionales e internacionales, potenciando la experiencia y generando una mayor conexión con el público.",
        "label": "",
        "images": [
          "/brands/madness/section3-1.jpg",
          "/brands/madness/section3-2.jpg",
          "/brands/madness/section3-3.jpg",
          "/brands/madness/section3-4.jpg",
          "/brands/madness/section3-5.jpg"
        ]
      }
    ],
    "closing_text": "Contamos con seguridad, autorizaciones y todos los protocolos necesarios para el desarrollo de cada evento, generando un entorno cuidado y adecuado para el entretenimiento de menores de edad.",
    "closing_image": "/brands/madness/closing.jpg"
  },
  {
    "slug": "close",
    "name": ".CLOSE",
    "logo": "/logos/logos_close.png",
    "category": "plus15",
    "card_description": "Activa desde 2023, con una edición trimestral y un promedio de 1.200 personas por apertura, ofrece una experiencia de alta convocatoria en un entorno seguro y profesional.",
    "hero_image": "/brands/close/hero.jpg",
    "destacado": "Desde 2023, .CLOSE ofrece una experiencia de alta convocatoria para adolescentes, desarrollada en un entorno seguro, cuidado y profesional.",
    "venues_intro": "",
    "venues": [
      {
        "name": "Hangar 33",
        "image": "/brands/close/venue-hangar33.jpg"
      },
      {
        "name": "Carrasco",
        "image": "/brands/close/venue-carrasco.jpg"
      },
      {
        "name": "Punta Del Este",
        "image": "/brands/close/venue-puntadeleste.jpg"
      }
    ],
    "sections": [
      {
        "side": "right",
        "text": "Producimos una edición trimestral y un promedio de 1200 personas por apertura.",
        "label": "",
        "images": [
          "/brands/close/section1-1.jpg",
          "/brands/close/section1-2.jpg",
          "/brands/close/section1-3.jpg",
          "/brands/close/section1-4.jpg",
          "/brands/close/section1-5.jpg"
        ]
      }
    ],
    "closing_text": "Contamos con seguridad, autorizaciones y todos los protocolos necesarios para el desarrollo de cada evento, generando un entorno cuidado y adecuado para el entretenimiento de menores de edad.",
    "closing_image": "/brands/close/closing.jpg"
  },
  {
    "slug": "la-festa",
    "name": "La Festa",
    "logo": "/logos/logos_Lafesta.png",
    "category": "plus15",
    "card_description": "Con una edición trimestral y un promedio de 4.000 personas por apertura, desde 2025 ofrece una experiencia masiva, cuidada y profesional.",
    "hero_image": "/brands/la-festa/hero-card.jpg",
    "destacado": "Desde 2025 ofrece una experiencia masiva, cuidada y profesional para el entretenimiento de adolescentes.",
    "venues_intro": "",
    "venues": [],
    "sections": [
      {
        "side": "right",
        "text": "Realizamos una edición trimestral con un promedio de 4000 personas por apertura.",
        "label": "",
        "images": []
      },
      {
        "side": "full",
        "text": "",
        "label": "Última edición en Rambla del Kibón",
        "images": []
      }
    ],
    "closing_text": "Contamos con seguridad, autorizaciones y todos los protocolos necesarios para la producción de la misma. Generando un ambiente conciliado para el entretenimiento de menores de edad."
  },
  {
    "slug": "code",
    "name": "Code",
    "logo": "/logos/logos_Code.png",
    "category": "plus15",
    "card_description": "Desde 2026 ofrece una experiencia masiva, cuidada y profesional para el entretenimiento de adolescentes.",
    "hero_image": "/brands/code/hero.jpg",
    "destacado": "Desde 2026 ofrece una experiencia masiva, cuidada y profesional para el entretenimiento de adolescentes.",
    "venues_intro": "",
    "venues": [],
    "sections": [
      {
        "side": "right",
        "text": "Realizamos una edición trimestral con un promedio de 3000 personas por apertura.",
        "label": "",
        "images": [
          "/brands/code/section1-1.jpg",
          "/brands/code/section1-2.jpg",
          "/brands/code/section1-3.jpg",
          "/brands/code/section1-4.jpg",
          "/brands/code/section1-5.jpg"
        ]
      }
    ],
    "closing_text": "Contamos con seguridad, autorizaciones y todos los protocolos necesarios para la producción de la misma. Generando un ambiente conciliado para el entretenimiento de menores de edad.",
    "closing_image": "/brands/code/closing.jpg"
  },
  {
    "slug": "china",
    "name": "China",
    "logo": "/logos/logos_China.png",
    "category": "plus18",
    "card_description": "Es una fiesta para público de 18 a 25 años, activa desde 2016. Con una edición semanal y un promedio de 1.500 personas por apertura, es una de las propuestas más constantes de la noche.",
    "hero_image": "/brands/china/hero-card.jpg",
    "destacado": "Desde 2016, China es una de las fiestas más populares de la noche uruguaya, reconocida por su convocatoria amplia y constante.",
    "venues_intro": "",
    "venues": [],
    "sections": [
      {
        "side": "right",
        "text": "Con una edición semanal y un promedio de 1.500 personas por apertura, se consolidó como un punto de encuentro dentro de la escena nocturna local.",
        "label": "",
        "images": [
          "/brands/china/section1-1.jpg",
          "/brands/china/section1-2.jpg",
          "/brands/china/section1-3.jpg",
          "/brands/china/section1-4.jpg",
          "/brands/china/section1-5.jpg"
        ]
      },
      {
        "side": "left",
        "text": "Cada edición combina planificación, coordinación técnica, puesta en escena, comunicación, gestión de artistas y experiencia del público, construyendo una propuesta masiva con identidad propia.",
        "label": "",
        "images": [
          "/brands/china/section2-1.jpg",
          "/brands/china/section2-2.jpg",
          "/brands/china/section2-3.jpg"
        ]
      },
      {
        "side": "right",
        "text": "Grandes artistas nacionales e internacionales han pasado por el escenario de La China, ofreciendo shows de alto nivel para la noche uruguaya.",
        "label": "",
        "images": [
          "/brands/china/section3-1.jpg",
          "/brands/china/section3-2.jpg",
          "/brands/china/section3-3.jpg",
          "/brands/china/section3-4.jpg",
          "/brands/china/section3-5.jpg"
        ]
      }
    ],
    "closing_text": "Una experiencia consolidada dentro de la noche uruguaya, donde producción, música y convocatoria se combinan en cada edición.",
    "closing_image": "/brands/china/closing.jpg"
  },
  {
    "slug": "mala",
    "name": "NoSeasMala",
    "logo": "/logos/logos_Mala.png",
    "category": "plus18",
    "card_description": "Es una fiesta para público de 18 a 22 años, activa desde 2024. Con una edición bimensual y un promedio de 1.000 personas por apertura, se consolida como una propuesta joven, intensa y de alta convocatoria.",
    "hero_image": "/brands/mala/hero.jpg",
    "destacado": "Desde 2024, NoSeasMala se consolida como una propuesta joven, intensa y de alta convocatoria.",
    "venues_intro": "",
    "venues": [
      {
        "name": "Montevideo Music Box",
        "image": "/brands/mala/venue-musicbox.jpg"
      },
      {
        "name": "Sala Maldonado",
        "image": "/brands/mala/venue-salamaldonado.jpg"
      }
    ],
    "sections": [
      {
        "side": "right",
        "text": "Realizamos una edición mensual con un promedio de 1000 personas por apertura.",
        "label": "",
        "images": [
          "/brands/mala/section1-1.jpg",
          "/brands/mala/section1-2.jpg",
          "/brands/mala/section1-3.jpg",
          "/brands/mala/section1-4.jpg",
          "/brands/mala/section1-5.jpg"
        ]
      },
      {
        "side": "left",
        "text": "Cada edición combina planificación, coordinación técnica, puesta en escena, comunicación, gestión de artistas y experiencia del público, construyendo una propuesta masiva con identidad propia.",
        "label": "",
        "images": [
          "/brands/mala/section2-1.jpg",
          "/brands/mala/section2-2.jpg",
          "/brands/mala/section2-3.jpg",
          "/brands/mala/section2-4.jpg",
          "/brands/mala/section2-5.jpg"
        ]
      }
    ],
    "closing_text": "Una experiencia consolidada dentro de la noche uruguaya, donde producción, música y convocatoria se combinan en cada edición.",
    "closing_image": "/brands/mala/closing.jpg"
  },
  {
    "slug": "oversize",
    "name": "Oversize",
    "logo": "/logos/logos_Oversize.png",
    "category": "plus18",
    "card_description": "Es una fiesta para público de 18 a 25 años, activa desde 2022. Con 6 ediciones anuales y un promedio de 3.500 personas por apertura, se destaca por su gran escala y alta convocatoria.",
    "hero_image": "/brands/oversize/hero-card.jpg",
    "destacado": "Activa desde 2022 se destaca por su gran escala y alta convocatoria juvenil.",
    "venues_intro": "Oversize se ha desarrollado en diferentes venues, llevando su convocatoria y energía a distintos puntos del mapa, tanto dentro como fuera de Uruguay.",
    "venues": [
      {
        "name": "Antel Arena",
        "image": "/brands/oversize/venue-antelarena.jpg"
      },
      {
        "name": "Floripa",
        "image": "/brands/oversize/venue-floripa.jpg"
      },
      {
        "name": "Punta Del Este",
        "image": "/brands/oversize/venue-puntadeleste.jpg"
      },
      {
        "name": "Rambla de Punta Carretas Golf",
        "image": "/brands/oversize/venue-rambladepc.jpg"
      },
      {
        "name": "Plaza de Toros, Colonia",
        "image": "/brands/oversize/venue-colonia.jpg"
      },
      {
        "name": "Melo, Cerro Largo",
        "image": "/brands/oversize/venue-melo.jpg"
      },
      {
        "name": "Museo Oceanográfico",
        "image": "/brands/oversize/venue-museo.jpg"
      },
      {
        "name": "Chacra Lacrosse",
        "image": "/brands/oversize/venue-lacrosse.jpg"
      }
    ],
    "sections": [
      {
        "side": "right",
        "text": "Realizamos aproximadamente 6 ediciones anuales con un promedio de 3.500 personas por apertura.",
        "label": "",
        "images": [
          "/brands/oversize/section1-1.jpg",
          "/brands/oversize/section1-2.jpg",
          "/brands/oversize/section1-3.jpg",
          "/brands/oversize/section1-4.jpg",
          "/brands/oversize/section1-5.jpg"
        ]
      },
      {
        "side": "right",
        "text": "Proporcionamos una producción innovadora, generando diferentes temáticas para cada edición para otorgar una diversión asegurada.",
        "label": "",
        "images": [
          "/brands/oversize/section2-1.jpg",
          "/brands/oversize/section2-2.jpg",
          "/brands/oversize/section2-3.jpg",
          "/brands/oversize/section2-4.jpg",
          "/brands/oversize/section2-5.jpg"
        ]
      }
    ],
    "closing_text": "Una experiencia consolidada dentro de la noche uruguaya, donde producción, música y convocatoria se combinan en cada edición.",
    "closing_image": "/brands/oversize/closing.jpg"
  },
  {
    "slug": "nada-que-ver",
    "name": "Nada Que Ver",
    "logo": "/logos/logos_nqv.png",
    "category": "plus18",
    "card_description": "Es una fiesta para público de 30 a 40 años, activa desde 2025. Con una edición trimestral y un promedio de 1.500 personas por apertura, se diferencia por su dinámica sin fotos ni videos y por temáticas distintas en cada fecha.",
    "destacado": "Activa desde 2025 se diferencia por su dinámica sin fotos ni videos y por temáticas distintas en cada fecha.",
    "venues_intro": "",
    "venues": [],
    "sections": [
      {
        "side": "right",
        "text": "Producimos una edición trimestral con un promedio de 1.500 personas por apertura.",
        "label": "",
        "images": []
      }
    ],
    "closing_text": "Las diferentes temáticas son parte central de la identidad de NADA QUE VER. En cada edición, el venue se transforma según el concepto elegido, con una producción cuidada que permite generar una experiencia distinta en cada fecha."
  },
  {
    "slug": "orca",
    "name": "Orca",
    "logo": "/logos/logos_Orca.png",
    "category": "plus18",
    "card_description": "Es una fiesta para público de 30 a 45 años, con una trayectoria de 25 años y una edición actualizada en 2025. Con un promedio de 800 personas por apertura, mantiene una propuesta reconocida y vigente.",
    "hero_image": "/brands/orca/hero.jpg",
    "destacado": "Con una trayectoria de 25 años y una edición en 2025 actualizada, mantiene una propuesta reconocida y vigente.",
    "venues_intro": "",
    "venues": [],
    "sections": [
      {
        "side": "right",
        "text": "Es una fiesta para público de 30 a 45 años, con un promedio de 800 personas por apertura.",
        "label": "",
        "images": [
          "/brands/orca/section1-1.jpg",
          "/brands/orca/section1-2.jpg",
          "/brands/orca/section1-3.jpg",
          "/brands/orca/section1-4.jpg",
          "/brands/orca/section1-5.jpg"
        ]
      }
    ],
    "closing_text": "Una experiencia consolidada dentro de la noche uruguaya, donde producción, música y convocatoria se combinan en cada edición.",
    "closing_image": "/brands/orca/closing.jpg"
  },
  {
    "slug": "hit-the-beach",
    "name": "Hit The Beach",
    "logo": "/logos/logos_Hitthebeach.png",
    "category": "plus18",
    "card_description": "Es una fiesta para público de 18 a 30 años, activa desde 2023. Con una edición anual en Punta del Este, propone una experiencia de temporada en formato playa.",
    "hero_image": "/brands/hit-the-beach/hero.jpg",
    "destacado": "Activa desde 2023 propone una experiencia de temporada en formato playa.",
    "venues_intro": "",
    "venues": [],
    "sections": [
      {
        "side": "right",
        "text": "Festival de verano en Punta del Este dirigido a un público juvenil de 18 a 30 años. En cada apertura convocamos un promedio de 3.000 personas.",
        "label": "",
        "images": [
          "/brands/hit-the-beach/section1-1.jpg",
          "/brands/hit-the-beach/section1-2.jpg",
          "/brands/hit-the-beach/section1-3.jpg",
          "/brands/hit-the-beach/section1-4.jpg",
          "/brands/hit-the-beach/section1-5.jpg"
        ]
      }
    ],
    "closing_text": "Una propuesta destacada dentro de la escena de festivales en Uruguay, que combina producción, música y una gran convocatoria en cada edición.",
    "closing_image": "/brands/hit-the-beach/closing.jpg"
  },
  {
    "slug": "polenta",
    "name": "Polenta",
    "logo": "/logos/polenta.png",
    "category": "coproduccion_internacional",
    "card_description": "Es una fiesta Argentina para público de 20 a 30 años, producimos una edición mensual en Uruguay. Promedia 1.300 personas por apertura y se consolida como una marca fuerte dentro del entretenimiento nocturno.",
    "hero_image": "/brands/polenta/hero-card.jpg",
    "destacado": "Polenta es una fiesta argentina de gran convocatoria que desembarca en Uruguay en 2024, co-producida localmente por By Hormiga.",
    "venues_intro": "",
    "venues": [
      {
        "name": "Antel Arena",
        "image": "/brands/polenta/venue-antelarena.jpg"
      },
      {
        "name": "Punta Del Este",
        "image": "/brands/polenta/venue-puntadeleste.jpg"
      },
      {
        "name": "Montevideo Music Box",
        "image": "/brands/polenta/venue-musicbox.jpg"
      }
    ],
    "sections": [
      {
        "side": "right",
        "text": "Dirigida a jóvenes de 20 a 30 años, la propuesta cuenta con ediciones mensuales en Uruguay y una convocatoria promedio de 1.300 personas por apertura.",
        "label": "",
        "images": [
          "/brands/polenta/section1-1.jpg",
          "/brands/polenta/section1-2.jpg",
          "/brands/polenta/section1-3.jpg",
          "/brands/polenta/section1-4.jpg",
          "/brands/polenta/section1-5.jpg"
        ]
      },
      {
        "side": "right",
        "text": "La experiencia se destaca por una puesta en escena de alto impacto, con shows de luces láser, bailarines y una producción visual pensada para potenciar la energía de cada edición.",
        "label": "",
        "images": [
          "/brands/polenta/section2-1.jpg",
          "/brands/polenta/section2-2.jpg",
          "/brands/polenta/section2-3.jpg",
          "/brands/polenta/section2-4.jpg",
          "/brands/polenta/section2-5.jpg"
        ]
      }
    ],
    "closing_text": "Una propuesta consolidada dentro de la noche argentina y uruguaya, donde producción, música y convocatoria se combinan en cada edición para crear una experiencia de alto impacto.",
    "closing_image": "/brands/polenta/closing.jpg"
  },
  {
    "slug": "caserio",
    "name": "El Caserío Club",
    "logo": "/logos/el-caserio-club.png",
    "category": "coproduccion_internacional",
    "card_description": "Llega desde Argentina con una experiencia para público de 20 a 30 años. Con una edición mensual en Uruguay y un promedio de 1.200 personas por apertura, se destaca por su identidad propia y alta convocatoria.",
    "hero_image": "/brands/caserio/hero.jpg",
    "destacado": "Caserio es una fiesta argentina de gran convocatoria que llega a Uruguay en 2024, co-producida localmente por By Hormiga.",
    "venues_intro": "",
    "venues": [
      {
        "name": "Sala Maldonado",
        "image": "/brands/caserio/venue-salamaldonado.jpg"
      },
      {
        "name": "Montevideo Music Box",
        "image": "/brands/caserio/venue-musicbox.jpg"
      }
    ],
    "sections": [
      {
        "side": "right",
        "text": "Dirigida a jóvenes de 20 a 30 años, la propuesta cuenta con ediciones mensuales y una convocatoria promedio de 1.200 personas por apertura.",
        "label": "",
        "images": [
          "/brands/caserio/section1-1.jpg",
          "/brands/caserio/section1-2.jpg",
          "/brands/caserio/section1-3.jpg",
          "/brands/caserio/section1-4.jpg",
          "/brands/caserio/section1-5.jpg"
        ]
      }
    ],
    "closing_text": "Una propuesta consolidada dentro de la noche argentina y uruguaya, donde producción, música y convocatoria se combinan en cada edición para crear una experiencia de alto impacto."
  },
  {
    "slug": "nonstop",
    "name": "Non Stop",
    "logo": "/logos/non-stop.png",
    "category": "coproduccion_internacional",
    "card_description": "Es una marca Argentina orientada a público de 18 a 25 años, con una edición bimensual en Uruguay. Promedia 1.500 personas por apertura y se caracteriza por su energía, continuidad y conexión con el público joven.",
    "hero_image": "/brands/nonstop/hero-card.jpg",
    "destacado": "Non Stop es una fiesta argentina de gran convocatoria que llega a Uruguay en 2024, co-producida localmente por By Hormiga.",
    "venues_intro": "",
    "venues": [],
    "sections": [
      {
        "side": "right",
        "text": "Dirigida a jóvenes de 18 a 25 años, la propuesta cuenta con ediciones mensuales y una convocatoria promedio de 1.500 personas por apertura.",
        "label": "",
        "images": [
          "/brands/nonstop/section1-1.jpg",
          "/brands/nonstop/section1-2.jpg",
          "/brands/nonstop/section1-3.jpg",
          "/brands/nonstop/section1-4.jpg",
          "/brands/nonstop/section1-5.jpg"
        ]
      }
    ],
    "closing_text": "Una propuesta consolidada dentro de la noche argentina y uruguaya, donde producción, música y convocatoria se combinan en cada edición para crear una experiencia de alto impacto.",
    "closing_image": "/brands/nonstop/closing.jpg"
  },
  {
    "slug": "hay-plan",
    "name": "Hay Plan",
    "logo": "/logos/hay-plan.png",
    "category": "coproduccion_internacional",
    "card_description": "Fiesta de Argentina orientada a público de 25 a 35 años, con una edición bimensual en Uruguay. Promedia 800 personas por apertura y se caracteriza por su energía, continuidad y conexión con el público joven.",
    "hero_image": "/brands/hay-plan/hero.jpg",
    "destacado": "Hay Plan es una fiesta argentina de gran convocatoria que se desarrolla en Uruguay en formato de co-producción local junto a By Hormiga.",
    "venues_intro": "",
    "venues": [],
    "sections": [
      {
        "side": "right",
        "text": "Dirigida a un público de 25 a 35 años, la propuesta cuenta con ediciones trimestrales y una convocatoria promedio de 800 personas por apertura.",
        "label": "",
        "images": [
          "/brands/hay-plan/section1-1.jpg",
          "/brands/hay-plan/section1-2.jpg",
          "/brands/hay-plan/section1-3.jpg",
          "/brands/hay-plan/section1-4.jpg",
          "/brands/hay-plan/section1-5.jpg"
        ]
      }
    ],
    "closing_text": "Una propuesta consolidada dentro de la noche argentina y uruguaya, donde producción, música y convocatoria se combinan en cada edición para crear una experiencia de alto impacto.",
    "closing_image": "/brands/hay-plan/closing.jpg"
  }
]

export const coproduccionNacional = [
  { name: 'After Pacha', logo: '/logos/after-pacha.png' },
  { name: 'Beerhouse', logo: '/logos/beerhouse.png' },
  { name: 'Casauma', logo: '/logos/casauma.png' },
  { name: 'Cordón Beer', logo: '/logos/cordonbeer.png' },
]

export const CATEGORY_LABELS: Record<Production['category'], string> = {
  matinee: 'Matineé',
  plus15: '+15',
  plus18: '+18',
  coproduccion_internacional: 'Co-Producciones',
}
