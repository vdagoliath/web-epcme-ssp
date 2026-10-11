/* ==========================================================================
   BEMBÉ PRODUCCIONES — Interacción de interfaz
   Vanilla JS, sin dependencias. Objetivo: < 8 KB sin comprimir.
   --------------------------------------------------------------------------
   01. Utilidades
   02. Navegación móvil
   03. Cabecera pegada + enlace activo
   04. Revelado al hacer scroll
   05. Filtros de catálogo y cartelera
   06. Pestañas y acordeón
   07. Contadores y año
   08. Reservas por WhatsApp
   09. Formularios
   10. Botón "volver arriba" y marquesina
   11. Modo sin conexión (PWA)
   ========================================================================== */
(function () {
  "use strict";

  /* 01. UTILIDADES ======================================================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const WHATSAPP = "5353000000"; // número comercial (formato internacional sin +)

  function anunciar(mensaje, tipo) {
    let region = $("#aviso-global");
    if (!region) {
      region = document.createElement("div");
      region.id = "aviso-global";
      region.className = "aviso aviso--ok";
      region.setAttribute("role", "status");
      region.setAttribute("aria-live", "polite");
      region.style.cssText =
        "position:fixed;left:50%;bottom:1.25rem;transform:translateX(-50%);z-index:200;max-width:min(92vw,520px);box-shadow:var(--sombra-2)";
      document.body.appendChild(region);
    }
    region.className = "aviso aviso--" + (tipo || "ok");
    region.textContent = mensaje;
    region.hidden = false;
    clearTimeout(region._t);
    region._t = setTimeout(() => {
      region.hidden = true;
    }, 5200);
  }

  /* 02. NAVEGACIÓN MÓVIL ================================================== */
  const nav = $("#nav-principal");
  const toggle = $(".nav-toggle");

  if (nav && toggle) {
    const velo = document.createElement("div");
    velo.className = "nav-velo";
    document.body.appendChild(velo);

    const abrir = () => {
      nav.classList.add("is-abierto");
      velo.classList.add("is-visible");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      const primero = $(".nav__enlace", nav);
      if (primero) primero.focus({ preventScroll: true });
    };
    const cerrar = () => {
      nav.classList.remove("is-abierto");
      velo.classList.remove("is-visible");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    toggle.addEventListener("click", () =>
      toggle.getAttribute("aria-expanded") === "true" ? cerrar() : abrir()
    );
    velo.addEventListener("click", cerrar);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-abierto")) {
        cerrar();
        toggle.focus();
      }
    });
    $$(".nav__enlace", nav).forEach((a) => a.addEventListener("click", cerrar));
  }

  /* 03. CABECERA PEGADA + ENLACE ACTIVO =================================== */
  const cabecera = $(".site-header");
  if (cabecera) {
    const alScroll = () => cabecera.classList.toggle("is-pegada", window.scrollY > 12);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
  }

  const pagina = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".nav__enlace").forEach((a) => {
    const destino = (a.getAttribute("href") || "").split("#")[0].toLowerCase();
    if (destino && destino === pagina) a.setAttribute("aria-current", "page");
  });

  /* 04. REVELADO AL HACER SCROLL ========================================== */
  const revelables = $$(".revelar");
  if (revelables.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      revelables.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observador = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
              entrada.target.classList.add("is-visible");
              observador.unobserve(entrada.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revelables.forEach((el, i) => {
        el.style.setProperty("--retardo", Math.min(i % 4, 3) * 70 + "ms");
        observador.observe(el);
      });
    }
  }

  /* 05. FILTROS =========================================================== */
  $$("[data-filtros]").forEach((grupo) => {
    const objetivo = $(grupo.dataset.filtros);
    if (!objetivo) return;
    const elementos = $$("[data-categoria]", objetivo);
    const contador = $(grupo.dataset.contadorFiltro || "#filtro-resultado");

    grupo.addEventListener("click", (e) => {
      const boton = e.target.closest(".filtro");
      if (!boton) return;
      $$(".filtro", grupo).forEach((b) => {
        b.classList.remove("is-activo");
        b.setAttribute("aria-pressed", "false");
      });
      boton.classList.add("is-activo");
      boton.setAttribute("aria-pressed", "true");

      const filtro = boton.dataset.filtro;
      let visibles = 0;
      elementos.forEach((el) => {
        const cats = (el.dataset.categoria || "").split(" ");
        const mostrar = filtro === "todos" || cats.includes(filtro);
        el.hidden = !mostrar;
        if (mostrar) visibles++;
      });
      if (contador) {
        contador.textContent =
          visibles + (visibles === 1 ? " resultado" : " resultados");
      }
    });
  });

  /* 06. PESTAÑAS Y ACORDEÓN =============================================== */
  $$("[data-pestanas]").forEach((grupo) => {
    const pestanas = $$('[role="tab"]', grupo);
    pestanas.forEach((pestana, i) => {
      pestana.addEventListener("click", () => activar(pestana));
      pestana.addEventListener("keydown", (e) => {
        const paso = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!paso) return;
        e.preventDefault();
        const siguiente = pestanas[(i + paso + pestanas.length) % pestanas.length];
        siguiente.focus();
        activar(siguiente);
      });
    });
    function activar(pestana) {
      pestanas.forEach((p) => {
        p.setAttribute("aria-selected", String(p === pestana));
        p.tabIndex = p === pestana ? 0 : -1;
        const panel = document.getElementById(p.getAttribute("aria-controls"));
        if (panel) panel.hidden = p !== pestana;
      });
    }
  });

  $$(".acordeon").forEach((acordeon) => {
    const items = $$("details", acordeon);
    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.open) items.forEach((otro) => otro !== item && (otro.open = false));
      });
    });
  });

  /* 07. CONTADORES Y AÑO ================================================== */
  const anio = $("#anio-actual");
  if (anio) anio.textContent = new Date().getFullYear();

  /* Solo se animan las cifras de estadística. Importante: los filtros usan
     data-contador para apuntar a su contador de resultados; si se seleccionan
     todos los [data-contador], este bloque borraría los botones de filtro y
     escribiría el selector como texto. */
  const cifras = $$(".stat__cifra[data-contador]");
  if (cifras.length) {
    const animar = (el) => {
      const fin = parseFloat(el.dataset.contador);
      if (isNaN(fin)) return; // ante la duda, no se sobrescribe contenido ajeno
      const sufijo = el.dataset.sufijo || "";
      if (prefersReduced) {
        el.textContent = el.dataset.contador + sufijo;
        return;
      }
      const inicio = performance.now();
      const dur = 1100;
      // Arranca al 70 % del valor final: contar desde cero hacía que se leyera
      // "0 años de faena" durante el primer medio segundo.
      const desde = fin * 0.7;
      const paso = (ahora) => {
        const t = Math.min((ahora - inicio) / dur, 1);
        const suavizado = 1 - Math.pow(1 - t, 3);
        const valor = desde + (fin - desde) * suavizado;
        el.textContent = Math.round(valor).toLocaleString("es-CU") + sufijo;
        if (t < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    };
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entradas) =>
          entradas.forEach((e) => {
            if (e.isIntersecting) {
              animar(e.target);
              obs.unobserve(e.target);
            }
          }),
        { threshold: 0.5 }
      );
      cifras.forEach((c) => obs.observe(c));
    } else {
      cifras.forEach(animar);
    }
  }

  /* 08. RESERVAS POR WHATSAPP ============================================= */
  $$("[data-reservar]").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      const que = boton.dataset.reservar;
      const texto = encodeURIComponent(
        `Hola Bembé Producciones. Quiero reservar: ${que}. ¿Me confirman disponibilidad y precio?`
      );
      window.open(`https://wa.me/${WHATSAPP}?text=${texto}`, "_blank", "noopener");
      anunciar("Abriendo WhatsApp para confirmar tu reserva…", "ok");
    });
  });

  /* 09. FORMULARIOS ======================================================= */
  $$("form[data-formulario]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const datos = new FormData(form);
      const resumen = $$("input, select, textarea", form)
        .filter((c) => c.name && c.value && c.type !== "checkbox")
        .map((c) => `${c.name}: ${c.value}`)
        .join("\n");

      const ok = $("[data-respuesta]", form) || $("#respuesta-formulario");
      if (ok) {
        ok.hidden = false;
        ok.textContent =
          "¡Gracias! Recibimos tu solicitud. Te contactamos en menos de 24 horas laborables. " +
          "Si es urgente, escríbenos por WhatsApp.";
      }
      const wa = $("[data-wa-formulario]", form);
      if (wa) {
        wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
          "Solicitud desde la web:\n" + resumen
        )}`;
        wa.hidden = false;
      }
      anunciar("Solicitud enviada correctamente.", "ok");
      form.reset();
    });
  });

  /* 10. VOLVER ARRIBA + MARQUESINA ======================================== */
  const arriba = $(".fab--arriba");
  if (arriba) {
    const revisar = () => arriba.classList.toggle("is-visible", window.scrollY > 700);
    revisar();
    window.addEventListener("scroll", revisar, { passive: true });
    arriba.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
    );
  }

  $$(".marquesina__pista").forEach((pista) => {
    pista.innerHTML += pista.innerHTML; // duplicado para bucle continuo
  });

  /* 11. MODO SIN CONEXIÓN ================================================= */
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {
        /* sin caché: la web sigue funcionando en línea */
      });
    });
  }

  window.addEventListener("offline", () =>
    anunciar("Sin conexión. Sigues viendo el contenido guardado en tu teléfono.", "alerta")
  );
  window.addEventListener("online", () =>
    anunciar("Conexión restablecida.", "ok")
  );
})();
