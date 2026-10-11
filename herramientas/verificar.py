#!/usr/bin/env python3
"""Verificador de calidad del sitio de Bembé Producciones.

Comprueba, sobre todos los .html del proyecto:
  · enlaces y recursos locales rotos (href/src)
  · imágenes sin texto alternativo
  · presencia de lang, un único h1, <main> y enlace de salto
  · etiquetas HTML sin cerrar y anidamiento básico
  · peso de los archivos

Uso:  python3 herramientas/verificar.py
"""
from __future__ import annotations

import os
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
VACIAS = {"area", "base", "br", "col", "embed", "hr", "img", "input",
          "link", "meta", "param", "source", "track", "wbr"}


class Auditor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.pila: list[tuple[str, int]] = []
        self.errores: list[str] = []
        self.enlaces: list[tuple[str, str]] = []
        self.imagenes: list[tuple[bool, str]] = []
        self.h1 = 0
        self.lang = None
        self.tiene_main = False
        self.tiene_salto = False
        self.pila_actual = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html" and a.get("lang"):
            self.lang = a["lang"]
        if tag == "main":
            self.tiene_main = True
        if tag == "a" and "skip-link" in (a.get("class") or ""):
            self.tiene_salto = True
        if tag == "h1":
            self.h1 += 1
        if tag in ("a", "link", "script", "img", "source"):
            for clave in ("href", "src"):
                if a.get(clave):
                    self.enlaces.append((tag, a[clave]))
        if tag == "img":
            self.imagenes.append((a.get("alt") is not None, a.get("src", "")))
        if tag not in VACIAS:
            self.pila.append((tag, self.getpos()[0]))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VACIAS and self.pila and self.pila[-1][0] == tag:
            self.pila.pop()

    def handle_endtag(self, tag):
        if tag in VACIAS:
            return
        if not self.pila:
            self.errores.append(f"línea {self.getpos()[0]}: </{tag}> sin apertura")
            return
        if self.pila[-1][0] == tag:
            self.pila.pop()
            return
        # cierre implícito (p, li, td…)
        for i in range(len(self.pila) - 1, -1, -1):
            if self.pila[i][0] == tag:
                sobrantes = [t for t, _ in self.pila[i + 1:]]
                if sobrantes:
                    self.errores.append(
                        f"línea {self.getpos()[0]}: </{tag}> cierra con {sobrantes} abiertos"
                    )
                del self.pila[i:]
                return
        self.errores.append(f"línea {self.getpos()[0]}: </{tag}> inesperado")


def revisar(ruta: Path) -> tuple[list[str], list[str]]:
    errores: list[str] = []
    avisos: list[str] = []
    crudo = ruta.read_text(encoding="utf-8")
    parser = Auditor()
    parser.feed(crudo)

    if parser.pila:
        errores.append("etiquetas sin cerrar: " + ", ".join(t for t, _ in parser.pila))
    errores.extend(parser.errores[:6])

    if parser.lang is None:
        errores.append("falta el atributo lang en <html>")
    if parser.h1 != 1:
        errores.append(f"se esperaba 1 <h1>, hay {parser.h1}")
    if not parser.tiene_main:
        errores.append("falta el elemento <main>")
    if not parser.tiene_salto:
        avisos.append("no se encontró el enlace «saltar al contenido»")

    for tag, valor in parser.enlaces:
        if valor.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:")):
            continue
        destino = (ruta.parent / valor.split("#")[0].split("?")[0]).resolve()
        if not destino.exists():
            errores.append(f"{tag} roto: {valor}")

    for tiene_alt, src in parser.imagenes:
        if not tiene_alt:
            avisos.append(f"imagen sin alt: {src}")

    # data-contador está reservado a las cifras de estadística animadas. En una
    # versión anterior los filtros lo usaban para apuntar a su contador y el
    # script de cifras terminaba borrando los botones de la barra de filtros.
    for valor in re.findall(r'data-contador="([^"]*)"', crudo):
        if not re.fullmatch(r"\d+(?:[.,]\d+)?", valor.strip()):
            errores.append(
                f'data-contador="{valor}" no es numérico: ese atributo es solo '
                f"para las cifras de estadística (un atributo distinto para los filtros)"
            )

    peso = len(crudo.encode("utf-8")) / 1024
    if peso > 80:
        avisos.append(f"HTML pesado: {peso:.0f} KB")

    return errores, avisos


def main() -> int:
    paginas = sorted(RAIZ.rglob("*.html"))
    if not paginas:
        print("No se encontraron páginas HTML.")
        return 1

    total_err = total_avi = 0
    print(f"Verificando {len(paginas)} páginas en {RAIZ.name}/\n")
    for pagina in paginas:
        errores, avisos = revisar(pagina)
        rel = pagina.relative_to(RAIZ)
        if not errores and not avisos:
            print(f"  ✔ {rel}")
            continue
        print(f"  {'✖' if errores else '△'} {rel}")
        for e in errores:
            print(f"      error:  {e}")
        for a in avisos:
            print(f"      aviso:  {a}")
        total_err += len(errores)
        total_avi += len(avisos)

    print(f"\n{total_err} errores, {total_avi} avisos.")
    return 1 if total_err else 0


if __name__ == "__main__":
    sys.exit(main())
