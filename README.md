# Bembé Producciones — sitio web corporativo (prototipo)

Prototipo de alta fidelidad del sitio web de una empresa que **comercializa música y espectáculos en Sancti Spíritus, Cuba**: contratación de artistas, producción de eventos, sonido e iluminación, estudio de grabación, venta de entradas y tienda.

- **Diseño y justificación:** ver [`DISENO.md`](DISENO.md)
- **Sistema de diseño:** [`assets/css/styles.css`](assets/css/styles.css) (documentado por secciones)
- **Sin dependencias:** HTML, CSS y JavaScript propios. No hay `npm install` ni build.

## Cómo verlo

Basta abrir `index.html` en el navegador. Para probar el modo sin conexión (service worker) hace falta servirlo por HTTP:

```bash
cd web-bembe-producciones
python3 -m http.server 8080
# abrir http://localhost:8080
```

## Páginas

| Archivo | Contenido |
|---|---|
| [`index.html`](index.html) | Portada: hero, marquesina, cartelera, servicios, artistas, garantías, galería, testimonios, tienda, noticias, FAQ, CTA |
| [`servicios.html`](servicios.html) | 8 servicios, tarifas orientativas, proceso de trabajo, FAQ |
| [`artistas.html`](artistas.html) | Catálogo filtrable de 12 artistas, ficha técnica, cómo contratar |
| [`eventos.html`](eventos.html) | Cartelera filtrable, cómo comprar entradas, política de cambios |
| [`tienda.html`](tienda.html) | 9 productos filtrables, preventa de entradas, envíos y devoluciones |
| [`nosotros.html`](nosotros.html) | Historia, misión y valores, equipo, portafolio, línea de tiempo, empleo |
| [`noticias.html`](noticias.html) | Nota destacada, 9 notas filtrables, sala de prensa |
| [`contacto.html`](contacto.html) | Datos, formulario de cotización, mapa, FAQ, trabaja con nosotros |
| [`legal.html`](legal.html) | Aviso legal, privacidad, cookies, entradas y devoluciones, accesibilidad |
| [`en/index.html`](en/index.html) | Versión en inglés para hoteles, agencias y turismo |

## Estructura

```
assets/
├── css/styles.css     Sistema de diseño (tokens, componentes, utilidades)
├── js/main.js         Menú, filtros, pestañas, formularios, PWA
├── docs/              Dossier descargable de la sala de prensa
└── img/               27 SVG generados: logotipo, carteles, retratos, ambientes

capturas/              Vistas de referencia (escritorio y móvil)
herramientas/          Control de calidad (no forma parte del sitio publicado)
├── verificar.py            Enlaces, alt, estructura y colisiones de atributos
├── pruebas_funcionales.py  Filtros, pestañas, formulario y menú en Chrome
└── auditar_movil.mjs       Emulación móvil y de escritorio por CDP
```

## Verificación

```bash
python3 herramientas/verificar.py            # 10 páginas: 0 errores, 0 avisos
python3 herramientas/pruebas_funcionales.py  # filtros, pestañas, formulario, menú
node    herramientas/auditar_movil.mjs       # desbordamiento y áreas táctiles
```

Solo necesitan Python 3 y Chrome. `auditar_movil.mjs` acepta `--ancho`, `--alto` y `--foto salida.png`:

```bash
node herramientas/auditar_movil.mjs index.html --ancho 1440 --alto 1150 --foto capturas/inicio-escritorio.png
node herramientas/auditar_movil.mjs index.html --alto 1500 --foto capturas/inicio-movil.png
```

## Decisiones de diseño en una línea

Mobile-first y ligero (< 350 KB la primera visita) porque la conexión en Cuba es lenta y cara; WhatsApp como canal comercial integrado; pagos por Transfermóvil y EnZona explicados en el sitio, no procesados; versión en inglés para el turismo de Trinidad; identidad cálida inspirada en la gráfica serigráfica cubana, sin tópicos turísticos.

## Contenido de relleno

El nombre «Bembé Producciones», los artistas, precios, fechas, testimonios y datos de contacto son **ficticios** y sirven para validar el diseño. La lista de sustituciones antes de publicar está en `DISENO.md` §14.

## Accesibilidad

Objetivo WCAG 2.2 AA: estructura semántica, foco visible, navegación por teclado, `aria-live` en filtros y avisos, áreas táctiles de 24 px como mínimo, contraste verificado y respeto a `prefers-reduced-motion`. Los cinco fallos reales encontrados durante la auditoría y su corrección están documentados en `DISENO.md` §16.
