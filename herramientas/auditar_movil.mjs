#!/usr/bin/env node
/**
 * Auditoría de móvil real para el sitio de Bembé Producciones.
 *
 * Levanta Chrome con el protocolo de depuración y aplica una emulación de
 * dispositivo (390×844, táctil) para medir lo que de verdad ve un teléfono:
 *   · desbordamiento horizontal de la página
 *   · elementos que sobresalen del viewport
 *   · tamaño de los objetivos táctiles
 *   · captura de pantalla opcional
 *
 * Uso:
 *   node herramientas/auditar_movil.mjs                 (audita todas las páginas)
 *   node herramientas/auditar_movil.mjs index.html      (una sola)
 *   node herramientas/auditar_movil.mjs index.html --foto salida.png
 *
 * Requiere google-chrome en el PATH. Sin dependencias externas.
 */
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUERTO = 9333;
const PERFIL = resolve(RAIZ, ".tmp-chrome-perfil");
let ANCHO = 390;
const ALTO = 844;

const PAGINAS = [
  "index.html", "servicios.html", "artistas.html", "eventos.html",
  "tienda.html", "nosotros.html", "noticias.html", "contacto.html",
  "legal.html", "en/index.html",
];

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

async function esperarDepurador(intentos = 60) {
  for (let i = 0; i < intentos; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PUERTO}/json/version`);
      if (r.ok) return await r.json();
    } catch { /* aún no escucha */ }
    await dormir(250);
  }
  throw new Error("Chrome no abrió el puerto de depuración");
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pendientes = new Map();
    this.metodos = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pendientes.has(msg.id)) {
        const { resolver, rechazar } = this.pendientes.get(msg.id);
        this.pendientes.delete(msg.id);
        msg.error
          ? rechazar(new Error(`${this.metodos.get(msg.id)}: ${msg.error.message}`))
          : resolver(msg.result);
      }
    });
  }
  enviar(metodo, params = {}) {
    const id = ++this.id;
    return new Promise((resolver, rechazar) => {
      this.pendientes.set(id, { resolver, rechazar });
      this.metodos.set(id, metodo);
      this.ws.send(JSON.stringify({ id, method: metodo, params }));
    });
  }
}

const SONDA = `(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const culpables = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.right > vw + 1 || r.left < -1) {
      const clase = (typeof el.className === 'string' && el.className.trim())
        ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '';
      culpables.push(el.tagName.toLowerCase() + clase +
        ' [' + Math.round(r.left) + '→' + Math.round(r.right) + ']');
    }
  }
  const pequenos = [];
  for (const el of document.querySelectorAll('a, button, input, select, textarea')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.height < 32) {
      pequenos.push((el.textContent || el.tagName).trim().slice(0, 34) +
        ' (' + Math.round(r.width) + '×' + Math.round(r.height) + ')');
    }
  }
  // Regresión: el bloque de cifras animadas llegó a vaciar las barras de
  // filtros porque ambos usaban el atributo data-contador.
  const barrasRotas = [];
  for (const f of document.querySelectorAll('.filtros')) {
    const botones = f.querySelectorAll('.filtro').length;
    if (botones === 0 || /#[a-z-]+/i.test(f.textContent)) {
      barrasRotas.push('botones=' + botones + ' texto="' + f.textContent.trim().slice(0, 30) + '"');
    }
  }
  return JSON.stringify({
    vw,
    scrollW: de.scrollWidth,
    desborda: de.scrollWidth > vw,
    culpables: [...new Set(culpables)].slice(0, 10),
    tactilesPequenos: [...new Set(pequenos)].slice(0, 8),
    barrasRotas,
    titulo: document.title,
  });
})()`;

async function auditar(cdp, pagina, foto, altoFoto = null) {
  // Con --alto se emula un viewport alto: así todo el contenido queda "a la
  // vista", el IntersectionObserver revela las tarjetas y la captura sale
  // completa sin recurrir a captureBeyondViewport (que deja en blanco lo que
  // queda por debajo del viewport).
  const alto = altoFoto || ALTO;
  await cdp.enviar("Emulation.setDeviceMetricsOverride", {
    width: ANCHO, height: alto, deviceScaleFactor: 2, mobile: ANCHO <= 800,
  });
  await cdp.enviar("Page.enable");
  const carga = new Promise((r) => {
    const oyente = (ev) => {
      if (JSON.parse(ev.data).method === "Page.loadEventFired") {
        cdp.ws.removeEventListener("message", oyente);
        r();
      }
    };
    cdp.ws.addEventListener("message", oyente);
    setTimeout(r, 6000);
  });
  await cdp.enviar("Page.navigate", { url: `file://${resolve(RAIZ, pagina)}` });
  await carga;
  await dormir(900);

  const { result } = await cdp.enviar("Runtime.evaluate", {
    expression: SONDA, returnByValue: true,
  });
  const datos = JSON.parse(result.value);

  // Comprobación básica de que la barra de filtros conserva sus botones.
  // La garantía fuerte contra la colisión del atributo data-contador está en
  // herramientas/verificar.py, que es determinista y no depende del navegador.
  const { result: barras } = await cdp.enviar("Runtime.evaluate", {
    expression: `JSON.stringify([...document.querySelectorAll('.filtros')]
      .filter(f => f.querySelectorAll('.filtro').length === 0 || /#[a-z-]+/i.test(f.textContent))
      .map(f => 'botones=' + f.querySelectorAll('.filtro').length
              + ' texto="' + f.textContent.trim().slice(0, 30) + '"'))`,
    returnByValue: true,
  });
  datos.barrasRotas = JSON.parse(barras.value);

  if (foto) {
    const shot = await cdp.enviar("Page.captureScreenshot", { format: "png" });
    mkdirSync(dirname(resolve(foto)), { recursive: true });
    writeFileSync(resolve(foto), Buffer.from(shot.data, "base64"));
  }
  return datos;
}

async function main() {
  const args = process.argv.slice(2);
  const paginas = args.filter((a) => a.endsWith(".html"));
  const iFoto = args.indexOf("--foto");
  const foto = iFoto >= 0 ? args[iFoto + 1] : null;
  const iAlto = args.indexOf("--alto");
  const altoFoto = iAlto >= 0 ? Number(args[iAlto + 1]) : null;
  const iAncho = args.indexOf("--ancho");
  if (iAncho >= 0) ANCHO = Number(args[iAncho + 1]);
  const lista = paginas.length ? paginas : PAGINAS;

  rmSync(PERFIL, { recursive: true, force: true });
  const chrome = spawn("google-chrome", [
    "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
    `--remote-debugging-port=${PUERTO}`, `--user-data-dir=${PERFIL}`,
    "about:blank",
  ], { stdio: "ignore" });

  let codigo = 0;
  try {
    await esperarDepurador();
    // Chrome ya abre una pestaña en blanco; nos conectamos directamente a ella.
    const objetivos = await (await fetch(`http://127.0.0.1:${PUERTO}/json/list`)).json();
    const pagina = objetivos.find((o) => o.type === "page" && o.webSocketDebuggerUrl);
    if (!pagina) throw new Error("No hay ninguna pestaña de Chrome disponible");
    const ws2 = new WebSocket(pagina.webSocketDebuggerUrl);
    await new Promise((r, j) => {
      ws2.addEventListener("open", r);
      ws2.addEventListener("error", j);
    });
    const cdp2 = new CDP(ws2);

    console.log(`Emulación ${ANCHO <= 800 ? "móvil" : "escritorio"} ${ANCHO}×${altoFoto || ALTO} (devicePixelRatio 2)\n`);
    for (const p of lista) {
      try {
        const d = await auditar(cdp2, p, foto && lista.length === 1 ? foto : null, altoFoto);
        const marca = d.desborda || d.barrasRotas.length ? "✖" : "✔";
        if (d.desborda || d.barrasRotas.length) codigo = 1;
        console.log(`  ${marca} ${p.padEnd(16)} viewport=${d.vw} scroll=${d.scrollW}`);
        d.barrasRotas.forEach((b) => console.log(`        BARRA DE FILTROS ROTA: ${b}`));
        d.culpables.forEach((c) => console.log(`        desborda: ${c}`));
        if (d.tactilesPequenos.length) {
          console.log(`        táctiles <32px: ${d.tactilesPequenos.join(" · ")}`);
        }
      } catch (e) {
        console.log(`  ✖ ${p}: ${e.message}`);
        codigo = 1;
      }
    }
    ws2.close();
  } finally {
    chrome.kill("SIGKILL");
    await dormir(400);
    rmSync(PERFIL, { recursive: true, force: true });
  }
  process.exit(codigo);
}

main().catch((e) => {
  console.error("Error:", e.message); console.error(e.stack);
  process.exit(2);
});
