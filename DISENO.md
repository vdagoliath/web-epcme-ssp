# Diseño de sitio web corporativo — **Bembé Producciones**

**Sector:** comercialización de música y espectáculos
**Plaza:** Sancti Spíritus, Cuba (con operación en Trinidad y centro del país)
**Tipo de entregable:** diseño de producto digital + prototipo de alta fidelidad navegable
**Versión:** 1.0 · documento de diseño y traspaso a desarrollo
**Autoría:** estudio de diseño (encargo de Bembé Producciones)

> **Nota sobre los datos.** «Bembé Producciones» es el nombre de trabajo propuesto y todos los datos de contacto, precios, artistas, fechas y testimonios del prototipo son **contenido de relleno verosímil** para validar el diseño. Están centralizados y se sustituyen por los reales antes de publicar (ver §14).

---

## 1. Resumen ejecutivo

Bembé Producciones vende tres cosas distintas y el sitio tiene que saberlo: **contrataciones** (a empresas, hoteles e instituciones), **entradas** (al público) y **productos** (discos y mercancía). Cada una tiene un comprador distinto, un recorrido distinto y una llamada a la acción distinta.

La propuesta de diseño es un sitio **mobile-first, ligero y en español**, con una identidad cálida y cubana que no cae en el tópico del cartel turístico, y con una arquitectura que resuelve los dos trabajos principales del negocio:

1. **Que un cliente institucional pida una cotización** sin fricción (formulario + WhatsApp + teléfono visibles siempre).
2. **Que una persona compre una entrada o un disco** en el menor número de pantallas posible.

Todo el sitio está construido pensando en la realidad de la conexión en Cuba: se precarga el armazón de páginas, funciona sin conexión para el contenido ya visitado y pesa poco (ver §11).

---

## 2. Objetivos

### 2.1 Objetivos de negocio

| # | Objetivo | Indicador | Meta a 6 meses |
|---|---|---|---|
| O1 | Aumentar solicitudes de cotización | Formularios + clics a WhatsApp | 60/mes |
| O2 | Reducir el tiempo de venta | Tiempo entre consulta y contrato | −30 % |
| O3 | Vender entradas sin depender de la taquilla física | Reservas online confirmadas | 25 % del aforo |
| O4 | Dar salida comercial a los 42 artistas del catálogo | Fichas con al menos 1 contratación | 50 % del catálogo |
| O5 | Captar clientes extranjeros (hoteles y agencias en Trinidad) | Visitas a la versión EN | 15 % del tráfico |

### 2.2 Objetivos de diseño

- **Claridad comercial:** en cualquier pantalla, el usuario debe poder iniciar una contratación en un clic.
- **Confianza:** la empresa vende servicios de miles de pesos; el diseño debe parecer tan serio como su contrato.
- **Velocidad:** que cargue y se entienda en un 3G espirituano.
- **Coherencia:** un solo sistema de diseño para web, redes y cartelería impresa.

### 2.3 Qué NO es este sitio

No es una red social ni una plataforma de streaming. No se reproduce música con licencia en el sitio (evita conflicto de derechos y peso). No se hacen pagos con tarjeta internacional: el cobro se cierra por las vías cubanas habituales (§11.4).

---

## 3. Contexto e investigación

### 3.1 Realidad del mercado cubano (condicionantes de diseño)

| Condición | Consecuencia en el diseño |
|---|---|
| Conectividad móvil lenta, datos caros, cobertura irregular | Peso mínimo, imágenes SVG, sin vídeo de fondo, caché offline (PWA) |
| Predominio de Android de gama media en pantallas pequeñas | Mobile-first real, áreas táctiles ≥ 44 px, tipografías legibles a 16-17 px |
| WhatsApp es el canal comercial de facto | WhatsApp integrado en cabecera, pie, botón flotante y prellenado de mensajes |
| Pagos por Transfermóvil y EnZona; poco uso de pasarelas | El sitio reserva y confirma; el pago se explica paso a paso, no se procesa |
| Turismo fuerte en Trinidad (Patrimonio de la Humanidad) | Versión en inglés orientada a hoteles, agencias y grupos |
| Trámites con el sectorial de Cultura, gobierno local y orden público | Se comunica que la productora los gestiona: argumento de venta |
| Cortes eléctricos | Se destaca planta eléctrica de respaldo como garantía del espectáculo |
| Alta penetración de Facebook e Instagram, YouTube en alza | El sitio es el centro de la marca; las redes alimentan y confirman |
| Estacionalidad: verano, fin de año, carnaval, fiestas de la ciudad | La portada prioriza «lo que viene esta temporada» |

### 3.2 Referencias y decisiones tomadas

- **Referencias de estructura:** productoras de espectáculos latinoamericanas (catálogo de artistas + formulario de contratación) y ticketeras (cartelera filtrable + política de entradas).
- **Referencias de tono:** la gráfica serigráfica cubana de los años 60-70, reinterpretada con tipografía contemporánea. De ahí la paleta cálida, la textura de semitonos y el uso de la línea como recurso.
- **Antirreferencia:** el sitio «turístico» con palmeras y sombreros. Se evita el folclore decorativo; la cubanía está en el color, la tipografía y el lenguaje, no en el cliché.

---

## 4. Público objetivo

### Persona A — «La institucional»
**Mariela, 47 años, directora de un hotel en Trinidad.**
Necesita programar entretenimiento semanal para huéspedes. Tiene presupuesto en MLC, exige factura, puntualidad y calidad técnica. Navega desde la oficina con conexión aceptable. Valora: rapidez de respuesta, contrato, que el grupo llegue y suene bien.
→ *Recorrido:* Servicios → Artistas → Cotización.

### Persona B — «El del barrio»
**Yunior, 23 años, técnico de telefonía en Sancti Spíritus.**
Se entera de los bailes por Instagram y por el grupo de WhatsApp del barrio. Quiere saber **cuándo, dónde y cuánto**, y reservar sin ir a la taquilla. Datos móviles limitados, navega en el ómnibus.
→ *Recorrido:* Inicio → Cartelera → Reservar por WhatsApp.

### Persona C — «La productora externa»
**Claudia, 35 años, agencia de viajes en La Habana.**
Busca un socio local para clientes que visitan Trinidad. Necesita dossier, precios en EUR/MLC y capacidad técnica demostrable. Navega en escritorio, decide rápido.
→ *Recorrido:* Inicio EN → Servicios → Portafolio → Contacto.

### Persona D — «El que monta la fiesta»
**Osmany, 41 años, dueño de un paladar.**
Va a celebrar el aniversario de su negocio y quiere música en vivo, sonido y animación. No entiende de fichas técnicas: quiere un paquete cerrado con precio.
→ *Recorrido:* Servicios → Paquetes privados → Cotización.

---

## 5. Propuesta de valor y mensajes

**Idea central:** *Del Yayabo para toda Cuba.*
**Promesa operativa:** *«La música empieza a la hora que dice el cartel.»*

| Mensaje | Dónde vive |
|---|---|
| «Contratamos, producimos y garantizamos el show» | Hero, Servicios |
| «42 artistas de aquí, con público y con raíz» | Catálogo de artistas |
| «Sonido y luces propios, con planta de respaldo» | Por qué Bembé, Servicios |
| «Reserva hoy, paga por Transfermóvil, recoge en taquilla» | Cartelera, FAQ, Legal |
| «Si hablas inglés, te atendemos en inglés» | Versión EN |

---

## 6. Arquitectura de información

### 6.1 Mapa del sitio

```
Inicio
├── Servicios (8 anclas)
│   ├── Producción integral
│   ├── Contratación de artistas y management
│   ├── Sonido, iluminación y tarimas
│   ├── Bodas, cumpleaños y fiestas privadas
│   ├── Eventos corporativos e institucionales
│   ├── Estudio de grabación y distribución
│   ├── Venta de entradas y taquilla
│   └── Animación infantil y espectáculos familiares
│   └── Tarifas orientativas (tabla)
├── Artistas (catálogo filtrable, 12 fichas)
│   ├── Filtros por género
│   └── Ficha técnica tipo (tabla) + Cómo contratar
├── Cartelera
│   ├── Filtros por mes y tipo
│   ├── Cómo comprar entradas
│   └── Política de cambios y devoluciones → Legal
├── Tienda (9 productos filtrables)
│   ├── Entradas y preventa
│   └── Envíos, devoluciones y formas de pago
├── Nosotros
│   ├── Quiénes somos · Misión, visión y valores
│   ├── Equipo (#equipo)
│   ├── Portafolio y casos (#portafolio)
│   ├── Línea de tiempo
│   ├── Aliados y clientes
│   └── Trabaja con nosotros (#trabaja)
├── Noticias (destacada + 9 notas + sala de prensa)
├── Contacto
│   ├── Datos y horarios
│   ├── Solicitud de cotización (#cotizacion)
│   ├── Cómo llegar (mapa)
│   ├── Preguntas frecuentes (#faq)
│   └── Trabaja con nosotros (#trabaja)
├── Legal
│   ├── Aviso legal · Privacidad · Cookies
│   ├── Entradas y devoluciones · Accesibilidad
├── English (versión resumida para el mercado turístico)
└── 404 / sin conexión (fase 2)
```

### 6.2 Navegación

- **Principal (8 ítems):** Inicio · Servicios · Artistas · Cartelera · Tienda · Nosotros · Noticias · Contacto.
  Ocho es el máximo tolerable; en escritorio caben, en móvil van en panel lateral.
- **Acción persistente:** botón «Solicitar cotización» siempre visible en la cabecera.
- **Barra superior:** teléfono, WhatsApp, correo y conmutador ES/EN. Es la barra que más convierte en el contexto cubano.
- **Pie:** repite la estructura por bloques funcionales (empresa, servicios, público), boletín y formas de pago, más los enlaces legales.

### 6.3 Reglas de navegación

- Máximo **3 clics** desde la portada a cualquier contenido.
- Toda página tiene **migas de pan** en la portada interna.
- Los filtros de catálogo **no recargan** la página ni cambian la URL en el prototipo (en producción pasarían a parámetros para poder compartir el enlace).

---

## 7. Wireframes

### 7.1 Portada (`index.html`) — móvil

```
┌──────────────────────────────┐
│ ☎ +53… · WhatsApp · ES/EN    │  barra superior (oculta el aviso en móvil)
├──────────────────────────────┤
│ ◉ Bembé          ☰           │  cabecera pegada
├──────────────────────────────┤
│ PRODUCTORA ESPIRITUANA       │
│ La música que mueve          │  H1
│ el centro de Cuba            │
│ [lead de 2 líneas]           │
│ ┌──────────┐┌─────────────┐  │
│ │Cartelera ││ Contratar   │  │  CTA principal / secundaria
│ └──────────┘└─────────────┘  │
│ (son)(trova)(timba)(rumba)   │  chips de géneros
│ ┌──────────────────────────┐ │
│ │ 640+  │ 42 │ 18 años     │ │  cifras animadas
│ └──────────────────────────┘ │
│ [carteles apilados]          │  arte de carteles
├──────────────────────────────┤
│ SON ◆ TROVA ◆ TIMBA ◆ …      │  marquesina infinita
├──────────────────────────────┤
│ CARTELERA                    │
│ Lo que viene esta temporada  │
│ ┌────────┐┌────────┐┌──────┐ │
│ │evento 1││evento 2││ ev 3 │ │  3 tarjetas con cartel,
│ │precio  ││precio  ││      │ │  precio y botón Reservar
│ └────────┘└────────┘└──────┘ │
│ [Ver toda la cartelera]      │
├──────────────────────────────┤
│ QUÉ HACEMOS                  │
│ 6 servicios en tarjetas      │
├──────────────────────────────┤
│ CATÁLOGO · 4 artistas        │
├──────────────────────────────┤
│ POR QUÉ BEMBÉ (fondo oscuro) │
│ lista de garantías + 4 cifras│
├──────────────────────────────┤
│ PORTAFOLIO (galería)         │
├──────────────────────────────┤
│ TESTIMONIOS (3 citas)        │
├──────────────────────────────┤
│ TIENDA (4 productos)         │
├──────────────────────────────┤
│ NOTICIAS (3)                 │
├──────────────────────────────┤
│ FAQ (acordeón)               │
├──────────────────────────────┤
│ [banda CTA degradada]        │
└──────────────────────────────┘
│ PIE: marca · 3 columnas ·   │
│ boletín · pagos · legal      │
└──────────────────────────────┘
                    (WhatsApp)  botón flotante
```

### 7.2 Portada — escritorio (rejilla de 12 columnas)

```
┌──────────────────────────────────────────────────────────────────────┐
│ barra superior                                                       │
├──────────────────────────────────────────────────────────────────────┤
│ ◉ Bembé   Inicio Servicios Artistas Cartelera Tienda Nosotros … [CTA]│
├──────────────────────────────────────────────────────────────────────┤
│                                   │                                  │
│  H1 (1.1fr)                       │   carteles en abanico (0.9fr)    │
│  lead                             │   ┌────┐┌────┐┌────┐             │
│  [CTA] [CTA]                      │   │    ││    ││    │             │
│  chips + cifras                   │   └────┘└────┘└────┘             │
├──────────────────────────────────────────────────────────────────────┤
│  marquesina de géneros a todo el ancho                               │
├──────────────────────────────────────────────────────────────────────┤
│  cabecera de sección (título izq. / enlace der.)                     │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                           │
│  │  tarjeta  │ │  tarjeta  │ │  tarjeta  │   3 columnas              │
│  └───────────┘ └───────────┘ └───────────┘                           │
└──────────────────────────────────────────────────────────────────────┘
```

### 7.3 Cartelera (`eventos.html`)

```
┌───────────────────────────────────────────────┐
│ PORTADA OSCURA                                │
│ Inicio / Cartelera                            │
│ Cartelera                                     │
│ lead                                          │
├───────────────────────────────────────────────┤
│ [Todos][Marzo][Abril][Mayo][Familiar][Corp.]  │  filtros
│ 6 resultados                                  │  aria-live
├───────────────────────────────────────────────┤
│ ┌───────┐ ┌───────┐ ┌───────┐                 │
│ │cartel │ │cartel │ │cartel │                 │
│ │ÚLTIMAS│ │       │ │AGOTADO│  badges         │
│ │fecha  │ │fecha  │ │fecha  │                 │
│ │precio │ │precio │ │precio │                 │
│ │[Reser]│ │[Reser]│ │[--]   │                 │
│ └───────┘ └───────┘ └───────┘                 │
├───────────────────────────────────────────────┤
│ CÓMO COMPRAR ENTRADAS (3 tarjetas)            │
│ aviso: recogida en taquilla                   │
├───────────────────────────────────────────────┤
│ PREGUNTAS (acordeón)                          │
├───────────────────────────────────────────────┤
│ BANDA CTA                                     │
└───────────────────────────────────────────────┘
```

### 7.4 Ficha de artista / servicio

```
┌───────────────────────────────────────────────┐
│ PORTADA: migas + H1 + lead                    │
├───────────────────────────────────────────────┤
│  ┌──────────────┐   texto descriptivo         │
│  │   retrato    │   chips de género           │
│  │   3:4        │   lista de "qué incluye"    │
│  └──────────────┘   [Contratar] [WhatsApp]    │
├───────────────────────────────────────────────┤
│  Ficha técnica (tabla desplazable)            │
├───────────────────────────────────────────────┤
│  Otros artistas del mismo género (3 tarjetas) │
├───────────────────────────────────────────────┤
│  BANDA CTA                                    │
└───────────────────────────────────────────────┘
```

### 7.5 Contacto (`contacto.html`)

```
┌───────────────────────────────────────────────┐
│ PORTADA + migas                               │
├───────────────────────────────────────────────┤
│ ┌────────┐┌────────┐┌────────┐                │
│ │Teléfono││Correo  ││Oficina │  datos         │
│ └────────┘└────────┘└────────┘                │
├───────────────────────────────────────────────┤
│  FORMULARIO (1.25fr)      │  QUÉ PASA DESPUÉS │
│  nombre*                  │  01 …             │
│  teléfono*  correo        │  02 …             │
│  tipo de evento  fecha    │  03 …             │
│  invitados  presupuesto   │  [aviso 24 h]     │
│  servicios (casillas)     │  [rango precios]  │
│  mensaje                  │                   │
│  [acepto privacidad*]     │                   │
│  [Enviar] [WhatsApp]      │                   │
├───────────────────────────────────────────────┤
│  CÓMO LLEGAR (mapa) + referencias             │
├───────────────────────────────────────────────┤
│  FAQ (5)   ·   TRABAJA CON NOSOTROS           │
├───────────────────────────────────────────────┤
│  BANDA CTA                                    │
└───────────────────────────────────────────────┘
```

### 7.6 Estados y componentes transversales

| Componente | Estados |
|---|---|
| Botón | normal · hover (eleva 2 px) · activo · foco (anillo naranja) · deshabilitado |
| Tarjeta | normal · hover (eleva 5 px, zoom de imagen 1.04) |
| Campo de formulario | normal · hover · foco · inválido (borde rojo) |
| Aviso | info · éxito · alerta |
| Badge de evento | a la venta · últimas entradas · agotado · estreno |
| Enlace de navegación | normal · hover · página actual (subrayado degradado) |
| Sin conexión | aviso emergente + contenido servido desde caché |

---

## 8. Sistema de diseño

### 8.1 Principios

1. **Calor antes que frialdad.** Fondo crema, nunca blanco puro, nunca gris corporativo.
2. **La línea como firma.** El recurso gráfico propio es la línea curva del pentagrama y el punto del semitono.
3. **Contraste alto, ruido bajo.** Máximo dos familias tipográficas y una paleta corta.
4. **El cartel manda.** Las imágenes son carteles verticales 4:5: formato heredado de la gráfica cubana.
5. **Nada decorativo que pese.** Todo elemento gráfico es SVG o CSS.

### 8.2 Color — «atardecer del Yayabo»

| Token | Hex | Uso |
|---|---|---|
| `--rojo` | `#D62828` | Acento principal, errores, énfasis |
| `--naranja` | `#F77F00` | Acento secundario, foco, iconos |
| `--amarillo` | `#FCBF49` | Acento terciario, titulares del pie |
| `--verde` | `#0F6B4F` | Éxito, disponibilidad, punto «en vivo» |
| `--azul` / `--azul-profundo` | `#0B4F6C` / `#06344A` | Información, enlaces de apoyo |
| `--tinta` | `#14120F` | Texto, cabecera del pie, fondos oscuros |
| `--grafito` | `#3A352E` | Texto secundario |
| `--piedra` | `#6F6659` | Texto terciario, metadatos |
| `--arena` | `#E9DCC6` | Bordes suaves, fondos de imagen |
| `--crema` | `#FBF6EC` | Fondo general, texto sobre oscuro |

**Degradado de marca:** `linear-gradient(100deg, #D62828, #F77F00 52%, #FCBF49)`. Se usa en botones primarios, iconos de servicio, la banda CTA y el subrayado de la página activa. Nunca en superficies grandes de texto.

**Contraste verificado:** tinta/crema 15.6:1 · grafito/crema 8.9:1 · piedra/crema 4.7:1 · blanco/rojo 5.7:1 · tinta/amarillo 11.4:1 · crema/tinta 15.6:1. Todos ≥ AA; los textos principales superan AAA.

### 8.3 Tipografía

| Rol | Fuente | Detalle |
|---|---|---|
| Titulares | **Fraunces** (serif variable) | 700/800, `letter-spacing: -0.02em`, `opsz` automático. Aporta carácter sin ser historicista. |
| Texto e interfaz | **Archivo** | 400/500/600/700. Excelente legibilidad en pantalla y buen comportamiento en español. |
| Datos y códigos | **IBM Plex Mono** | Precios de tabla, numeración, códigos de entrada. |
| Reserva | Georgia + system-ui | Fallback si no carga Google Fonts (conexión lenta u offline). |

**Escala fluida** (`clamp`): 0.72 / 0.8 / 0.9 / 1.0625 / 1.15 / 1.25-1.5 / 1.5-2 / 1.9-2.85 / 2.3-4 / 2.8-6 rem.
**Interlineado:** 1.62 en texto, 1.06 en titulares. **Medida de línea:** 62-68 caracteres.

> En producción, si se confirma que Google Fonts es inestable en la red cubana, se autoalojan los dos subconjuntos `latin` en WOFF2 (~48 KB) y se sirven desde el propio dominio; el CSS ya apunta a `assets/fonts/`.

### 8.4 Espacio, forma y profundidad

- **Base de 4 px**, escala de 0.25 a 7 rem. Las secciones respiran entre 3.5 y 7 rem según pantalla.
- **Radios:** 6 / 10 / 16 / 24 / 34 px y píldora completa para botones y chips. Nada de esquinas rectas salvo tablas.
- **Sombras:** tres niveles (reposo, hover, flotante). Siempre teñidas con el color de tinta, nunca negro puro.
- **Rejilla:** contenedor máximo 1220 px, canal 860 px para lectura, canal variable `clamp(1.15rem, 4vw, 2.75rem)`.
- **Rejillas automáticas:** `auto-fit` con mínimos de 220/280/320 px para que no haya puntos de ruptura frágiles.
- **Sin desbordamiento:** todo hijo de rejilla o de columna flex lleva `min-width: 0`, y las pistas con imágenes usan `minmax(0, 1fr)`. Sin esto, el ancho intrínseco de una imagen estira la pista y recorta el texto en el móvil (fallo detectado y corregido en la auditoría, ver §16).

### 8.5 Iconografía

Trazo de 1.8 px, esquinas redondeadas, 24×24, hereda el color del texto (`currentColor`). Cada icono vive dentro de un cuadrado de 52 px con el degradado de marca en los bloques de servicio y en versión translúcida en los datos de contacto. Los iconos sociales son de relleno para diferenciarse.

### 8.6 Fotografía y gráfica

- **Carteles 4:5** para eventos; **retratos 3:4** para artistas; **16:9** y **4:3** para ambiente y galería.
- En el prototipo las imágenes son **SVG generados** (degradados + tramas) para no depender de fotos con derechos. En producción se sustituyen por fotografía real con estas reglas: luz cálida de escenario, personas reales del elenco, sin filtros que borren el color de la piel, y siempre con consentimiento firmado de imagen.
- Las imágenes deben ir en WebP con `srcset`, y las de cartel a 400/800/1200 px.

### 8.7 Movimiento

- Duraciones: 140 ms (micro), 260 ms (interfaz), 520 ms (entrada de contenido).
- Curva única: `cubic-bezier(0.22, 0.61, 0.36, 1)`.
- Entradas: aparición con desplazamiento de 22 px, escalonada cada 70 ms.
- Marquesina de géneros en bucle continuo de 34 s, se pausa al pasar el cursor.
- Todo se anula con `prefers-reduced-motion: reduce`.

### 8.8 Componentes del sistema (36)

Botones (6 variantes × 3 tamaños) · chips (5) · badges (4) · filtros pastilla · tarjeta base · tarjeta de evento horizontal · tarjeta de servicio · tarjeta de producto · ficha de persona · cita/testimonio · bloque de estadística · tarjetas de datos de contacto · cabecera pegada · panel de navegación móvil · velo · migas · portada interna · hero con textura · marquesina · cabecera de sección (3) · banda CTA · lista de ticks · lista numerada · línea de tiempo · galería con pie · tabla desplazable · acordeón · pestañas · formulario completo · casillas múltiples · avisos (3) · rango de precios · mapa · pie completo · redes · boletín · métodos de pago · botones flotantes · aviso emergente global.

Todos están implementados en `assets/css/styles.css` con nombres en español y bloque de documentación por sección.

---

## 9. Contenido y tono de voz

**Tono:** directo, cálido, profesional, con sabor cubano sin caricatura. Tuteo en el trato al público, usted en contextos institucionales.

| Sí | No |
|---|---|
| «La música empieza a la hora que dice el cartel» | «¡¡La mejor fiesta de Cuba!!» |
| «Te respondemos en 24 horas con precio y disponibilidad» | «Contáctenos para más información» |
| «Planta eléctrica de respaldo incluida» | «Contamos con tecnología de punta» |
| «Anticipo del 30 % y contrato firmado» | «Condiciones a convenir» |

**Reglas de redacción:** frases cortas, cifras concretas, precios siempre visibles, cero relleno publicitario. Cada página tiene una única llamada a la acción dominante.

**Contenidos obligatorios por página:** título H1 único, entradilla, al menos un dato verificable (cifra, fecha, precio) y una salida hacia cotización.

---

## 10. Accesibilidad

Objetivo declarado: **WCAG 2.1 nivel AA** en todas las plantillas.

- Estructura semántica: `header`, `nav`, `main`, `section` con `aria-labelledby`, `article`, `figure/figcaption`, `footer`.
- Un solo `h1` por página y jerarquía sin saltos.
- Enlace «Saltar al contenido principal» en todas las páginas.
- Foco visible con anillo naranja de 2 px y desplazamiento de 3 px; nunca `outline: none` sin sustituto.
- Navegación por teclado completa: menú móvil con `Escape`, pestañas con flechas e inicio/fin, acordeón con `details/summary` nativo.
- Formularios con `label` asociado, `autocomplete`, marcas de obligatoriedad, validación nativa y `role="status"` para la respuesta.
- `aria-live` en el contador de resultados de los filtros y en los avisos globales.
- Textos alternativos descriptivos; las imágenes decorativas llevan `alt=""` y `aria-hidden`.
- Áreas táctiles ≥ 44×44 px; nunca se depende solo del color para transmitir estado (los badges llevan texto).
- Respeto a `prefers-reduced-motion`.
- Idioma declarado (`es-CU` / `en`) y conmutador con `hreflang`.

---

## 11. Rendimiento, conectividad y pagos

### 11.1 Presupuesto de rendimiento

| Recurso | Presupuesto |
|---|---|
| HTML por página | < 60 KB |
| CSS (un archivo) | < 45 KB |
| JS (un archivo, sin frameworks) | < 10 KB |
| Imágenes de una página | < 150 KB (SVG/WebP) |
| **Total primera visita** | **< 350 KB** |
| LCP en 3G | < 3 s |
| Peticiones | < 20 |

### 11.2 Técnicas aplicadas

- Cero frameworks y cero dependencias: CSS propio y 8 KB de JavaScript con `defer`.
- Imágenes SVG vectoriales y `loading="lazy"` + `decoding="async"` en todas.
- `preconnect` a los servidores de fuentes y `display=swap`.
- Animaciones que solo usan `transform` y `opacity` (compuestas por GPU).
- `IntersectionObserver` para revelar contenido: no se anima lo que no se ve.

### 11.3 Modo sin conexión (PWA)

`manifest.webmanifest` + `sw.js` con precarga del armazón (9 páginas, CSS, JS, logotipos). Estrategia: **red primero para documentos** (contenido fresco de cartelera) y **caché primero para estáticos**. Si falla la red, se sirve lo cacheado y se avisa al usuario. Instalable en Android con accesos directos a Cartelera, Contratar artista y Tienda.

### 11.4 Pagos y reservas

El sitio **no procesa pagos**. El flujo es: reserva en el sitio → confirmación por WhatsApp o teléfono → pago por efectivo en taquilla, Transfermóvil, EnZona o MLC/EUR para clientes institucionales → entrega de la entrada. Esta decisión evita pasarelas no disponibles en Cuba y mantiene el diseño honesto con la operación real. La política completa vive en `legal.html#entradas`.

---

## 12. SEO y medición

- Títulos y descripciones únicos por página, orientados a intención («contratar grupo musical Sancti Spíritus», «cartelera Trinidad»).
- Datos estructurados `LocalBusiness` con dirección, geolocalización, horario, monedas y formas de pago aceptadas. En fase 2 se añaden `MusicEvent` por evento y `Product` en la tienda.
- `sitemap.xml`, `robots.txt`, `canonical` y `hreflang` ES/EN.
- URLs cortas y estables en español (`/eventos.html`, `/artistas.html`).
- Fase 2: migrar a URLs limpias (`/cartelera/`, `/artistas/son-del-yayabo/`) con redirecciones 301.
- Analítica: medir envíos de formulario, clics a WhatsApp, clics a teléfono, reservas y visitas a la versión EN. Sin cookies de terceros.

---

## 13. Hoja de ruta

| Fase | Alcance | Plazo estimado |
|---|---|---|
| **0. Validación** (esta entrega) | Sistema de diseño + prototipo navegable + documento | — |
| **1. Contenido real** | Fotos, logotipo definitivo, textos legales revisados, precios reales | 2 semanas |
| **2. Desarrollo y CMS** | Maquetación final, panel para publicar eventos y noticias, formularios con correo y respaldo en hoja de cálculo | 4-6 semanas |
| **3. Tienda con carrito** | Carrito, generación de entradas con código QR y lector en taquilla | 4 semanas |
| **4. Mejoras** | Fichas individuales por artista y por evento, buscador, vídeo ligero, boletín automatizado, área de cliente | continuo |

**Prioridad alta para la fase 2:** ficha individual de artista y de evento (hoy son listados) porque son las páginas que captan tráfico desde buscadores.

---

## 14. Entregables y estructura de archivos

```
web-bembe-producciones/
├── index.html                 Portada (página de referencia del sistema)
├── servicios.html             8 servicios + tarifas + cómo trabajamos
├── artistas.html              Catálogo filtrable + ficha técnica + contratación
├── eventos.html               Cartelera filtrable + compra de entradas
├── tienda.html                Productos + entradas + envíos
├── nosotros.html              Historia, equipo, portafolio, línea de tiempo
├── noticias.html              Nota destacada + 9 notas + sala de prensa
├── contacto.html              Datos, cotización, mapa, FAQ, empleo
├── legal.html                 Aviso, privacidad, cookies, entradas, accesibilidad
├── en/index.html              Versión inglesa para el mercado turístico
├── manifest.webmanifest       Instalación como aplicación
├── sw.js                      Funcionamiento sin conexión
├── robots.txt · sitemap.xml   SEO
├── DISENO.md                  Este documento
├── README.md                  Guía rápida del proyecto
├── herramientas/              Control de calidad automatizado
│   ├── verificar.py           Enlaces, alt, estructura y colisiones de atributos
│   ├── pruebas_funcionales.py Filtros, pestañas, formulario y menú en Chrome
│   └── auditar_movil.mjs      Emulación móvil y de escritorio por CDP
├── capturas/                  Vistas de referencia del prototipo
└── assets/
    ├── css/styles.css         Sistema de diseño completo, documentado por secciones
    ├── js/main.js             Navegación, filtros, formularios, PWA
    ├── docs/                  Dossier descargable de la sala de prensa
    └── img/                   27 SVG: logotipo, favicon, 6 carteles,
                               8 retratos, 9 ambientes, textura
```

### Datos a sustituir antes de publicar

1. Nombre comercial y logotipo definitivos (hoy `logo-bembe.svg`).
2. Teléfono, WhatsApp, correos y dirección reales (hoy `+53 53 00 00 00`).
3. Nombres de artistas, agrupaciones e integrantes, con sus contratos de representación.
4. Fotografías con derechos y consentimiento de imagen.
5. Precios y tarifas vigentes según la tasa de cambio del momento.
6. Datos fiscales en `legal.html` (NIT, número de inscripción).
7. Textos legales revisados por asesoría jurídica.
8. Enlaces reales de redes sociales y píxeles de medición si se autorizan.

---

## 15. Supuestos, riesgos y decisiones abiertas

| Riesgo | Impacto | Mitigación |
|---|---|---|
| La conexión no permite cargar Google Fonts | La marca pierde carácter | Autoalojar las fuentes en `assets/fonts/` (el CSS ya lo contempla) |
| No hay fotos profesionales | El sitio parece genérico | Plan de fotografía de un día en un ensayo + retratos de estudio; mientras, se mantienen los SVG |
| Saturación de artistas sin contrato de representación | Riesgo legal y comercial | Publicar solo artistas con contrato firmado y ficha técnica aprobada |
| Publicación de precios en un contexto inflacionario | Desactualización rápida | Precios de referencia con fecha visible y confirmación por contrato |
| Un solo canal (WhatsApp) | Dependencia de un tercero | Mantener teléfono y correo visibles y formulario con respaldo por correo |
| Contenido de la cartelera caduca | Sitio «muerto» | Cartelera con caducidad automática y CMS sencillo en fase 2 |

### Decisiones abiertas para el cliente

1. ¿Se publica la tienda con carrito en la fase 1 o se mantiene como catálogo con reserva por WhatsApp?
2. ¿Se habilita el inglés completo (todos los servicios) o basta la portada traducida?
3. ¿Se muestra la dirección exacta de la oficina en el mapa o solo referencias?
4. ¿Se aceptan testimonios con nombre y cargo reales o se publican de forma anónima?

---

## 16. Verificación realizada

El prototipo no se entregó «a ojo»: se auditó con tres herramientas incluidas en `herramientas/`, todas ejecutables sin instalar nada (solo Python 3 y Chrome).

```
python3 herramientas/verificar.py            # 12 páginas, 0 errores, 0 avisos
python3 herramientas/pruebas_funcionales.py  # filtros, pestañas, formulario, menú
node    herramientas/auditar_movil.mjs       # emulación móvil 390×844
```

**Resultados**

| Comprobación | Resultado |
|---|---|
| Enlaces y recursos locales rotos | 0 |
| Imágenes sin texto alternativo | 0 |
| Páginas con un solo `h1`, `lang` y `<main>` | 12 de 12 |
| Filtros de cartelera / artistas / tienda / noticias | 6→2→6 · 12→1 · 9→3 · 9→1, con contador `aria-live` correcto |
| Pestañas legales | 5 pestañas, un solo panel visible, `aria-selected` correcto |
| Formulario de contacto | Respuesta visible y enlace de WhatsApp generado con los datos |
| Menú móvil | Abre y cierra correctamente |
| Desbordamiento horizontal a 390 px | Ninguno en las 10 plantillas (`scroll = viewport`) |

**Fallos reales encontrados y corregidos durante la auditoría**

1. **La barra de filtros desaparecía.** El fallo más grave. El script de cifras animadas seleccionaba todos los `[data-contador]`, y las barras de filtros usaban ese mismo atributo para apuntar a su contador de resultados. Al entrar en pantalla, el bloque de cifras interpretaba `"#filtro-eventos"` como un número, obtenía `NaN` y **sustituía el contenido de toda la barra por ese texto**, borrando los botones. Se corrigió en tres frentes: el atributo de los filtros pasó a `data-contador-filtro`, el selector de cifras se limitó a `.stat__cifra[data-contador]` y el animador ya no escribe nada si el valor no es numérico. `herramientas/verificar.py` incorpora una comprobación estática que impide que la colisión vuelva a colarse.
2. **Desbordamiento del hero en móvil.** Las pistas `1fr` tienen `min-width: auto` y el ancho intrínseco de los carteles (800 px) ensanchaba la columna; el `overflow: hidden` del hero lo disimulaba recortando el texto. Se corrigió con `min-width: 0` en los hijos de rejilla y `minmax(0, 1fr)` en las pistas con imagen.
3. **Scroll horizontal por el panel de navegación.** El panel cerrado, desplazado fuera del viewport, generaba 884 px de ancho de documento en un móvil de 390 px. Ahora el panel cerrado usa `display: none`, lo que además impide que sus enlaces sigan siendo enfocables con el teclado.
4. **Cabecera pegada rota.** Al intentar recortar el desbordamiento con `overflow-x` en la raíz, `position: sticky` dejaba de funcionar. Se resolvió atacando la causa (el panel) y no el síntoma.
5. **Los filtros no filtraban.** Faltaba una regla global `[hidden] { display: none }`; el `display: flex` de las tarjetas ganaba al atributo `hidden` que pone el JavaScript. Afectaba a artistas, cartelera, tienda y noticias.
6. **Contenido invisible sin JavaScript.** Las tarjetas con animación de entrada quedaban en `opacity: 0` si el observador no llegaba a ejecutarse. Ahora el estado oculto depende de una clase `.js` que se añade en el `<head>`, de modo que sin JavaScript todo el contenido se ve.
7. **Áreas táctiles pequeñas.** Los enlaces de la barra superior y del pie medían 15-18 px de alto, y los datos de contacto 16-19 px. Ahora alcanzan 30 px, por encima del mínimo de 24 px de WCAG 2.2 (2.5.8).

> **Nota metodológica.** Parte de los hallazgos iniciales llegaron a parecer defectos de maquetación cuando en realidad eran capturas a medio pintar de Chrome en modo `--screenshot`. La verificación fiable se hizo con el protocolo de depuración (CDP), esperando al evento de carga y al render completo, y contrastando siempre el DOM y los estilos calculados antes de dar por bueno un diagnóstico.

---

## 17. Cómo revisar el prototipo

1. Abrir `index.html` en cualquier navegador (no requiere servidor).
2. Recorrer el menú completo: las 9 páginas están enlazadas.
3. Probar en una ventana estrecha (< 1080 px) el menú lateral y (< 720 px) el apilado de tarjetas.
4. Probar los filtros en Artistas, Cartelera y Tienda; el acordeón en la portada y en Servicios; las pestañas en Legal.
5. Enviar el formulario de contacto o el boletín para ver la respuesta y el envío por WhatsApp.
6. Navegar solo con teclado (Tab, Enter, Escape, flechas en las pestañas).
7. Para probar el modo sin conexión hace falta servir el sitio por HTTP (`python3 -m http.server`) y desactivar la red tras la primera visita.
