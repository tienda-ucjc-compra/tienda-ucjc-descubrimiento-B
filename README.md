# Tienda UCJC - Descubrimiento

Repositorio del micro-frontend de **Descubrimiento** para el proyecto conjunto *Tienda UCJC*.

---

## 1. Información del Equipo

- **Pieza:** Descubrimiento (Catálogo, búsqueda y ficha de producto).
- **Custom Element:** `<ucjc-descubrimiento>`
- **Responsable:** Daniel Molina Vitón
- **Integrantes:**
  - Daniel Molina Vitón (Responsable)
  - Mario González Baranda
  - Juan Cruz Romero
  - Jaime Moraleda Loran
  - Jaime Nicolás Mas

---

## 2. Descripción

Microfrontend de Descubrimiento de la Tienda UCJC.

Permite consultar un catálogo de ocho productos con datos fijos,
buscar por nombre, filtrar por categoría, precio y talla,
ordenar los resultados y consultar la ficha de cada producto.

Al pulsar Añadir, emite un evento para que el microfrontend
de Compra gestione la incorporación al carrito.

## 3. Tecnologías

- HTML, CSS y JavaScript.
- Web Components: Custom Elements y Shadow DOM.
- Vite.
- GitHub Actions y GitHub Pages para la publicación.

## 4. Ejecución local

Desde la carpeta del proyecto:

```bash
npm ci
npm run dev
```

Abrir la dirección que indique Vite en la terminal.

## 5. Compilación y comprobación

```bash
npm run build
npm run preview
```

La compilación genera la carpeta `dist`.
El módulo de integración es `dist/remote.js`: un módulo ES que registra
`ucjc-descubrimiento` y exporta por defecto `{ nombre, version }`, como pide el
contrato de carga del shell. La versión la pone el workflow de despliegue
(`VITE_APP_VERSION`); en local es `dev`.

La página de demostración de `public/index.html` se copia a `dist`
durante la compilación y permite comprobar el catálogo publicado.

## 6. Integración

Cargar el módulo e incluir el Custom Element apuntando a la última versión o a una versión fijada:

```html
<ucjc-descubrimiento></ucjc-descubrimiento>
<script type="module" src="https://tienda-ucjc-compra.github.io/tienda-ucjc-descubrimiento-B/remote.js"></script>
```

Para fijar una versión concreta en el proyecto contenedor (recomendado para evitar cambios inesperados):

```html
<ucjc-descubrimiento></ucjc-descubrimiento>
<script type="module" src="https://tienda-ucjc-compra.github.io/tienda-ucjc-descubrimiento-B/v0.1.2/remote.js"></script>
```

## 7. Evento emitido

Nombre completo:

`ucjc:descubrimiento:anadir-al-carrito@1`

Se emite en `window` cuando se pulsa Añadir.

Ejemplo de `detail`:

```json
{
  "productoId": "prod-101",
  "nombre": "Camiseta Técnica UCJC",
  "precio": 19.99,
  "cantidad": 1
}
```

Los campos del evento son `productoId`, `nombre`, `precio`
y `cantidad`.

El `precio` viaja siempre en euros, como fija el contrato, aunque en pantalla se
esté viendo en dólares. Durante Black Friday es el precio ya rebajado.

El componente emite la solicitud; la gestión del carrito
corresponde al microfrontend de Compra.

### Campaña Black Friday

Nombre completo:

`ucjc:descubrimiento:campana-cambiada@1`

Se emite en `window` cuando se enciende o apaga el botón "Black Friday UCJC"
y también al cargar la pieza, con el estado actual.

```json
{
  "activa": true,
  "codigo": "black-friday-2026",
  "etiqueta": "Black Friday UCJC",
  "momento": "2026-11-27T09:00:00.000Z"
}
```

Los consumidores son Compra y Datos.

### Evento escuchado

`ucjc:identidad:sesion-cambiada@1` (emisor: Identidad). Solo se usa para mostrar
si hay sesión iniciada; no se usan roles.

### Filtros desde la URL

La pieza no modifica la URL de la página. Solo la lee al cargar, para abrir el
catálogo ya filtrado: `?desc_q=`, `desc_cat=`, `desc_pmax=`, `desc_tallas=`,
`desc_orden=`, `desc_moneda=`, `desc_bf=1` y `desc_ofertas=1`.

## 8. Estructura

- `src/main.js`: componente, interfaz y eventos.
- `src/productos.js`: productos, categorías, tallas y descuentos de Black Friday.
- `src/iconos.js`: iconos de categoría que sirven de imagen del producto.
- `src/estilos.js`: estilos del componente.
- `index.html`: página de desarrollo.
- `public/index.html`: página de demostración para publicar.
- `vite.config.js`: configuración de compilación de `remote.js`.
- `.github/workflows/deploy.yml`: despliegue y versionado automático en GitHub Pages.
- `TIEMPO.md`: registro de dedicación del equipo.

## 9. Publicación y Versionado

El despliegue se realiza automáticamente mediante GitHub Actions sobre la rama `gh-pages`, manteniendo el historial de versiones publicadas (`keep_files: true`):

- **Web (demo):** https://tienda-ucjc-compra.github.io/tienda-ucjc-descubrimiento-B/
- **Módulo versionado (por tag):** `https://tienda-ucjc-compra.github.io/tienda-ucjc-descubrimiento-B/v<VERSION>/remote.js`

### Flujo de versiones

1. **Incremento automático (Patch):** Cada `push` a `main` detecta la última etiqueta publicada, incrementa automáticamente el número de versión (`v0.1.2` → `v0.1.3` → `v0.1.4`...), crea el tag en el repositorio y despliega tanto la subcarpeta de la nueva versión como la raíz (`latest`) sin sobrescribir entregas anteriores.
2. **Salto de versión manual (Minor / Major):** Para iniciar una nueva serie (por ejemplo `v0.3.0`), basta con crear y subir el tag desde local (`git tag v0.3.0 && git push origin v0.3.0`), y los siguientes commits continuarán incrementando a partir de esa numeración.