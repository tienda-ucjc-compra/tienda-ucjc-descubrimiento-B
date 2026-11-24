import { CATEGORIAS, TALLAS, PRODUCTOS } from './productos.js';
import { ESTILOS } from './estilos.js';
import { imagenProducto } from './iconos.js';
// Nombre del evento según el contrato (PR #2 de tienda-ucjc-contratos)
export const EVENTO_ANADIR_AL_CARRITO = 'ucjc:descubrimiento:anadir-al-carrito@1';
// Evento que escuchamos (emisor: Identidad). Contrato firmado ucjc-identidad-sesion-cambiada@1
export const EVENTO_SESION_CAMBIADA = 'ucjc:identidad:sesion-cambiada@1';

const PRECIO_MAXIMO = { EUR: 60, USD: 70 };

// Retardo (ms) de la búsqueda en vivo mientras el usuario escribe
const RETARDO_BUSQUEDA = 250;

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
  .aviso.anadido { background: #15803d; }
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

  precioProducto(producto) {
    return this.estado.moneda === 'USD' ? producto.precioUSD : producto.precioEUR;
  }

  formatearPrecio(precio) {
    // Cada moneda con su formato habitual: "19,99 €" y "$21.99"
    const idioma = this.estado.moneda === 'USD' ? 'en-US' : 'es-ES';
    return new Intl.NumberFormat(idioma, { style: 'currency', currency: this.estado.moneda }).format(precio);
  }

  connectedCallback() {
    // Si el shell monta el componente otra vez, la interfaz se rehace desde cero; solo se conserva la sesión
    this.estado = { ...this.estadoInicial(), usuarioActivo: this.estado.usuarioActivo };
    this.pintarEstructura();
    this.conectarEventos();
    this.escucharSesion();
    this.pintarProductos();
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
      this.estado.usuarioActivo = autenticado && usuario ? usuario : null;
      this.actualizarBarraSesion();
      this.pintarProductos();
    };
    window.addEventListener(EVENTO_SESION_CAMBIADA, this.alCambiarSesion);
  }

  pintarEstructura() {
    this.shadowRoot.innerHTML = `
      <style>${ESTILOS}${ESTILOS_AVISO}</style>

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

      <div class="selector-moneda" role="group" aria-label="Seleccionar moneda">
        <span>Moneda:</span>
        <button type="button" data-moneda="EUR" aria-pressed="true">€ EUR</button>
        <button type="button" data-moneda="USD" aria-pressed="false">$ USD</button>
      </div>
      <div id="sesion-container"></div>

      <nav class="navegacion" aria-label="Categorías">
        <button data-categoria="todo" aria-current="true">Todo</button>
        ${CATEGORIAS.map((c) => `<button data-categoria="${c.id}">${c.nombre}</button>`).join('')}
      </nav>

      <div class="cuerpo">
        <aside class="filtros" aria-label="Filtros">
          <section>
            <h3>Categoría</h3>
            ${CATEGORIAS.map((c) => `
              <label><input type="radio" name="categoria" value="${c.id}" /> ${c.nombre}</label>
            `).join('')}
            <label><input type="radio" name="categoria" value="todo" checked /> Todas</label>
          </section>
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
          <div class="rejilla"></div>
        </main>
      </div>

      <div id="modal-container"></div>

      <div class="aviso" role="status" aria-live="polite"></div>
    `;

    this.actualizarBarraSesion();
    this.actualizarModal();
  }

  actualizarBarraSesion() {
    const contenedor = this.shadowRoot.querySelector('#sesion-container');
    const usuario = this.estado.usuarioActivo;
    contenedor.innerHTML = `
      <div class="barra-sesion" role="status">
        <span>${usuario
          ? `Sesión iniciada: ${escapar(usuario.nombre || usuario.email)}`
          : 'Navegando como invitado'}</span>
      </div>
    `;
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
          <div class="imagen modal-imagen">${imagenProducto(prod, escapar)}</div>
          <h3 id="modal-titulo">${escapar(prod.nombre)}</h3>
          <p class="precio">${this.formatearPrecio(this.precioProducto(prod))}</p>
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
      if (!boton) return;
      this.estado.moneda = boton.dataset.moneda;
      this.estado.precioMax = PRECIO_MAXIMO[this.estado.moneda];
      raiz.querySelectorAll('.selector-moneda button').forEach((b) =>
        b.setAttribute('aria-pressed', String(b.dataset.moneda === this.estado.moneda))
      );
      const rango = raiz.querySelector('input[name="precio"]');
      rango.max = this.estado.precioMax;
      rango.value = this.estado.precioMax;
      raiz.querySelector('.valor-precio').textContent = this.formatearPrecio(this.estado.precioMax);
      this.pintarProductos();
      this.actualizarModal();
    });

    const formBusqueda = raiz.querySelector('.barra-busqueda');
    const aplicarBusqueda = () => {
      clearTimeout(this.temporizadorBusqueda);
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
    });

    raiz.querySelectorAll('input[name="categoria"]').forEach((radio) =>
      radio.addEventListener('change', () => this.cambiarCategoria(radio.value))
    );

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

    raiz.querySelector('.rejilla').addEventListener('click', (e) => {
      const boton = e.target.closest('button[data-accion]');
      if (!boton) return;
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

  // Elegir talla o añadir al carrito, tanto desde la tarjeta como desde la ficha.
  // Si el producto tiene tallas hay que elegir una: el aviso va en el propio recuadro, sin ventanas emergentes.
  accionProducto(boton, ambito) {
    const producto = this.estado.listaProductos.find((p) => p.id === boton.dataset.id);
    if (!producto || !ambito) return;

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

  cambiarCategoria(categoria) {
    this.estado.categoria = categoria;
    const raiz = this.shadowRoot;
    raiz.querySelectorAll('.navegacion button').forEach((b) =>
      b.setAttribute('aria-current', String(b.dataset.categoria === categoria))
    );
    raiz.querySelector(`input[name="categoria"][value="${categoria}"]`).checked = true;
    this.pintarProductos();
  }

  limpiarFiltros() {
    clearTimeout(this.temporizadorBusqueda);
    const { moneda, listaProductos, usuarioActivo, tallaElegida } = this.estado;
    this.estado = { ...this.estadoInicial(), moneda, listaProductos, usuarioActivo, tallaElegida, precioMax: PRECIO_MAXIMO[moneda] };
    const raiz = this.shadowRoot;
    raiz.querySelector('input[name="q"]').value = '';
    raiz.querySelector('input[name="precio"]').max = this.estado.precioMax;
    raiz.querySelector('input[name="precio"]').value = this.estado.precioMax;
    raiz.querySelector('.valor-precio').textContent = this.formatearPrecio(this.estado.precioMax);
    raiz.querySelector('select[name="orden"]').value = 'relevancia';
    raiz.querySelectorAll('.tallas button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    this.cambiarCategoria('todo');
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

  productosFiltrados() {
    const { busqueda, categoria, precioMax, tallas, orden, listaProductos } = this.estado;
    const lista = listaProductos.filter((p) =>
      (categoria === 'todo' || p.categoria === categoria) &&
      this.precioProducto(p) <= precioMax &&
      (!busqueda || this.coincideBusqueda(p, busqueda)) &&
      (tallas.length === 0 || tallas.some((t) => p.tallas.includes(t)))
    );

    if (orden === 'precio-asc') lista.sort((a, b) => this.precioProducto(a) - this.precioProducto(b));
    if (orden === 'precio-desc') lista.sort((a, b) => this.precioProducto(b) - this.precioProducto(a));
    if (orden === 'nombre') lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

    return lista;
  }

  pintarProductos() {
    const lista = this.productosFiltrados();
    const raiz = this.shadowRoot;
    raiz.querySelector('.contador').textContent =
      `${lista.length} producto${lista.length === 1 ? '' : 's'}`;

    raiz.querySelector('.rejilla').innerHTML = lista.length
      ? lista.map((p) => `
          <article class="tarjeta" data-producto="${escapar(p.id)}">
            <div class="imagen">${imagenProducto(p, escapar)}</div>
            <div class="info">
              <h4>${escapar(p.nombre)}</h4>
              <span class="precio">${this.formatearPrecio(this.precioProducto(p))}</span>
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
                <button class="btn-ver" data-accion="ver" data-id="${p.id}">Ver</button>
                <button class="btn-anadir" data-accion="anadir" data-id="${p.id}">Añadir</button>
              </div>
            </div>
          </article>
        `).join('')
      : `<p class="vacio">No hay productos con estos filtros.</p>`;
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
        precio: this.precioProducto(producto),
        cantidad: 1,
      },
    }));
    const talla = this.estado.tallaElegida[producto.id];
    this.mostrarAviso(`Producto añadido: ${producto.nombre}${talla ? ` (talla ${talla})` : ''}, ${this.formatearPrecio(this.precioProducto(producto))}`, 'anadido');
  }

  // Muestra un aviso abajo de la pantalla durante 2,5 segundos
  mostrarAviso(texto, tipo) {
    const aviso = this.shadowRoot.querySelector('.aviso');
    aviso.textContent = texto;
    aviso.className = `aviso ${tipo} visible`;
    clearTimeout(this.temporizadorAviso);
    this.temporizadorAviso = setTimeout(() => aviso.classList.remove('visible'), 2500);
  }
}

if (!customElements.get('ucjc-descubrimiento')) {
  customElements.define('ucjc-descubrimiento', UcjcDescubrimiento);
}

// Exportación requerida por el shell del curso
export default {
  nombre: 'descubrimiento',
  version: '0.2.1'
};
