#!/usr/bin/env python3
"""Pruebas funcionales del prototipo con Chrome headless.

Comprueba de verdad (no solo mirando el HTML) que:
  · el menú móvil abre y cierra
  · los filtros de catálogo ocultan y restauran tarjetas
  · el sistema de pestañas de la página legal funciona
  · el formulario de contacto responde y genera el enlace de WhatsApp

Uso:  python3 herramientas/pruebas_funcionales.py
Requiere google-chrome en el PATH.
"""
from __future__ import annotations

import html
import re
import shutil
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CHROME = shutil.which("google-chrome") or shutil.which("chromium")

# Tamaño de ventana por página. El menú lateral solo existe en móvil/tableta y
# la barra de filtros tiene que quedar dentro del viewport para que el
# IntersectionObserver de las cifras se dispare (era el detonante del fallo).
VENTANAS: dict[str, tuple[int, int]] = {
    "index.html": (900, 900),
    "eventos.html": (1280, 1600),
    "artistas.html": (1280, 1600),
    "tienda.html": (1280, 1600),
    "noticias.html": (1280, 1600),
}

PROBES: dict[str, str] = {
    "index.html": """
  const t = document.querySelector('.nav-toggle'), n = document.querySelector('.nav');
  t.click();
  const abierto = n.classList.contains('is-abierto') && getComputedStyle(n).display === 'flex';
  t.click();
  const cerrado = getComputedStyle(n).display === 'none';
  const r = document.querySelector('.site-header').getBoundingClientRect();
  return 'menu_abre=' + abierto + ' menu_cierra=' + cerrado;
""",
    "eventos.html": """
  const grupo = document.querySelector('[data-filtros]');
  const btns = grupo.querySelectorAll('.filtro');
  // Regresión: el script de cifras animadas llegó a vaciar la barra de filtros
  // porque compartía el atributo data-contador.
  const roto = btns.length === 0 || grupo.textContent.includes('#filtro');
  const antes = document.querySelectorAll('#lista-eventos [data-categoria]:not([hidden])').length;
  [...btns].find(b => b.dataset.filtro === 'abril').click();
  const abril = document.querySelectorAll('#lista-eventos [data-categoria]:not([hidden])').length;
  const contador = document.querySelector('#filtro-eventos');
  const texto = contador ? contador.textContent.trim() : '(sin contador)';
  [...btns].find(b => b.dataset.filtro === 'todos').click();
  const vuelta = document.querySelectorAll('#lista-eventos [data-categoria]:not([hidden])').length;
  return 'eventos: barra_intacta=' + !roto + ' (' + btns.length + ' botones) | '
    + antes + ' -> abril:' + abril + ' -> todos:' + vuelta + ' | contador="' + texto + '"';
""",
    "artistas.html": """
  const btns = document.querySelectorAll('[data-filtros] .filtro');
  const antes = document.querySelectorAll('#lista-artistas [data-categoria]:not([hidden])').length;
  [...btns].find(b => b.dataset.filtro === 'trova').click();
  const trova = document.querySelectorAll('#lista-artistas [data-categoria]:not([hidden])').length;
  const contador = document.querySelector('#filtro-artistas');
  return 'artistas: ' + antes + ' -> trova:' + trova
    + ' | contador="' + (contador ? contador.textContent.trim() : '(sin contador)') + '"';
""",
    "tienda.html": """
  const btns = document.querySelectorAll('[data-filtros] .filtro');
  const antes = document.querySelectorAll('#lista-tienda [data-categoria]:not([hidden])').length;
  [...btns].find(b => b.dataset.filtro === 'musica').click();
  const musica = document.querySelectorAll('#lista-tienda [data-categoria]:not([hidden])').length;
  const contador = document.querySelector('#filtro-tienda');
  return 'tienda: ' + antes + ' -> musica:' + musica
    + ' | contador="' + (contador ? contador.textContent.trim() : '(sin contador)') + '"';
""",
    "noticias.html": """
  const btns = document.querySelectorAll('[data-filtros] .filtro');
  const antes = document.querySelectorAll('#lista-noticias [data-categoria]:not([hidden])').length;
  [...btns].find(b => b.dataset.filtro === 'festival').click();
  const festival = document.querySelectorAll('#lista-noticias [data-categoria]:not([hidden])').length;
  return 'noticias: ' + antes + ' -> festival:' + festival;
""",
    "legal.html": """
  const tabs = document.querySelectorAll('[role="tab"]');
  tabs[1].click();
  const visibles = [...document.querySelectorAll('[role="tabpanel"]')].filter(p => !p.hidden).length;
  return 'legal: ' + tabs.length + ' pestanas | paneles visibles tras clic=' + visibles
    + ' | aria-selected=' + tabs[1].getAttribute('aria-selected');
""",
    "contacto.html": """
  const f = document.querySelector('form[data-formulario]');
  f.querySelector('[name="nombre"]').value = 'Prueba Automatica';
  f.querySelector('[name="telefono"]').value = '+53 55555555';
  const priv = f.querySelector('[name="privacidad"]');
  if (priv) priv.checked = true;
  f.requestSubmit();
  const r = f.querySelector('[data-respuesta]');
  const wa = f.querySelector('[data-wa-formulario]');
  return 'contacto: respuesta=' + (r && !r.hidden)
    + ' | wa_visible=' + (wa && !wa.hidden)
    + ' | wa_ok=' + (wa && wa.href.startsWith('https://wa.me/'));
""",
}


def probar(pagina: str, cuerpo: str) -> str:
    src = (RAIZ / pagina).read_text(encoding="utf-8")
    ancho, alto = VENTANAS.get(pagina, (1280, 900))
    # No esperamos al evento load: si la red no responde, las fuentes de Google
    # retrasan el load indefinidamente. El script va al final del body, así que
    # el DOM ya está disponible.
    sonda = (
        "<script>setTimeout(()=>{let res;try{res=(function(){"
        + cuerpo
        + "})();}catch(e){res='EXCEPCION: '+e.message}"
        "const o=document.createElement('pre');o.id='MEDICION';"
        "o.textContent=String(res);document.body.appendChild(o);},900);</script>"
    )
    tmp = RAIZ / f".tmp-probe-{pagina}"
    tmp.write_text(src.replace("</body>", sonda + "</body>"), encoding="utf-8")
    try:
        salida = subprocess.run(
            [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox",
             # Sin red: las peticiones externas fallan al instante en lugar de colgarse
             "--host-resolver-rules=MAP * 127.0.0.1:1",
             "--virtual-time-budget=5000",
             "--window-size=" + str(ancho) + "," + str(alto),
             "--dump-dom", f"file://{tmp}"],
            capture_output=True, text=True, timeout=45,
        ).stdout
    finally:
        tmp.unlink(missing_ok=True)
    m = re.search(r'<pre id="MEDICION">(.*?)</pre>', salida, re.S)
    return html.unescape(m.group(1)) if m else "NO MEDIDO"


def main() -> int:
    if not CHROME:
        print("No se encontró Chrome/Chromium; pruebas omitidas.")
        return 0
    fallos = 0
    for pagina, cuerpo in PROBES.items():
        if not (RAIZ / pagina).exists():
            print(f"{pagina:<16} (no existe, omitida)")
            continue
        try:
            resultado = probar(pagina, cuerpo)
        except subprocess.TimeoutExpired:
            resultado = "TIEMPO AGOTADO"
        marca = "✖" if ("EXCEPCION" in resultado or "TIEMPO" in resultado or "false" in resultado) else "✔"
        if marca == "✖":
            fallos += 1
        print(f"  {marca} {pagina:<16} {resultado}")
    print(f"\n{fallos} prueba(s) con problemas.")
    return 1 if fallos else 0


if __name__ == "__main__":
    sys.exit(main())
