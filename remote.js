(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`ropa`,nombre:`Ropa`},{id:`deporte`,nombre:`Deporte`},{id:`material`,nombre:`Material`},{id:`regalos`,nombre:`Regalos`}],t=[`XS`,`S`,`M`,`L`,`XL`],n=[{id:`prod-101`,nombre:`Camiseta Técnica UCJC`,categoria:`deporte`,precioEUR:19.99,precioUSD:21.99,tallas:[`S`,`M`,`L`,`XL`],descripcion:`Camiseta transpirable de secado rápido para entrenar, con el escudo de la universidad.`},{id:`prod-102`,nombre:`Sudadera con capucha`,categoria:`ropa`,precioEUR:39.95,precioUSD:43.95,tallas:[`XS`,`S`,`M`,`L`,`XL`],descripcion:`Sudadera de algodón con capucha y bolsillo canguro, interior suave.`},{id:`prod-103`,nombre:`Chaqueta cortavientos`,categoria:`ropa`,precioEUR:45,precioUSD:49.5,tallas:[`M`,`L`,`XL`],descripcion:`Chaqueta ligera y resistente al viento, con cremallera completa y capucha plegable.`},{id:`prod-104`,nombre:`Equipación oficial fútbol`,categoria:`deporte`,precioEUR:55,precioUSD:60.5,tallas:[`S`,`M`,`L`],descripcion:`Camiseta y pantalón oficiales de los equipos de fútbol de la universidad.`},{id:`prod-105`,nombre:`Mochila UCJC`,categoria:`material`,precioEUR:29.9,precioUSD:32.89,tallas:[],descripcion:`Mochila con compartimento acolchado para portátil y bolsillos laterales.`},{id:`prod-106`,nombre:`Cuaderno A4`,categoria:`material`,precioEUR:4.5,precioUSD:4.95,tallas:[],descripcion:`Cuaderno de tapa dura con 120 hojas cuadriculadas.`},{id:`prod-107`,nombre:`Taza de graduación`,categoria:`regalos`,precioEUR:9.95,precioUSD:10.95,tallas:[],descripcion:`Taza de cerámica con diseño conmemorativo, apta para lavavajillas.`},{id:`prod-108`,nombre:`Llavero metálico`,categoria:`regalos`,precioEUR:5,precioUSD:5.5,tallas:[],descripcion:`Llavero de metal grabado con el escudo de la universidad.`}],r=`
  :host {
    --azul: #1e3a8a;
    --azul-claro: #3b82f6;
    --gris: #f3f4f6;
    --borde: #e5e7eb;
    --texto: #111827;
    display: block;
    font-family: system-ui, sans-serif;
    color: var(--texto);
  }

  * { box-sizing: border-box; }

  /* ---------- Barra superior: usuario | buscador | carrito ---------- */
  .barra-superior {
    display: grid;
    grid-template-columns: 160px 1fr 160px;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--azul);
  }
  .lateral { display: flex; align-items: center; min-height: 2.5rem; }
  .lateral-izq { justify-content: flex-start; }
  .lateral-der { justify-content: flex-end; }
  .hueco {
    padding: .5rem .9rem;
    border: 1px dashed rgba(255, 255, 255, .6);
    border-radius: 6px;
    color: white;
    font-size: .9rem;
  }
  .barra-busqueda {
    display: flex;
    gap: .5rem;
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
  }
  .barra-busqueda input {
    flex: 1;
    padding: .6rem .8rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
  }
  .barra-busqueda button {
    padding: .6rem 1rem;
    border: none;
    border-radius: 6px;
    background: var(--azul-claro);
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .subbarra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: .5rem 1rem;
    padding: .6rem 1rem;
    background: #eff6ff;
    border-bottom: 1px solid var(--borde);
  }
  .estado-sesion { font-size: .9rem; color: #374151; }
  .selector-moneda { display:flex; align-items:center; gap:.5rem; }
  .selector-moneda button { padding:.5rem .85rem; border:1px solid var(--azul); border-radius:6px; background:white; color:var(--azul); cursor:pointer; font-weight:600; }
  .selector-moneda button[aria-pressed="true"] { background:var(--azul); color:white; }

  /* ---------- Navegación por categorías ---------- */
  .navegacion {
    display: flex;
    gap: .25rem;
    overflow-x: auto;
    padding: 0 1rem;
    background: white;
    border-bottom: 1px solid var(--borde);
  }
  .navegacion button {
    padding: .8rem 1rem;
    border: none;
    border-bottom: 3px solid transparent;
    background: none;
    font-size: .95rem;
    cursor: pointer;
    white-space: nowrap;
  }
  .navegacion button[aria-current="true"] {
    border-bottom-color: var(--azul-claro);
    color: var(--azul);
    font-weight: 600;
  }

  /* ---------- Cuerpo: filtros + productos ---------- */
  .cuerpo {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 1.5rem;
    padding: 1rem;
  }

  .filtros {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .filtros h3 {
    margin: 0 0 .5rem;
    font-size: .9rem;
    text-transform: uppercase;
    color: #6b7280;
  }
  .filtros label { display: block; margin: .25rem 0; cursor: pointer; }
  .filtros select, .filtros input[type="range"] { width: 100%; }
  .tallas { display: flex; flex-wrap: wrap; gap: .35rem; }
  .tallas button {
    min-width: 2.5rem;
    padding: .35rem;
    border: 1px solid var(--borde);
    border-radius: 4px;
    background: white;
    cursor: pointer;
  }
  .tallas button[aria-pressed="true"] {
    background: var(--azul);
    border-color: var(--azul);
    color: white;
  }
  .limpiar {
    padding: .5rem;
    border: 1px solid var(--borde);
    border-radius: 6px;
    background: white;
    cursor: pointer;
  }

  .cabecera-resultados {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .cabecera-resultados p { margin: 0; color: #6b7280; }

  .rejilla {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
  .tarjeta {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--borde);
    border-radius: 8px;
    overflow: hidden;
    background: white;
  }
  .imagen {
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    background: var(--gris);
    color: #94a3b8;
    overflow: hidden;
  }
  .imagen svg { width: 42%; height: auto; }
  .imagen img { width: 100%; height: 100%; object-fit: cover; }
  .modal-imagen { aspect-ratio: auto; height: 150px; border-radius: 8px; }
  .modal-imagen svg { width: auto; height: 60%; }
  .tarjeta .info { padding: .75rem; display: flex; flex-direction: column; gap: .4rem; flex: 1; }
  .tarjeta h4 { margin: 0; font-size: 1rem; }
  .tarjeta .precio { font-weight: 700; color: var(--azul); }
  .tarjeta .acciones { display: flex; gap: .4rem; margin-top: auto; }
  .tarjeta .acciones button {
    flex: 1;
    padding: .5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: .85rem;
  }
  .btn-ver { border: 1px solid var(--azul); background: white; color: var(--azul); }
  .btn-anadir { border: none; background: var(--azul); color: white; }

  /* ---------- Talla en la tarjeta ---------- */
  .selector-talla { display: flex; flex-wrap: wrap; gap: .3rem; }
  .selector-talla button {
    min-width: 2.2rem;
    padding: .3rem .4rem;
    border: 1px solid var(--borde);
    border-radius: 4px;
    background: white;
    font-size: .8rem;
    cursor: pointer;
  }
  .selector-talla button[aria-pressed="true"] {
    background: var(--azul);
    border-color: var(--azul);
    color: white;
  }
  .error-talla {
    margin: 0;
    font-size: .85rem;
    font-weight: 600;
    color: #b91c1c;
  }
  .error-talla[hidden] { display: none; }
  .tarjeta.falta-talla { border-color: #b91c1c; }
  .tarjeta.falta-talla .selector-talla button { border-color: #b91c1c; }

  /* ---------- Filtros activos ---------- */
  .chips { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: .75rem; }
  .chips[hidden], .nota-talla[hidden] { display: none; }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: .35rem;
    padding: .3rem .65rem;
    border: 1px solid var(--azul-claro);
    border-radius: 999px;
    background: #eff6ff;
    color: var(--azul);
    font-size: .85rem;
    cursor: pointer;
  }
  .chip:hover { background: #dbeafe; }
  .nota-talla { margin: 0 0 .75rem; font-size: .85rem; color: #6b7280; }
  .btn-limpiar-vacio {
    margin-top: .5rem;
    padding: .5rem 1rem;
    border: 1px solid var(--azul);
    border-radius: 6px;
    background: white;
    color: var(--azul);
    font-weight: 600;
    cursor: pointer;
  }
  .vacio { grid-column: 1 / -1; }
  .vacio p { margin: 0; }

  .vacio { padding: 2rem; text-align: center; color: #6b7280; }

  button:focus-visible, input:focus-visible, select:focus-visible {
    outline: 2px solid var(--azul-claro);
    outline-offset: 2px;
  }

  /* ---------- Móvil: los filtros pasan arriba ---------- */
  .btn-filtros { display: none; }

  @media (max-width: 700px) {
    .cuerpo { grid-template-columns: 1fr; gap: 1rem; }
    .btn-filtros {
      display: block;
      padding: .6rem;
      border: 1px solid var(--azul);
      border-radius: 6px;
      background: white;
      color: var(--azul);
      font-weight: 600;
      cursor: pointer;
    }
    .btn-filtros[aria-expanded="true"] { background: var(--azul); color: white; }
    .filtros { display: none; }
    .filtros.abierto { display: flex; }
    .barra-superior { grid-template-columns: 1fr 1fr; }
    .barra-busqueda { grid-column: 1 / -1; grid-row: 2; }
  }

  /* ---------- Ventana Modal (Detalle de Producto) ---------- */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5); /* Fondo sombreado en segundo plano */
    display: grid;
    place-items: center;
    z-index: 1000;
  }

  .modal-contenido {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .modal-contenido h3 {
    margin: 0;
    color: var(--azul);
    font-size: 1.5rem;
  }

  .modal-contenido .precio {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--azul);
  }

  .modal-contenido { max-height: 90vh; overflow-y: auto; outline: none; }
  .modal-contenido p { margin: 0; }
  .modal-contenido .descripcion { color: #4b5563; line-height: 1.5; }
  .acciones-modal { display: flex; gap: .5rem; margin-top: .5rem; }
  .acciones-modal button {
    flex: 1;
    padding: .65rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-anadir-modal { border: none; background: var(--azul); color: white; }
  .acciones-modal .btn-cerrar-modal {
    margin-top: 0;
    border: 1px solid var(--azul);
    background: white;
    color: var(--azul);
  }

  .btn-cerrar-modal {
    margin-top: 1rem;
    padding: 0.6rem;
    background: var(--azul);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  }

`,i=`viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"`,a={ropa:`<svg ${i}><path d="M22 10 8 20l6 9 6-4v29h24V25l6 4 6-9-14-10c-2 5-18 5-20 0Z"/></svg>`,deporte:`<svg ${i}><circle cx="32" cy="32" r="22"/><path d="M32 22l9 6.5-3.5 10.5h-11L23 28.5ZM32 22V10M41 28.5l11-3.5M37.5 39l6.5 9M26.5 39 20 48M23 28.5 12 25"/></svg>`,material:`<svg ${i}><rect x="16" y="10" width="32" height="44" rx="3"/><path d="M24 10v44M30 22h12M30 30h12M30 38h12"/></svg>`,regalos:`<svg ${i}><rect x="12" y="26" width="40" height="26" rx="2"/><rect x="10" y="18" width="44" height="8" rx="2"/><path d="M32 18v34M32 18c-6-10-14-8-10 0M32 18c6-10 14-8 10 0"/></svg>`};function o(e,t){return e.imagen?`<img src="${t(e.imagen)}" alt="${t(e.nombre)}" loading="lazy" />`:a[e.categoria]||a.material}var s=`ucjc:descubrimiento:anadir-al-carrito@1`,c=`ucjc:identidad:sesion-cambiada@1`,l={EUR:60,USD:70},u=250,d=4500,f=[`desc_q`,`desc_cat`,`desc_pmax`,`desc_tallas`,`desc_orden`,`desc_moneda`],p=[`relevancia`,`precio-asc`,`precio-desc`,`nombre`],m=e=>String(e).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim(),h={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},g=e=>String(e).replace(/[&<>"']/g,e=>h[e]),_=`
  .aviso {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translate(-50%, 1rem);
    padding: .75rem 1.25rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    box-shadow: 0 6px 20px rgba(0, 0, 0, .2);
    opacity: 0;
    pointer-events: none;
    transition: opacity .25s, transform .25s;
    z-index: 2000;
  }
  .aviso.visible { opacity: 1; transform: translate(-50%, 0); }
  @media (prefers-reduced-motion: reduce) {
    .aviso { transition: none; }
  }
  .aviso.anadido { background: #15803d; }
`,v=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.estado=this.estadoInicial()}estadoInicial(){return{busqueda:``,busquedaTexto:``,categoria:`todo`,precioMax:l.EUR,moneda:`EUR`,tallas:[],orden:`relevancia`,productoSeleccionado:null,usuarioActivo:null,listaProductos:n.map(e=>({...e,tallas:[...e.tallas]})),tallaElegida:{}}}precioProducto(e){return this.estado.moneda===`USD`?e.precioUSD:e.precioEUR}formatearPrecio(e){let t=this.estado.moneda===`USD`?`en-US`:`es-ES`;return new Intl.NumberFormat(t,{style:`currency`,currency:this.estado.moneda}).format(e)}connectedCallback(){this.estado={...this.estadoInicial(),usuarioActivo:this.estado.usuarioActivo},this.pintarEstructura(),this.conectarEventos(),this.escucharSesion(),this.leerUrl(),this.aplicarEstadoAControles(),this.pintarProductos()}disconnectedCallback(){window.removeEventListener(c,this.alCambiarSesion),clearTimeout(this.temporizadorBusqueda),clearTimeout(this.temporizadorAviso)}escucharSesion(){this.alCambiarSesion=e=>{let{autenticado:t=!1,usuario:n=null}=e.detail||{};this.estado.usuarioActivo=t&&n?n:null,this.actualizarBarraSesion(),this.pintarProductos()},window.addEventListener(c,this.alCambiarSesion)}pintarEstructura(){this.shadowRoot.innerHTML=`
      <style>${r}${_}</style>

      <header class="barra-superior">
        <div class="lateral lateral-izq">
          <slot name="usuario"><span class="hueco">Usuario</span></slot>
        </div>
        <form class="barra-busqueda" role="search">
          <input type="search" name="q" placeholder="Buscar productos..." aria-label="Buscar productos" />
          <button type="submit">Buscar</button>
        </form>
        <div class="lateral lateral-der">
          <slot name="carrito"><span class="hueco">Carrito</span></slot>
        </div>
      </header>

      <div class="subbarra">
        <span id="sesion-container" class="estado-sesion" role="status"></span>
        <div class="selector-moneda" role="group" aria-label="Seleccionar moneda">
          <span>Moneda:</span>
          <button type="button" data-moneda="EUR" aria-pressed="true">€ EUR</button>
          <button type="button" data-moneda="USD" aria-pressed="false">$ USD</button>
        </div>
      </div>

      <nav class="navegacion" aria-label="Categorías">
        <button data-categoria="todo" aria-current="true">Todo</button>
        ${e.map(e=>`<button data-categoria="${e.id}">${e.nombre}</button>`).join(``)}
      </nav>

      <div class="cuerpo">
        <button type="button" class="btn-filtros" aria-expanded="false" aria-controls="panel-filtros">Filtros</button>
        <aside class="filtros" id="panel-filtros" aria-label="Filtros">
          <section>
            <h3>Precio máximo: <span class="valor-precio">${this.formatearPrecio(this.estado.precioMax)}</span></h3>
            <input type="range" name="precio" min="0" max="${l.EUR}" step="5" value="${l.EUR}" aria-label="Precio máximo" />
          </section>
          <section>
            <h3>Talla</h3>
            <div class="tallas">
              ${t.map(e=>`<button type="button" data-talla="${e}" aria-pressed="false">${e}</button>`).join(``)}
            </div>
          </section>
          <button type="button" class="limpiar">Limpiar filtros</button>
        </aside>

        <main>
          <div class="cabecera-resultados">
            <p class="contador" aria-live="polite"></p>
            <select name="orden" aria-label="Ordenar">
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre (A-Z)</option>
            </select>
          </div>
          <div class="chips" role="group" aria-label="Filtros activos" hidden></div>
          <p class="nota-talla" hidden></p>
          <div class="rejilla"></div>
        </main>
      </div>

      <div id="modal-container"></div>

      <div class="aviso" role="status" aria-live="polite" aria-atomic="true"></div>
    `,this.actualizarBarraSesion(),this.actualizarModal()}actualizarBarraSesion(){let e=this.shadowRoot.querySelector(`#sesion-container`),t=this.estado.usuarioActivo;e.textContent=t?`Sesión iniciada: ${t.nombre||t.email}`:`Navegando como invitado`}actualizarModal(){let e=this.shadowRoot.querySelector(`#modal-container`),t=this.estado.productoSeleccionado;t?(e.innerHTML=`
      <div class="modal-overlay" data-accion="cerrar">
        <div class="modal-contenido" role="dialog" aria-modal="true" aria-labelledby="modal-titulo" tabindex="-1" data-producto="${g(t.id)}">
          <div class="imagen modal-imagen">${o(t,g)}</div>
          <h3 id="modal-titulo">${g(t.nombre)}</h3>
          <p class="precio">${this.formatearPrecio(this.precioProducto(t))}</p>
          ${t.descripcion?`<p class="descripcion">${g(t.descripcion)}</p>`:``}
          <p><strong>Categoría:</strong> ${g(this.nombreCategoria(t.categoria))}</p>
          ${t.tallas.length?`
                <div>
                  <strong>Talla:</strong>
                  <div class="selector-talla" role="group" aria-label="Talla de ${g(t.nombre)}">
                    ${this.botonesTalla(t)}
                  </div>
                </div>
              `:`<p><strong>Talla:</strong> única</p>`}
          <p class="error-talla" role="alert" hidden></p>
          <div class="acciones-modal">
            <button type="button" class="btn-anadir-modal" data-accion="anadir" data-id="${g(t.id)}" aria-label="Añadir ${g(t.nombre)} al carrito">Añadir al carrito</button>
            <button type="button" class="btn-cerrar-modal" data-accion="cerrar">Cerrar</button>
          </div>
        </div>
      </div>
    `,e.querySelector(`.modal-contenido`).focus()):e.innerHTML=``}botonesTalla(e){return e.tallas.map(t=>`<button type="button" data-accion="talla" data-id="${g(e.id)}" data-talla="${t}" aria-pressed="${this.estado.tallaElegida[e.id]===t}">${t}</button>`).join(``)}abrirModal(e,t){this.elementoPrevio=t,this.estado.productoSeleccionado={...e},this.actualizarModal()}cerrarModal(){this.estado.productoSeleccionado=null,this.actualizarModal(),this.elementoPrevio&&this.elementoPrevio.isConnected&&this.elementoPrevio.focus(),this.elementoPrevio=null}teclaEnModal(e){if(!this.estado.productoSeleccionado)return;if(e.key===`Escape`){e.preventDefault(),this.cerrarModal();return}if(e.key!==`Tab`)return;let t=this.shadowRoot.querySelector(`.modal-contenido`),n=[...t.querySelectorAll(`button`)],r=n[0],i=n[n.length-1],a=this.shadowRoot.activeElement;e.shiftKey&&(a===r||a===t)?(e.preventDefault(),i.focus()):!e.shiftKey&&a===i&&(e.preventDefault(),r.focus())}conectarEventos(){let e=this.shadowRoot;e.querySelector(`.selector-moneda`).addEventListener(`click`,t=>{let n=t.target.closest(`button[data-moneda]`);if(!n||n.dataset.moneda===this.estado.moneda)return;let r=this.estado.precioMax/l[this.estado.moneda];this.estado.moneda=n.dataset.moneda;let i=l[this.estado.moneda];this.estado.precioMax=r>=1?i:Math.min(i,Math.round(r*i/5)*5),e.querySelectorAll(`.selector-moneda button`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.moneda===this.estado.moneda)));let a=e.querySelector(`input[name="precio"]`);a.max=i,a.value=this.estado.precioMax,e.querySelector(`.valor-precio`).textContent=this.formatearPrecio(this.estado.precioMax),this.pintarProductos(),this.actualizarModal()});let t=e.querySelector(`.barra-busqueda`),n=()=>{clearTimeout(this.temporizadorBusqueda),this.estado.busquedaTexto=t.q.value.trim(),this.estado.busqueda=m(t.q.value),this.pintarProductos()};t.q.addEventListener(`input`,()=>{clearTimeout(this.temporizadorBusqueda),this.temporizadorBusqueda=setTimeout(n,u)}),t.addEventListener(`submit`,e=>{e.preventDefault(),n()}),e.querySelector(`.navegacion`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-categoria]`);t&&this.cambiarCategoria(t.dataset.categoria)}),e.querySelector(`input[name="precio"]`).addEventListener(`input`,t=>{this.estado.precioMax=Number(t.target.value),e.querySelector(`.valor-precio`).textContent=this.formatearPrecio(this.estado.precioMax),this.pintarProductos()}),e.querySelector(`.tallas`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-talla]`);if(!t)return;let n=t.dataset.talla,r=this.estado.tallas.includes(n);this.estado.tallas=r?this.estado.tallas.filter(e=>e!==n):[...this.estado.tallas,n],t.setAttribute(`aria-pressed`,String(!r)),this.pintarProductos()}),e.querySelector(`select[name="orden"]`).addEventListener(`change`,e=>{this.estado.orden=e.target.value,this.pintarProductos()}),e.querySelector(`.limpiar`).addEventListener(`click`,()=>this.limpiarFiltros()),e.querySelector(`.chips`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-quitar]`);t&&this.quitarFiltro(t.dataset.quitar,t.dataset.valor)});let r=e.querySelector(`.btn-filtros`);r.addEventListener(`click`,()=>{let t=e.querySelector(`.filtros`).classList.toggle(`abierto`);r.setAttribute(`aria-expanded`,String(t))}),e.querySelector(`.rejilla`).addEventListener(`click`,e=>{let t=e.target.closest(`button[data-accion]`);if(t){if(t.dataset.accion===`limpiar`)this.limpiarFiltros();else if(t.dataset.accion===`ver`){let e=this.estado.listaProductos.find(e=>e.id===t.dataset.id);e&&this.abrirModal(e,t)}else this.accionProducto(t,t.closest(`.tarjeta`))}}),e.querySelector(`#modal-container`).addEventListener(`click`,e=>{let t=e.target.closest(`button[data-accion]`);t&&t.dataset.accion!==`cerrar`?this.accionProducto(t,t.closest(`.modal-contenido`)):(t||e.target.classList.contains(`modal-overlay`))&&this.cerrarModal()}),e.addEventListener(`keydown`,e=>this.teclaEnModal(e))}accionProducto(e,t){let n=this.estado.listaProductos.find(t=>t.id===e.dataset.id);if(n&&t&&(e.dataset.accion===`talla`&&this.elegirTalla(n,e.dataset.talla),e.dataset.accion===`anadir`)){if(this.necesitaTalla(n)){this.mostrarErrorTalla(t);return}this.anadirAlCarrito(n),this.estado.productoSeleccionado&&this.cerrarModal()}}cambiarCategoria(e){this.estado.categoria=e,this.shadowRoot.querySelectorAll(`.navegacion button`).forEach(t=>t.setAttribute(`aria-current`,String(t.dataset.categoria===e))),this.pintarProductos()}limpiarFiltros(){clearTimeout(this.temporizadorBusqueda);let{listaProductos:e,usuarioActivo:t,tallaElegida:n}=this.estado;this.estado={...this.estadoInicial(),listaProductos:e,usuarioActivo:t,tallaElegida:n},this.aplicarEstadoAControles(),this.pintarProductos()}nombreCategoria(t){let n=e.find(e=>e.id===t);return n?n.nombre:t}coincideBusqueda(t,n){let r=e.find(e=>e.id===t.categoria),i=m(`${t.nombre} ${r?r.nombre:``}`);return n.split(/\s+/).every(e=>i.includes(e))}cumpleFiltros(e,t=!1){let{busqueda:n,categoria:r,precioMax:i,tallas:a}=this.estado;return(r===`todo`||e.categoria===r)&&this.precioProducto(e)<=i&&(!n||this.coincideBusqueda(e,n))&&(t||a.length===0||a.some(t=>e.tallas.includes(t)))}productosFiltrados(){let{orden:e,listaProductos:t}=this.estado,n=t.filter(e=>this.cumpleFiltros(e));return e===`precio-asc`&&n.sort((e,t)=>this.precioProducto(e)-this.precioProducto(t)),e===`precio-desc`&&n.sort((e,t)=>this.precioProducto(t)-this.precioProducto(e)),e===`nombre`&&n.sort((e,t)=>e.nombre.localeCompare(t.nombre)),n}pintarProductos(){let e=this.productosFiltrados(),t=this.shadowRoot;t.querySelector(`.contador`).textContent=`${e.length} producto${e.length===1?``:`s`}`,this.pintarChips(),this.pintarNotaTalla(),this.escribirUrl(),t.querySelector(`.rejilla`).innerHTML=e.length?e.map(e=>`
          <article class="tarjeta" data-producto="${g(e.id)}">
            <div class="imagen">${o(e,g)}</div>
            <div class="info">
              <h4>${g(e.nombre)}</h4>
              <span class="precio">${this.formatearPrecio(this.precioProducto(e))}</span>
              ${e.tallas.length?`
                    <div class="selector-talla" role="group" aria-label="Talla de ${g(e.nombre)}">
                      ${this.botonesTalla(e)}
                    </div>
                  `:``}
              <p class="error-talla" role="alert" hidden></p>
              <div class="acciones">
                <button class="btn-ver" data-accion="ver" data-id="${e.id}" aria-label="Ver detalles de ${g(e.nombre)}">Ver</button>
                <button class="btn-anadir" data-accion="anadir" data-id="${e.id}" aria-label="Añadir ${g(e.nombre)} al carrito">Añadir</button>
              </div>
            </div>
          </article>
        `).join(``):`
          <div class="vacio">
            <p>No hay productos con estos filtros.</p>
            <button type="button" class="btn-limpiar-vacio" data-accion="limpiar">Limpiar filtros</button>
          </div>
        `}pintarChips(){let{busquedaTexto:e,categoria:t,precioMax:n,tallas:r,moneda:i}=this.estado,a=[];this.estado.busqueda&&a.push({quitar:`busqueda`,texto:`Búsqueda: ${e}`}),t!==`todo`&&a.push({quitar:`categoria`,texto:this.nombreCategoria(t)}),n<l[i]&&a.push({quitar:`precio`,texto:`Hasta ${this.formatearPrecio(n)}`}),r.forEach(e=>a.push({quitar:`talla`,valor:e,texto:`Talla ${e}`}));let o=this.shadowRoot.querySelector(`.chips`);o.hidden=a.length===0,o.innerHTML=a.map(e=>`
      <button type="button" class="chip" data-quitar="${e.quitar}" data-valor="${g(e.valor||``)}" aria-label="Quitar filtro: ${g(e.texto)}">
        ${g(e.texto)} <span aria-hidden="true">&times;</span>
      </button>
    `).join(``)}pintarNotaTalla(){let e=this.shadowRoot.querySelector(`.nota-talla`),t=this.estado.tallas.length?this.estado.listaProductos.filter(e=>!e.tallas.length&&this.cumpleFiltros(e,!0)).length:0;e.hidden=t===0,e.textContent=t?`${t} producto${t===1?``:`s`} de talla única no se muestra${t===1?``:`n`} con el filtro de talla.`:``}quitarFiltro(e,t){let n=this.shadowRoot;e===`busqueda`&&(n.querySelector(`input[name="q"]`).value=``,this.estado.busqueda=``,this.estado.busquedaTexto=``,this.pintarProductos()),e===`categoria`&&this.cambiarCategoria(`todo`),e===`precio`&&(this.estado.precioMax=l[this.estado.moneda],n.querySelector(`input[name="precio"]`).value=this.estado.precioMax,n.querySelector(`.valor-precio`).textContent=this.formatearPrecio(this.estado.precioMax),this.pintarProductos()),e===`talla`&&(this.estado.tallas=this.estado.tallas.filter(e=>e!==t),n.querySelector(`.tallas [data-talla="${t}"]`)?.setAttribute(`aria-pressed`,`false`),this.pintarProductos())}necesitaTalla(e){return e.tallas.length?!e.tallas.includes(this.estado.tallaElegida[e.id]):!1}elegirTalla(e,t){this.estado.tallaElegida[e.id]===t?delete this.estado.tallaElegida[e.id]:this.estado.tallaElegida[e.id]=t;let n=this.estado.tallaElegida[e.id],r=this.shadowRoot;r.querySelectorAll(`[data-accion="talla"][data-id="${e.id}"]`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.talla===n))),r.querySelectorAll(`[data-producto="${e.id}"]`).forEach(e=>this.ocultarErrorTalla(e))}mostrarErrorTalla(e){e.classList.add(`falta-talla`);let t=e.querySelector(`.error-talla`);t.textContent=`Selecciona una talla`,t.hidden=!1,e.querySelector(`[data-accion="talla"]`)?.focus()}ocultarErrorTalla(e){e.classList.remove(`falta-talla`);let t=e.querySelector(`.error-talla`);t.textContent=``,t.hidden=!0}anadirAlCarrito(e){window.dispatchEvent(new CustomEvent(s,{detail:{productoId:e.id,nombre:e.nombre,precio:this.precioProducto(e),cantidad:1}}));let t=this.estado.tallaElegida[e.id];this.mostrarAviso(`Producto añadido: ${e.nombre}${t?` (talla ${t})`:``}, ${this.formatearPrecio(this.precioProducto(e))}`,`anadido`)}mostrarAviso(e,t){let n=this.shadowRoot.querySelector(`.aviso`);n.textContent=e,n.className=`aviso ${t} visible`,clearTimeout(this.temporizadorAviso),this.temporizadorAviso=setTimeout(()=>n.classList.remove(`visible`),d)}leerUrl(){let n;try{n=new URLSearchParams(window.location.search)}catch{return}let r=this.estado,i=n.get(`desc_moneda`);i&&l[i]&&(r.moneda=i),r.precioMax=l[r.moneda];let a=Number(n.get(`desc_pmax`));n.has(`desc_pmax`)&&Number.isFinite(a)&&(r.precioMax=Math.min(l[r.moneda],Math.max(0,a)));let o=n.get(`desc_cat`);o&&e.some(e=>e.id===o)&&(r.categoria=o),r.busquedaTexto=(n.get(`desc_q`)||``).trim(),r.busqueda=m(r.busquedaTexto),r.tallas=(n.get(`desc_tallas`)||``).split(`,`).filter(e=>t.includes(e));let s=n.get(`desc_orden`);p.includes(s)&&(r.orden=s)}aplicarEstadoAControles(){let e=this.shadowRoot,t=this.estado;e.querySelector(`input[name="q"]`).value=t.busquedaTexto,e.querySelectorAll(`.navegacion button`).forEach(e=>e.setAttribute(`aria-current`,String(e.dataset.categoria===t.categoria))),e.querySelectorAll(`.selector-moneda button`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.moneda===t.moneda)));let n=e.querySelector(`input[name="precio"]`);n.max=l[t.moneda],n.value=t.precioMax,e.querySelector(`.valor-precio`).textContent=this.formatearPrecio(t.precioMax),e.querySelectorAll(`.tallas button`).forEach(e=>e.setAttribute(`aria-pressed`,String(t.tallas.includes(e.dataset.talla)))),e.querySelector(`select[name="orden"]`).value=t.orden}escribirUrl(){try{let e=this.estado,t=new URL(window.location.href);f.forEach(e=>t.searchParams.delete(e)),e.busquedaTexto&&t.searchParams.set(`desc_q`,e.busquedaTexto),e.categoria!==`todo`&&t.searchParams.set(`desc_cat`,e.categoria),e.precioMax<l[e.moneda]&&t.searchParams.set(`desc_pmax`,String(e.precioMax)),e.tallas.length&&t.searchParams.set(`desc_tallas`,e.tallas.join(`,`)),e.orden!==`relevancia`&&t.searchParams.set(`desc_orden`,e.orden),e.moneda!==`EUR`&&t.searchParams.set(`desc_moneda`,e.moneda),window.history.replaceState(window.history.state,``,t)}catch{}}};customElements.get(`ucjc-descubrimiento`)||customElements.define(`ucjc-descubrimiento`,v);