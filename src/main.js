import { CATEGORIAS, TALLAS, PRODUCTOS } from './productos.js';
import { ESTILOS } from './estilos.js';
import { imagenProducto } from './iconos.js';
// Nombre del evento según el contrato (PR #2 de tienda-ucjc-contratos)
export const EVENTO_ANADIR_AL_CARRITO = 'ucjc:descubrimiento:anadir-al-carrito@1';
// Evento que escuchamos (emisor: Identidad). Contrato firmado ucjc-identidad-sesion-cambiada@1
export const EVENTO_SESION_CAMBIADA = 'ucjc:identidad:sesion-cambiada@1';
// Evento que emitimos al encender o apagar Black Friday (consumidores: Compra y Datos).
// Contrato ucjc-descubrimiento-campana-cambiada@1: solo los campos activa, codigo, etiqueta y momento.
export const EVENTO_CAMPANA_CAMBIADA = 'ucjc:descubrimiento:campana-cambiada@1';

const CAMPANA = { codigo: 'black-friday-2026', etiqueta: 'Black Friday UCJC' };
const DESCUENTO_MAXIMO = Math.max(0, ...PRODUCTOS.map((p) => p.descuento || 0));

const PRECIO_MAXIMO = { EUR: 60, USD: 70 };

// Retardo (ms) de la búsqueda en vivo mientras el usuario escribe
const RETARDO_BUSQUEDA = 250;

// Tiempo (ms) que se queda visible el aviso de "producto añadido"
const DURACION_AVISO = 4500;

const ORDENES = ['relevancia', 'precio-asc', 'precio-desc', 'nombre'];

// Minúsculas y sin tildes: "Equipación" y "equipacion" son lo mismo al buscar
const normalizar = (texto) =>
  String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

// Escapa texto antes de meterlo en HTML, para que un nombre con "<" o comillas no rompa la página
const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapar = (texto) => String(texto).replace(/[&<>"']/g, (c) => ESCAPES[c]);

// Estilos del aviso de "producto añadido"
const ESTILOS_AVISO = `
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
`;

// Estilos nuevos para Favoritos. Se añaden sin modificar estilos.js.
const ESTILOS_FAVORITOS = `
  .tab-favoritos { color: #b91c1c; font-weight: 700; }
  .navegacion .tab-favoritos[aria-current="true"] { border-bottom-color: #b91c1c; color: #b91c1c; }

  .btn-favorito {
    position: absolute;
    top: .5rem;
    right: .5rem;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border: 1px solid #e5e7eb;
    border-radius: 50%;
    background: white;
    color: #374151;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .15);
    font-size: 1.5rem;
    cursor: pointer;
  }
  .btn-favorito[aria-pressed="true"] {
    background: #fff1f2;
    border-color: #fda4af;
    color: #be123c;
  }
  .btn-favorito:hover { border-color: #be123c; }

  .btn-favorito-modal {
    border: 1px solid #be123c;
    background: white;
    color: #be123c;
  }
  .btn-favorito-modal[aria-pressed="true"] {
    background: #fff1f2;
  }
  .aviso.error { background: #b91c1c; }
  .aviso.favorito { background: #1e3a8a; }
`;

class UcjcDescubrimiento extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.estado = this.estadoInicial();
  }

  estadoInicial() {
    return {
      busqueda: '',
      busquedaTexto: '',
      campanaActiva: false,
      soloOfertas: false,
      soloFavoritos: false,
      favoritos: [],
      categoria: 'todo',
      precioMax: PRECIO_MAXIMO.EUR,
      moneda: 'EUR',
      tallas: [],
      orden: 'relevancia',
      productoSeleccionado: null,
      usuarioActivo: null,
      listaProductos: PRODUCTOS.map(p => ({ ...p, tallas: [...p.tallas] })),
      // Talla elegida en cada tarjeta antes de añadir: { [productoId]: 'M' }
      tallaElegida: {},
    };
  }

  // Los favoritos se guardan en este navegador, separados por el id de cada usuario.
  // No se envían eventos nuevos ni se modifica el contrato entre equipos.
  claveFavoritos() {
    const id = this.estado.usuarioActivo?.id;
    if (id === undefined || id === null || !String(id).trim()) return null;
    return `ucjc:descubrimiento-B:favoritos:${encodeURIComponent(String(id))}`;
  }

  cargarFavoritos() {
    const clave = this.claveFavoritos();
    if (!clave) return [];
    try {
      const guardados = JSON.parse(window.localStorage.getItem(clave) || '[]');
      const idsValidos = new Set(this.estado.listaProductos.map((p) => p.id));
      return Array.isArray(guardados)
        ? [...new Set(guardados.filter((id) => typeof id === 'string' && idsValidos.has(id)))]
        : [];
    } catch {
      // Si el navegador no permite localStorage, la tienda sigue funcionando.
      return [];
    }
  }

  guardarFavoritos() {
    const clave = this.claveFavoritos();
    if (!clave) return;
    try {
      window.localStorage.setItem(clave, JSON.stringify(this.estado.favoritos));
    } catch {
      // Los favoritos permanecen disponibles durante esta sesión de la página.
    }
  }

  botonFavorito(producto, enModal = false) {
    const guardado = this.estado.favoritos.includes(producto.id);
    const accion = guardado ? 'Quitar de favoritos' : 'Añadir a favoritos';
    const atributos = `type="button" data-accion="favorito" data-id="${escapar(producto.id)}" aria-pressed="${guardado}" aria-label="${accion}: ${escapar(producto.nombre)}"`;
    return enModal
      ? `<button class="btn-favorito-modal" ${atributos}>${guardado ? '♥ Quitar favorito' : '♡ Añadir a favoritos'}</button>`
      : `<button class="btn-favorito" ${atributos}>${guardado ? '♥' : '♡'}</button>`;
  }

  alternarFavorito(producto) {
    if (!this.claveFavoritos()) {
      this.mostrarAviso('Inicio de sesión necesario para añadir a favoritos', 'error');
      return;
    }

    const guardado = this.estado.favoritos.includes(producto.id);
    this.estado.favoritos = guardado
      ? this.estado.favoritos.filter((id) => id !== producto.id)
      : [...this.estado.favoritos, producto.id];
    this.guardarFavoritos();
    this.pintarProductos();
    if (this.estado.productoSeleccionado) this.actualizarModal();
    this.mostrarAviso(
      `${guardado ? 'Eliminado de favoritos' : 'Añadido a favoritos'}: ${producto.nombre}`,
      'favorito'
    );
  }

  mostrarFavoritos() {
    if (!this.claveFavoritos()) {
      this.mostrarAviso('Inicio de sesión necesario para ver tus favoritos', 'error');
      return;
    }

    const activar = !this.estado.soloFavoritos;
    this.estado.soloFavoritos = activar;
    if (activar) {
      // Abre la lista de favoritos sin que los filtros anteriores oculten productos.
      this.estado.categoria = 'todo';
      this.estado.soloOfertas = false;
      this.estado.busqueda = '';
      this.estado.busquedaTexto = '';
      this.estado.precioMax = PRECIO_MAXIMO[this.estado.moneda];
      this.estado.tallas = [];
    }
    this.aplicarEstadoAControles();
    this.pintarProductos();
  }

  // Precio de catálogo, sin rebaja (en la moneda elegida, o en la que se indique)
  precioOriginal(producto, moneda = this.estado.moneda) {
    return moneda === 'USD' ? producto.precioUSD : producto.precioEUR;
  }

  // Un producto está en oferta si la campaña está encendida y tiene descuento
  enOferta(producto) {
    return this.estado.campanaActiva && producto.descuento > 0;
  }

  // Precio que paga el usuario: el rebajado durante la campaña (también es el que viaja al carrito)
  precioProducto(producto, moneda = this.estado.moneda) {
    const base = this.precioOriginal(producto, moneda);
    return this.enOferta(producto) ? Math.round(base * (100 - producto.descuento)) / 100 : base;
  }

  // Precio en HTML: con rebaja se ve el antiguo tachado y el nuevo
  htmlPrecio(producto) {
    const actual = this.formatearPrecio(this.precioProducto(producto));
    if (!this.enOferta(producto)) return actual;
    return `<s class="precio-antes"><span class="solo-lector">Antes </span>${this.formatearPrecio(this.precioOriginal(producto))}</s> <span class="precio-oferta"><span class="solo-lector">Ahora </span>${actual}</span>`;
  }

  insigniaOferta(producto) {
    return this.enOferta(producto) ? `<span class="insignia-oferta">-${producto.descuento}%</span>` : '';
  }

  formatearPrecio(precio) {
    // Cada moneda con su formato habitual: "19,99 €" y "$21.99"
    const idioma = this.estado.moneda === 'USD' ? 'en-US' : 'es-ES';
    return new Intl.NumberFormat(idioma, { style: 'currency', currency: this.estado.moneda }).format(precio);
  }

  connectedCallback() {
    // Si el shell monta el componente otra vez, la interfaz se rehace desde cero; se conserva la sesión.
    this.estado = { ...this.estadoInicial(), usuarioActivo: this.estado.usuarioActivo };
    this.estado.favoritos = this.cargarFavoritos();
    this.pintarEstructura();
    this.conectarEventos();
    this.escucharSesion();
    this.leerUrl();
    this.aplicarEstadoAControles();
    this.pintarProductos();
    // Al cargar la pieza se avisa del estado actual de la campaña, como pide el contrato
    this.emitirCampana();
  }

  // Al quitar el componente de la página se sueltan los listeners de window y los temporizadores
  disconnectedCallback() {
    window.removeEventListener(EVENTO_SESION_CAMBIADA, this.alCambiarSesion);
    clearTimeout(this.temporizadorBusqueda);
    clearTimeout(this.temporizadorAviso);
  }

  // Escuchar cambios de sesión del equipo de Identidad.
  // detail = { autenticado: true, usuario: { id, email, nombre? } }  o  { autenticado: false, usuario: null }
  escucharSesion() {
    this.alCambiarSesion = (e) => {
      const { autenticado = false, usuario = null } = e.detail || {};
      this.estado.usuarioActivo = autenticado && usuario?.id != null && String(usuario.id).trim()
        ? usuario : null;
      this.estado.favoritos = this.cargarFavoritos();
      if (!this.estado.usuarioActivo) this.estado.soloFavoritos = false;
      this.actualizarBarraSesion();
      this.aplicarEstadoAControles();
      this.pintarProductos();
    };
    window.addEventListener(EVENTO_SESION_CAMBIADA, this.alCambiarSesion);
  }

  pintarEstructura() {
    this.shadowRoot.innerHTML = `
      <style>${ESTILOS}${ESTILOS_AVISO}${ESTILOS_FAVORITOS}</style>

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
        <div class="controles-subbarra">
          <button type="button" class="btn-bf" aria-pressed="false">${CAMPANA.etiqueta}</button>
          <div class="selector-moneda" role="group" aria-label="Seleccionar moneda">
            <span>Moneda:</span>
            <button type="button" data-moneda="EUR" aria-pressed="true">€ EUR</button>
            <button type="button" data-moneda="USD" aria-pressed="false">$ USD</button>
          </div>
        </div>
      </div>
      <div class="banner-bf" hidden>
        <p><strong>${CAMPANA.etiqueta}</strong>: hasta -${DESCUENTO_MAXIMO}% en artículos seleccionados</p>
        <button type="button" class="btn-ver-ofertas" aria-pressed="false">Ver ofertas</button>
      </div>

      <nav class="navegacion" aria-label="Categorías">
        <button type="button" class="tab-ofertas" aria-pressed="false" hidden>Ofertas</button>
        <button data-categoria="todo" aria-current="true">Todo</button>
        ${CATEGORIAS.map((c) => `<button data-categoria="${c.id}">${c.nombre}</button>`).join('')}
        <button type="button" class="tab-favoritos" aria-current="false">♡ Favoritos</button>
      </nav>

      <div class="cuerpo">
        <button type="button" class="btn-filtros" aria-expanded="false" aria-controls="panel-filtros">Filtros</button>
        <aside class="filtros" id="panel-filtros" aria-label="Filtros">
          <section>
            <h3>Precio máximo: <span class="valor-precio">${this.formatearPrecio(this.estado.precioMax)}</span></h3>
            <input type="range" name="precio" min="0" max="${PRECIO_MAXIMO.EUR}" step="5" value="${PRECIO_MAXIMO.EUR}" aria-label="Precio máximo" />
          </section>
          <section>
            <h3>Talla</h3>
            <div class="tallas">
              ${TALLAS.map((t) => `<button type="button" data-talla="${t}" aria-pressed="false">${t}</button>`).join('')}
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
    `;

    this.actualizarBarraSesion();
    this.actualizarModal();
  }

  actualizarBarraSesion() {
    const contenedor = this.shadowRoot.querySelector('#sesion-container');
    const usuario = this.estado.usuarioActivo;
    contenedor.textContent = usuario
      ? `Sesión iniciada: ${usuario.nombre || usuario.email || usuario.id}`
      : 'Navegando como invitado';
  }

  actualizarModal() {
    const contenedorModal = this.shadowRoot.querySelector('#modal-container');
    const prod = this.estado.productoSeleccionado;

    if (!prod) {
      contenedorModal.innerHTML = '';
      return;
    }

    contenedorModal.innerHTML = `
      <div class="modal-overlay" data-accion="cerrar">
        <div class="modal-contenido" role="dialog" aria-modal="true" aria-labelledby="modal-titulo" tabindex="-1" data-producto="${escapar(prod.id)}">
          <div class="imagen modal-imagen">${imagenProducto(prod, escapar)}${this.insigniaOferta(prod)}</div>
          <h3 id="modal-titulo">${escapar(prod.nombre)}</h3>
          <p class="precio">${this.htmlPrecio(prod)}</p>
          ${prod.descripcion ? `<p class="descripcion">${escapar(prod.descripcion)}</p>` : ''}
          <p><strong>Categoría:</strong> ${escapar(this.nombreCategoria(prod.categoria))}</p>
          ${
            prod.tallas.length
              ? `
                <div>
                  <strong>Talla:</strong>
                  <div class="selector-talla" role="group" aria-label="Talla de ${escapar(prod.nombre)}">
                    ${this.botonesTalla(prod)}
                  </div>
                </div>
              `
              : '<p><strong>Talla:</strong> única</p>'
          }
          <p class="error-talla" role="alert" hidden></p>
          <div class="acciones-modal">
            <button type="button" class="btn-anadir-modal" data-accion="anadir" data-id="${escapar(prod.id)}" aria-label="Añadir ${escapar(prod.nombre)} al carrito">Añadir al carrito</button>
            ${this.botonFavorito(prod, true)}
            <button type="button" class="btn-cerrar-modal" data-accion="cerrar">Cerrar</button>
          </div>
        </div>
      </div>
    `;
    // El foco pasa al diálogo para que el lector de pantalla lea el título y el teclado trabaje dentro
    contenedorModal.querySelector('.modal-contenido').focus();
  }

  botonesTalla(producto) {
    return producto.tallas.map((t) =>
      `<button type="button" data-accion="talla" data-id="${escapar(producto.id)}" data-talla="${t}" aria-pressed="${this.estado.tallaElegida[producto.id] === t}">${t}</button>`
    ).join('');
  }

  abrirModal(producto, disparador) {
    this.elementoPrevio = disparador;
    this.estado.productoSeleccionado = { ...producto };
    this.actualizarModal();
  }

  cerrarModal() {
    this.estado.productoSeleccionado = null;
    this.actualizarModal();
    // Devuelve el foco al botón que abrió la ficha, si sigue en pantalla
    if (this.elementoPrevio && this.elementoPrevio.isConnected) this.elementoPrevio.focus();
    this.elementoPrevio = null;
  }

  // Tab y Mayús+Tab dan la vuelta dentro de la ficha; Esc la cierra
  teclaEnModal(e) {
    if (!this.estado.productoSeleccionado) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      this.cerrarModal();
      return;
    }
    if (e.key !== 'Tab') return;
    const modal = this.shadowRoot.querySelector('.modal-contenido');
    const focales = [...modal.querySelectorAll('button')];
    const primero = focales[0];
    const ultimo = focales[focales.length - 1];
    const activo = this.shadowRoot.activeElement;
    if (e.shiftKey && (activo === primero || activo === modal)) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && activo === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  }

  conectarEventos() {
    const raiz = this.shadowRoot;

    raiz.querySelector('.selector-moneda').addEventListener('click', (e) => {
      const boton = e.target.closest('button[data-moneda]');
      if (!boton || boton.dataset.moneda === this.estado.moneda) return;
      // El filtro de precio conserva su posición relativa: si estaba a media escala, sigue a media escala
      const proporcion = this.estado.precioMax / PRECIO_MAXIMO[this.estado.moneda];
      this.estado.moneda = boton.dataset.moneda;
      const maximoNuevo = PRECIO_MAXIMO[this.estado.moneda];
      this.estado.precioMax = proporcion >= 1
        ? maximoNuevo
        : Math.min(maximoNuevo, Math.round((proporcion * maximoNuevo) / 5) * 5);
      raiz.querySelectorAll('.selector-moneda button').forEach((b) =>
        b.setAttribute('aria-pressed', String(b.dataset.moneda === this.estado.moneda))
      );
      const rango = raiz.querySelector('input[name="precio"]');
      rango.max = maximoNuevo;
      rango.value = this.estado.precioMax;
      raiz.querySelector('.valor-precio').textContent = this.formatearPrecio(this.estado.precioMax);
      this.pintarProductos();
      this.actualizarModal();
    });

    const formBusqueda = raiz.querySelector('.barra-busqueda');
    const aplicarBusqueda = () => {
      clearTimeout(this.temporizadorBusqueda);
      this.estado.busquedaTexto = formBusqueda.q.value.trim();
      this.estado.busqueda = normalizar(formBusqueda.q.value);
      this.pintarProductos();
    };
    // Búsqueda en vivo: filtra al escribir, con un pequeño retardo
    formBusqueda.q.addEventListener('input', () => {
      clearTimeout(this.temporizadorBusqueda);
      this.temporizadorBusqueda = setTimeout(aplicarBusqueda, RETARDO_BUSQUEDA);
    });
    // Enter o botón "Buscar": aplica al instante
    formBusqueda.addEventListener('submit', (e) => {
      e.preventDefault();
      aplicarBusqueda();
    });

    raiz.querySelector('.navegacion').addEventListener('click', (e) => {
      const boton = e.target.closest('[data-categoria]');
      if (boton) this.cambiarCategoria(boton.dataset.categoria);
      if (e.target.closest('.tab-favoritos')) this.mostrarFavoritos();
    });

    // Black Friday: botón que enciende o apaga la campaña, y accesos para ver solo las ofertas
    raiz.querySelector('.btn-bf').addEventListener('click', () => this.fijarCampana(!this.estado.campanaActiva));
    const alternarOfertas = () => this.fijarSoloOfertas(!this.estado.soloOfertas);
    raiz.querySelector('.tab-ofertas').addEventListener('click', alternarOfertas);
    raiz.querySelector('.btn-ver-ofertas').addEventListener('click', alternarOfertas);

    raiz.querySelector('input[name="precio"]').addEventListener('input', (e) => {
      this.estado.precioMax = Number(e.target.value);
      raiz.querySelector('.valor-precio').textContent = this.formatearPrecio(this.estado.precioMax);
      this.pintarProductos();
    });

    raiz.querySelector('.tallas').addEventListener('click', (e) => {
      const boton = e.target.closest('[data-talla]');
      if (!boton) return;
      const talla = boton.dataset.talla;
      const activa = this.estado.tallas.includes(talla);
      this.estado.tallas = activa
        ? this.estado.tallas.filter((t) => t !== talla)
        : [...this.estado.tallas, talla];
      boton.setAttribute('aria-pressed', String(!activa));
      this.pintarProductos();
    });

    raiz.querySelector('select[name="orden"]').addEventListener('change', (e) => {
      this.estado.orden = e.target.value;
      this.pintarProductos();
    });

    raiz.querySelector('.limpiar').addEventListener('click', () => this.limpiarFiltros());

    raiz.querySelector('.chips').addEventListener('click', (e) => {
      const chip = e.target.closest('[data-quitar]');
      if (chip) this.quitarFiltro(chip.dataset.quitar, chip.dataset.valor);
    });

    // En móvil los filtros se pliegan detrás de este botón para ver antes los productos
    const botonFiltros = raiz.querySelector('.btn-filtros');
    botonFiltros.addEventListener('click', () => {
      const abierto = raiz.querySelector('.filtros').classList.toggle('abierto');
      botonFiltros.setAttribute('aria-expanded', String(abierto));
    });

    raiz.querySelector('.rejilla').addEventListener('click', (e) => {
      const boton = e.target.closest('button[data-accion]');
      if (!boton) return;
      if (boton.dataset.accion === 'limpiar') {
        this.limpiarFiltros();
        return;
      }
      if (boton.dataset.accion === 'catalogo') {
        this.cambiarCategoria('todo');
        return;
      }
      if (boton.dataset.accion === 'ver') {
        const producto = this.estado.listaProductos.find((p) => p.id === boton.dataset.id);
        if (producto) this.abrirModal(producto, boton);
        return;
      }
      this.accionProducto(boton, boton.closest('.tarjeta'));
    });

    // Ficha de producto: elegir talla, añadir, y cerrar con el botón o el fondo sombreado
    raiz.querySelector('#modal-container').addEventListener('click', (e) => {
      const boton = e.target.closest('button[data-accion]');
      if (boton && boton.dataset.accion !== 'cerrar') {
        this.accionProducto(boton, boton.closest('.modal-contenido'));
        return;
      }
      if (boton || e.target.classList.contains('modal-overlay')) this.cerrarModal();
    });

    raiz.addEventListener('keydown', (e) => this.teclaEnModal(e));
  }

  // Elegir talla, añadir al carrito o guardar en favoritos, desde la tarjeta o la ficha.
  // Si el producto tiene tallas hay que elegir una: el aviso va en el propio recuadro, sin ventanas emergentes.
  accionProducto(boton, ambito) {
    const producto = this.estado.listaProductos.find((p) => p.id === boton.dataset.id);
    if (!producto || !ambito) return;

    if (boton.dataset.accion === 'favorito') {
      this.alternarFavorito(producto);
      return;
    }
    if (boton.dataset.accion === 'talla') this.elegirTalla(producto, boton.dataset.talla);
    if (boton.dataset.accion === 'anadir') {
      if (this.necesitaTalla(producto)) {
        this.mostrarErrorTalla(ambito);
        return;
      }
      this.anadirAlCarrito(producto);
      if (this.estado.productoSeleccionado) this.cerrarModal();
    }
  }

  // Enciende o apaga Black Friday y avisa a Compra y Datos con el evento del contrato
  fijarCampana(activa) {
    this.estado.campanaActiva = activa;
    if (!activa) this.estado.soloOfertas = false;
    this.aplicarEstadoAControles();
    this.pintarProductos();
    this.emitirCampana();
  }

  fijarSoloOfertas(valor) {
    this.estado.soloFavoritos = false;
    this.estado.soloOfertas = this.estado.campanaActiva && valor;
    this.aplicarEstadoAControles();
    this.pintarProductos();
  }

  // Contrato ucjc:descubrimiento:campana-cambiada@1 (emisor: Descubrimiento, consumidores: Compra y Datos).
  // Solo los 4 campos firmados: no añadir ni renombrar campos sin pasar por el repo de contratos.
  emitirCampana() {
    window.dispatchEvent(new CustomEvent(EVENTO_CAMPANA_CAMBIADA, {
      detail: {
        activa: this.estado.campanaActiva,
        codigo: CAMPANA.codigo,
        etiqueta: CAMPANA.etiqueta,
        momento: new Date().toISOString(),
      },
    }));
  }

  cambiarCategoria(categoria) {
    this.estado.categoria = categoria;
    this.estado.soloFavoritos = false;
    this.aplicarEstadoAControles();
    this.pintarProductos();
  }

  limpiarFiltros() {
    clearTimeout(this.temporizadorBusqueda);
    // Vuelve todo al estado inicial, moneda incluida (EUR); solo se conservan la sesión, el catálogo y las tallas elegidas
    // (Black Friday no es un filtro: la campaña sigue encendida aunque se limpien los filtros)
    const { listaProductos, usuarioActivo, tallaElegida, campanaActiva, favoritos, soloFavoritos } = this.estado;
    this.estado = { ...this.estadoInicial(), listaProductos, usuarioActivo, tallaElegida, campanaActiva, favoritos, soloFavoritos };
    this.aplicarEstadoAControles();
    this.pintarProductos();
  }

  nombreCategoria(id) {
    const categoria = CATEGORIAS.find((c) => c.id === id);
    return categoria ? categoria.nombre : id;
  }

  // Busca por nombre o por nombre de categoría, sin distinguir tildes ni mayúsculas.
  // Cada palabra escrita debe aparecer en alguno de los dos textos.
  coincideBusqueda(producto, busqueda) {
    const categoria = CATEGORIAS.find((c) => c.id === producto.categoria);
    const texto = normalizar(`${producto.nombre} ${categoria ? categoria.nombre : ''}`);
    return busqueda.split(/\s+/).every((palabra) => texto.includes(palabra));
  }

  // ¿Cumple el producto los filtros activos? Con ignorarTalla se salta solo el filtro de talla.
  cumpleFiltros(p, ignorarTalla = false) {
    const { busqueda, categoria, precioMax, tallas } = this.estado;
    return (categoria === 'todo' || p.categoria === categoria) &&
      (!this.estado.soloOfertas || this.enOferta(p)) &&
      this.precioProducto(p) <= precioMax &&
      (!busqueda || this.coincideBusqueda(p, busqueda)) &&
      (ignorarTalla || tallas.length === 0 || tallas.some((t) => p.tallas.includes(t)));
  }

  productosFiltrados() {
    const { orden, listaProductos } = this.estado;
    const lista = listaProductos.filter((p) =>
      this.cumpleFiltros(p) && (!this.estado.soloFavoritos || this.estado.favoritos.includes(p.id))
    );

    if (orden === 'precio-asc') lista.sort((a, b) => this.precioProducto(a) - this.precioProducto(b));
    if (orden === 'precio-desc') lista.sort((a, b) => this.precioProducto(b) - this.precioProducto(a));
    if (orden === 'nombre') lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

    return lista;
  }

  pintarProductos() {
    const lista = this.productosFiltrados();
    const raiz = this.shadowRoot;
    raiz.querySelector('.contador').textContent = this.estado.soloFavoritos
      ? `${lista.length} favorito${lista.length === 1 ? '' : 's'}`
      : `${lista.length} producto${lista.length === 1 ? '' : 's'}`;
    this.pintarChips();
    this.pintarNotaTalla();

    raiz.querySelector('.rejilla').innerHTML = lista.length
      ? lista.map((p) => `
          <article class="tarjeta" data-producto="${escapar(p.id)}">
            <div class="imagen">${imagenProducto(p, escapar)}${this.insigniaOferta(p)}${this.botonFavorito(p)}</div>
            <div class="info">
              <h4>${escapar(p.nombre)}</h4>
              <span class="precio">${this.htmlPrecio(p)}</span>
              ${
                p.tallas.length
                  ? `
                    <div class="selector-talla" role="group" aria-label="Talla de ${escapar(p.nombre)}">
                      ${this.botonesTalla(p)}
                    </div>
                  `
                  : ''
              }
              <p class="error-talla" role="alert" hidden></p>
              <div class="acciones">
                <button class="btn-ver" data-accion="ver" data-id="${p.id}" aria-label="Ver detalles de ${escapar(p.nombre)}">Ver</button>
                <button class="btn-anadir" data-accion="anadir" data-id="${p.id}" aria-label="Añadir ${escapar(p.nombre)} al carrito">Añadir</button>
              </div>
            </div>
          </article>
        `).join('')
      : `
          <div class="vacio">
            <p>${this.estado.soloFavoritos
              ? this.estado.favoritos.length
                ? 'No hay favoritos con estos filtros.'
                : 'Todavía no tienes productos favoritos.'
              : 'No hay productos con estos filtros.'}</p>
            ${this.estado.soloFavoritos && !this.estado.favoritos.length
              ? '<button type="button" class="btn-limpiar-vacio" data-accion="catalogo">Ver catálogo</button>'
              : '<button type="button" class="btn-limpiar-vacio" data-accion="limpiar">Limpiar filtros</button>'}
          </div>
        `;
  }

  // Filtros activos como etiquetas que se quitan con un clic
  pintarChips() {
    const { busquedaTexto, categoria, precioMax, tallas, moneda } = this.estado;
    const chips = [];
    if (this.estado.busqueda) chips.push({ quitar: 'busqueda', texto: `Búsqueda: ${busquedaTexto}` });
    if (this.estado.soloOfertas) chips.push({ quitar: 'ofertas', texto: 'Solo ofertas' });
    if (categoria !== 'todo') chips.push({ quitar: 'categoria', texto: this.nombreCategoria(categoria) });
    if (precioMax < PRECIO_MAXIMO[moneda]) chips.push({ quitar: 'precio', texto: `Hasta ${this.formatearPrecio(precioMax)}` });
    tallas.forEach((t) => chips.push({ quitar: 'talla', valor: t, texto: `Talla ${t}` }));

    const contenedor = this.shadowRoot.querySelector('.chips');
    contenedor.hidden = chips.length === 0;
    contenedor.innerHTML = chips.map((c) => `
      <button type="button" class="chip" data-quitar="${c.quitar}" data-valor="${escapar(c.valor || '')}" aria-label="Quitar filtro: ${escapar(c.texto)}">
        ${escapar(c.texto)} <span aria-hidden="true">&times;</span>
      </button>
    `).join('');
  }

  // Los productos sin tallas (talla única) desaparecen al filtrar por talla; se avisa en vez de ocultarlo en silencio
  pintarNotaTalla() {
    const nota = this.shadowRoot.querySelector('.nota-talla');
    const ocultos = this.estado.tallas.length
      ? this.estado.listaProductos.filter((p) => !p.tallas.length && this.cumpleFiltros(p, true)).length
      : 0;
    nota.hidden = ocultos === 0;
    nota.textContent = ocultos
      ? `${ocultos} producto${ocultos === 1 ? '' : 's'} de talla única no se muestra${ocultos === 1 ? '' : 'n'} con el filtro de talla.`
      : '';
  }

  quitarFiltro(tipo, valor) {
    const raiz = this.shadowRoot;
    if (tipo === 'busqueda') {
      raiz.querySelector('input[name="q"]').value = '';
      this.estado.busqueda = '';
      this.estado.busquedaTexto = '';
      this.pintarProductos();
    }
    if (tipo === 'categoria') this.cambiarCategoria('todo');
    if (tipo === 'ofertas') this.fijarSoloOfertas(false);
    if (tipo === 'precio') {
      this.estado.precioMax = PRECIO_MAXIMO[this.estado.moneda];
      raiz.querySelector('input[name="precio"]').value = this.estado.precioMax;
      raiz.querySelector('.valor-precio').textContent = this.formatearPrecio(this.estado.precioMax);
      this.pintarProductos();
    }
    if (tipo === 'talla') {
      this.estado.tallas = this.estado.tallas.filter((t) => t !== valor);
      raiz.querySelector(`.tallas [data-talla="${valor}"]`)?.setAttribute('aria-pressed', 'false');
      this.pintarProductos();
    }
  }

  // Un producto con tallas no se puede añadir hasta elegir una de ellas
  necesitaTalla(producto) {
    if (!producto.tallas.length) return false;
    return !producto.tallas.includes(this.estado.tallaElegida[producto.id]);
  }

  // La talla elegida se refleja en todos los sitios donde se ve ese producto (tarjeta y ficha)
  elegirTalla(producto, talla) {
    const actual = this.estado.tallaElegida[producto.id];
    if (actual === talla) delete this.estado.tallaElegida[producto.id];
    else this.estado.tallaElegida[producto.id] = talla;

    const elegida = this.estado.tallaElegida[producto.id];
    const raiz = this.shadowRoot;
    raiz.querySelectorAll(`[data-accion="talla"][data-id="${producto.id}"]`).forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.talla === elegida))
    );
    raiz.querySelectorAll(`[data-producto="${producto.id}"]`).forEach((c) => this.ocultarErrorTalla(c));
  }

  mostrarErrorTalla(tarjeta) {
    tarjeta.classList.add('falta-talla');
    const mensaje = tarjeta.querySelector('.error-talla');
    mensaje.textContent = 'Selecciona una talla';
    mensaje.hidden = false;
    tarjeta.querySelector('[data-accion="talla"]')?.focus();
  }

  ocultarErrorTalla(tarjeta) {
    tarjeta.classList.remove('falta-talla');
    const mensaje = tarjeta.querySelector('.error-talla');
    mensaje.textContent = '';
    mensaje.hidden = true;
  }

  // Contrato ucjc:descubrimiento:anadir-al-carrito@1 (emisor: Descubrimiento, consumidor: Compra).
  // Solo los 4 campos firmados: no añadir ni renombrar campos sin pasar por el repo de contratos.
  anadirAlCarrito(producto) {
    window.dispatchEvent(new CustomEvent(EVENTO_ANADIR_AL_CARRITO, {
      detail: {
        productoId: producto.id,
        nombre: producto.nombre,
        // El contrato fija el precio en euros: se envía siempre en EUR (ya con la rebaja si hay campaña),
        // aunque en pantalla se esté viendo en dólares.
        precio: this.precioProducto(producto, 'EUR'),
        cantidad: 1,
      },
    }));
    const talla = this.estado.tallaElegida[producto.id];
    this.mostrarAviso(`Producto añadido: ${producto.nombre}${talla ? ` (talla ${talla})` : ''}, ${this.formatearPrecio(this.precioProducto(producto))}`, 'anadido');
  }

  // Muestra un aviso abajo de la pantalla el tiempo suficiente para leerlo
  mostrarAviso(texto, tipo) {
    const aviso = this.shadowRoot.querySelector('.aviso');
    aviso.textContent = texto;
    aviso.className = `aviso ${tipo} visible`;
    clearTimeout(this.temporizadorAviso);
    this.temporizadorAviso = setTimeout(() => aviso.classList.remove('visible'), DURACION_AVISO);
  }

  // ---------- Filtros iniciales desde la URL ----------
  // Solo se LEE la URL (la pieza no modifica nada fuera de su elemento, según el contrato de carga).
  // Sirve para abrir el catálogo ya filtrado con un enlace: ?desc_q=, desc_cat=, desc_pmax=, desc_tallas=,
  // desc_orden=, desc_moneda=, desc_bf=1 y desc_ofertas=1. El prefijo "desc_" evita chocar con los del shell.

  leerUrl() {
    let params;
    try {
      params = new URLSearchParams(window.location.search);
    } catch {
      return;
    }
    const e = this.estado;
    const moneda = params.get('desc_moneda');
    if (moneda && PRECIO_MAXIMO[moneda]) e.moneda = moneda;

    e.precioMax = PRECIO_MAXIMO[e.moneda];
    const precio = Number(params.get('desc_pmax'));
    if (params.has('desc_pmax') && Number.isFinite(precio)) {
      e.precioMax = Math.min(PRECIO_MAXIMO[e.moneda], Math.max(0, precio));
    }

    const categoria = params.get('desc_cat');
    if (categoria && CATEGORIAS.some((c) => c.id === categoria)) e.categoria = categoria;

    e.busquedaTexto = (params.get('desc_q') || '').trim();
    e.busqueda = normalizar(e.busquedaTexto);

    e.tallas = (params.get('desc_tallas') || '').split(',').filter((t) => TALLAS.includes(t));

    const orden = params.get('desc_orden');
    if (ORDENES.includes(orden)) e.orden = orden;

    e.campanaActiva = params.get('desc_bf') === '1';
    e.soloOfertas = e.campanaActiva && params.get('desc_ofertas') === '1';
  }

  // Refleja el estado (por ejemplo el leído de la URL) en los controles de la pantalla
  aplicarEstadoAControles() {
    const raiz = this.shadowRoot;
    const e = this.estado;
    raiz.querySelector('input[name="q"]').value = e.busquedaTexto;
    raiz.querySelectorAll('.navegacion [data-categoria]').forEach((b) =>
      b.setAttribute('aria-current', String(!e.soloFavoritos && b.dataset.categoria === e.categoria))
    );
    raiz.querySelector('.tab-favoritos').setAttribute('aria-current', String(e.soloFavoritos));
    raiz.querySelector('.btn-bf').setAttribute('aria-pressed', String(e.campanaActiva));
    raiz.querySelector('.banner-bf').hidden = !e.campanaActiva;
    raiz.querySelector('.tab-ofertas').hidden = !e.campanaActiva;
    raiz.querySelector('.tab-ofertas').setAttribute('aria-pressed', String(e.soloOfertas));
    const verOfertas = raiz.querySelector('.btn-ver-ofertas');
    verOfertas.setAttribute('aria-pressed', String(e.soloOfertas));
    verOfertas.textContent = e.soloOfertas ? 'Ver todo el catálogo' : 'Ver ofertas';
    raiz.querySelectorAll('.selector-moneda button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.moneda === e.moneda))
    );
    const rango = raiz.querySelector('input[name="precio"]');
    rango.max = PRECIO_MAXIMO[e.moneda];
    rango.value = e.precioMax;
    raiz.querySelector('.valor-precio').textContent = this.formatearPrecio(e.precioMax);
    raiz.querySelectorAll('.tallas button').forEach((b) =>
      b.setAttribute('aria-pressed', String(e.tallas.includes(b.dataset.talla)))
    );
    raiz.querySelector('select[name="orden"]').value = e.orden;
  }

}

if (!customElements.get('ucjc-descubrimiento')) {
  customElements.define('ucjc-descubrimiento', UcjcDescubrimiento);
}

// Exportación requerida por el shell del curso
export default {
  nombre: 'descubrimiento',
  version: typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'dev',
};
