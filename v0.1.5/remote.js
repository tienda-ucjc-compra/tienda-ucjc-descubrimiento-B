// src/productos.js
var e = [
	{
		id: "ropa",
		nombre: "Ropa"
	},
	{
		id: "deporte",
		nombre: "Deporte"
	},
	{
		id: "material",
		nombre: "Material"
	},
	{
		id: "regalos",
		nombre: "Regalos"
	}
], t = [
	"XS",
	"S",
	"M",
	"L",
	"XL"
], n = [
	{
		id: "prod-101",
		nombre: "Camiseta Técnica UCJC",
		categoria: "deporte",
		precioEUR: 19.99,
		precioUSD: 21.99,
		tallas: [
			"S",
			"M",
			"L",
			"XL"
		],
		descuento: 20,
		descripcion: "Camiseta transpirable de secado rápido para entrenar, con el escudo de la universidad."
	},
	{
		id: "prod-102",
		nombre: "Sudadera con capucha",
		categoria: "ropa",
		precioEUR: 39.95,
		precioUSD: 43.95,
		tallas: [
			"XS",
			"S",
			"M",
			"L",
			"XL"
		],
		descuento: 30,
		descripcion: "Sudadera de algodón con capucha y bolsillo canguro, interior suave."
	},
	{
		id: "prod-103",
		nombre: "Chaqueta cortavientos",
		categoria: "ropa",
		precioEUR: 45,
		precioUSD: 49.5,
		tallas: [
			"M",
			"L",
			"XL"
		],
		descripcion: "Chaqueta ligera y resistente al viento, con cremallera completa y capucha plegable."
	},
	{
		id: "prod-104",
		nombre: "Equipación oficial fútbol",
		categoria: "deporte",
		precioEUR: 55,
		precioUSD: 60.5,
		tallas: [
			"S",
			"M",
			"L"
		],
		descuento: 25,
		descripcion: "Camiseta y pantalón oficiales de los equipos de fútbol de la universidad."
	},
	{
		id: "prod-105",
		nombre: "Mochila UCJC",
		categoria: "material",
		precioEUR: 29.9,
		precioUSD: 32.89,
		tallas: [],
		descuento: 15,
		descripcion: "Mochila con compartimento acolchado para portátil y bolsillos laterales."
	},
	{
		id: "prod-106",
		nombre: "Cuaderno A4",
		categoria: "material",
		precioEUR: 4.5,
		precioUSD: 4.95,
		tallas: [],
		descripcion: "Cuaderno de tapa dura con 120 hojas cuadriculadas."
	},
	{
		id: "prod-107",
		nombre: "Taza de graduación",
		categoria: "regalos",
		precioEUR: 9.95,
		precioUSD: 10.95,
		tallas: [],
		descuento: 40,
		descripcion: "Taza de cerámica con diseño conmemorativo, apta para lavavajillas."
	},
	{
		id: "prod-108",
		nombre: "Llavero metálico",
		categoria: "regalos",
		precioEUR: 5,
		precioUSD: 5.5,
		tallas: [],
		descripcion: "Llavero de metal grabado con el escudo de la universidad."
	}
], r = "\n  :host {\n    --azul: #1e3a8a;\n    --azul-claro: #3b82f6;\n    --gris: #f3f4f6;\n    --borde: #e5e7eb;\n    --texto: #111827;\n    display: block;\n    font-family: system-ui, sans-serif;\n    color: var(--texto);\n  }\n\n  * { box-sizing: border-box; }\n\n  /* ---------- Barra superior: usuario | buscador | carrito ---------- */\n  .barra-superior {\n    display: grid;\n    grid-template-columns: 160px 1fr 160px;\n    align-items: center;\n    gap: 1rem;\n    padding: 1rem;\n    background: var(--azul);\n  }\n  .lateral { display: flex; align-items: center; min-height: 2.5rem; }\n  .lateral-izq { justify-content: flex-start; }\n  .lateral-der { justify-content: flex-end; }\n  .hueco {\n    padding: .5rem .9rem;\n    border: 1px dashed rgba(255, 255, 255, .6);\n    border-radius: 6px;\n    color: white;\n    font-size: .9rem;\n  }\n  .barra-busqueda {\n    display: flex;\n    gap: .5rem;\n    max-width: 640px;\n    width: 100%;\n    margin: 0 auto;\n  }\n  .barra-busqueda input {\n    flex: 1;\n    padding: .6rem .8rem;\n    border: none;\n    border-radius: 6px;\n    font-size: 1rem;\n  }\n  .barra-busqueda button {\n    padding: .6rem 1rem;\n    border: none;\n    border-radius: 6px;\n    background: var(--azul-claro);\n    color: white;\n    font-weight: 600;\n    cursor: pointer;\n  }\n\n  .subbarra {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: .5rem 1rem;\n    padding: .6rem 1rem;\n    background: #eff6ff;\n    border-bottom: 1px solid var(--borde);\n  }\n  .estado-sesion { font-size: .9rem; color: #374151; }\n  .controles-subbarra { display: flex; align-items: center; flex-wrap: wrap; gap: .5rem 1rem; }\n\n  /* ---------- Black Friday ---------- */\n  .btn-bf {\n    padding: .7rem 1.15rem;\n    border: 2px solid #d9c6ff;\n    border-radius: 10px;\n    background: linear-gradient(120deg, #15151f 0%, #35306e 55%, #764d95 100%);\n    color: #ffffff;\n    font-weight: 800;\n    font-size: .95rem;\n    letter-spacing: .5px;\n    cursor: pointer;\n    box-shadow: 0 4px 12px rgba(53, 48, 110, .3);\n    transition: transform .2s, box-shadow .2s;\n  }\n  .btn-bf::before {\n    content: \"⚡ \";\n    color: #f4d45a;\n  }\n  .btn-bf:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 18px rgba(53, 48, 110, .4);\n  }\n  .btn-bf[aria-pressed=\"true\"] {\n    border-color: #f4d45a;\n    color: #f4d45a;\n  }\n\n  .banner-bf {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 1rem;\n    margin: .75rem 1rem;\n    padding: 1.5rem;\n    border-radius: 14px;\n    background: linear-gradient(120deg, #15151f 0%, #35306e 55%, #764d95 100%);\n    color: #ffffff;\n    box-shadow: 0 5px 18px rgba(53, 48, 110, .25);\n  }\n  .banner-bf[hidden], .tab-ofertas[hidden] { display: none; }\n  .banner-bf p {\n    margin: 0;\n    color: #eae1ff;\n    font-weight: 600;\n  }\n  .btn-ver-ofertas {\n    padding: .75rem 1.25rem;\n    border: none;\n    border-radius: 9px;\n    background: #ffffff;\n    color: #28204d;\n    font-weight: 800;\n    cursor: pointer;\n    transition: background .2s, transform .2s;\n  }\n  .btn-ver-ofertas:hover {\n    background: #f4d45a;\n    transform: translateY(-2px);\n  }\n  .btn-ver-ofertas[aria-pressed=\"true\"] {\n    background: #f4d45a;\n    color: #15151f;\n  }\n\n  .tab-ofertas {\n    font-weight: 700;\n    color: #b91c1c;\n  }\n  .tab-ofertas[aria-pressed=\"true\"] { border-bottom-color: #b91c1c; }\n\n  .imagen { position: relative; }\n  .insignia-oferta {\n    position: absolute;\n    top: .5rem;\n    left: .5rem;\n    padding: .2rem .5rem;\n    border-radius: 4px;\n    background: #dc2626;\n    color: white;\n    font-size: .8rem;\n    font-weight: 700;\n  }\n  .precio-antes { color: #6b7280; font-weight: 400; font-size: .9em; }\n  .precio-oferta { color: #dc2626; }\n  .solo-lector {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    overflow: hidden;\n    clip: rect(0 0 0 0);\n    white-space: nowrap;\n  }\n  .selector-moneda { display:flex; align-items:center; gap:.5rem; }\n  .selector-moneda button { padding:.5rem .85rem; border:1px solid var(--azul); border-radius:6px; background:white; color:var(--azul); cursor:pointer; font-weight:600; }\n  .selector-moneda button[aria-pressed=\"true\"] { background:var(--azul); color:white; }\n\n  /* ---------- Navegación por categorías ---------- */\n  .navegacion {\n    display: flex;\n    gap: .25rem;\n    overflow-x: auto;\n    padding: 0 1rem;\n    background: white;\n    border-bottom: 1px solid var(--borde);\n  }\n  .navegacion button {\n    padding: .8rem 1rem;\n    border: none;\n    border-bottom: 3px solid transparent;\n    background: none;\n    font-size: .95rem;\n    cursor: pointer;\n    white-space: nowrap;\n  }\n  .navegacion button[aria-current=\"true\"] {\n    border-bottom-color: var(--azul-claro);\n    color: var(--azul);\n    font-weight: 600;\n  }\n\n  /* ---------- Cuerpo: filtros + productos ---------- */\n  .cuerpo {\n    display: grid;\n    grid-template-columns: 220px 1fr;\n    gap: 1.5rem;\n    padding: 1rem;\n  }\n\n  .filtros {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n  }\n  .filtros h3 {\n    margin: 0 0 .5rem;\n    font-size: .9rem;\n    text-transform: uppercase;\n    color: #6b7280;\n  }\n  .filtros label { display: block; margin: .25rem 0; cursor: pointer; }\n  .filtros select, .filtros input[type=\"range\"] { width: 100%; }\n  .tallas { display: flex; flex-wrap: wrap; gap: .35rem; }\n  .tallas button {\n    min-width: 2.5rem;\n    padding: .35rem;\n    border: 1px solid var(--borde);\n    border-radius: 4px;\n    background: white;\n    cursor: pointer;\n  }\n  .tallas button[aria-pressed=\"true\"] {\n    background: var(--azul);\n    border-color: var(--azul);\n    color: white;\n  }\n  .limpiar {\n    padding: .5rem;\n    border: 1px solid var(--borde);\n    border-radius: 6px;\n    background: white;\n    cursor: pointer;\n  }\n\n  .cabecera-resultados {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 1rem;\n  }\n  .cabecera-resultados p { margin: 0; color: #6b7280; }\n\n  .rejilla {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n    gap: 1rem;\n  }\n  .tarjeta {\n    display: flex;\n    flex-direction: column;\n    border: 1px solid var(--borde);\n    border-radius: 8px;\n    overflow: hidden;\n    background: white;\n  }\n  .imagen {\n    aspect-ratio: 1;\n    display: grid;\n    place-items: center;\n    background: var(--gris);\n    color: #94a3b8;\n    overflow: hidden;\n  }\n  .imagen svg { width: 42%; height: auto; }\n  .imagen img { width: 100%; height: 100%; object-fit: cover; }\n  .modal-imagen { aspect-ratio: auto; height: 150px; border-radius: 8px; }\n  .modal-imagen svg { width: auto; height: 60%; }\n  .tarjeta .info { padding: .75rem; display: flex; flex-direction: column; gap: .4rem; flex: 1; }\n  .tarjeta h4 { margin: 0; font-size: 1rem; }\n  .tarjeta .precio { font-weight: 700; color: var(--azul); }\n  .tarjeta .acciones { display: flex; gap: .4rem; margin-top: auto; }\n  .tarjeta .acciones button {\n    flex: 1;\n    padding: .5rem;\n    border-radius: 6px;\n    cursor: pointer;\n    font-size: .85rem;\n  }\n  .btn-ver { border: 1px solid var(--azul); background: white; color: var(--azul); }\n  .btn-anadir { border: none; background: var(--azul); color: white; }\n\n  /* ---------- Talla en la tarjeta ---------- */\n  .selector-talla { display: flex; flex-wrap: wrap; gap: .3rem; }\n  .selector-talla button {\n    min-width: 2.2rem;\n    padding: .3rem .4rem;\n    border: 1px solid var(--borde);\n    border-radius: 4px;\n    background: white;\n    font-size: .8rem;\n    cursor: pointer;\n  }\n  .selector-talla button[aria-pressed=\"true\"] {\n    background: var(--azul);\n    border-color: var(--azul);\n    color: white;\n  }\n  .error-talla {\n    margin: 0;\n    font-size: .85rem;\n    font-weight: 600;\n    color: #b91c1c;\n  }\n  .error-talla[hidden] { display: none; }\n  .tarjeta.falta-talla { border-color: #b91c1c; }\n  .tarjeta.falta-talla .selector-talla button { border-color: #b91c1c; }\n\n  /* ---------- Filtros activos ---------- */\n  .chips { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: .75rem; }\n  .chips[hidden], .nota-talla[hidden] { display: none; }\n  .chip {\n    display: inline-flex;\n    align-items: center;\n    gap: .35rem;\n    padding: .3rem .65rem;\n    border: 1px solid var(--azul-claro);\n    border-radius: 999px;\n    background: #eff6ff;\n    color: var(--azul);\n    font-size: .85rem;\n    cursor: pointer;\n  }\n  .chip:hover { background: #dbeafe; }\n  .nota-talla { margin: 0 0 .75rem; font-size: .85rem; color: #6b7280; }\n  .btn-limpiar-vacio {\n    margin-top: .5rem;\n    padding: .5rem 1rem;\n    border: 1px solid var(--azul);\n    border-radius: 6px;\n    background: white;\n    color: var(--azul);\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .vacio { grid-column: 1 / -1; }\n  .vacio p { margin: 0; }\n\n  .vacio { padding: 2rem; text-align: center; color: #6b7280; }\n\n  button:focus-visible, input:focus-visible, select:focus-visible {\n    outline: 2px solid var(--azul-claro);\n    outline-offset: 2px;\n  }\n\n  /* ---------- Móvil: los filtros pasan arriba ---------- */\n  .btn-filtros { display: none; }\n\n  @media (max-width: 700px) {\n    .cuerpo { grid-template-columns: 1fr; gap: 1rem; }\n    .btn-filtros {\n      display: block;\n      padding: .6rem;\n      border: 1px solid var(--azul);\n      border-radius: 6px;\n      background: white;\n      color: var(--azul);\n      font-weight: 600;\n      cursor: pointer;\n    }\n    .btn-filtros[aria-expanded=\"true\"] { background: var(--azul); color: white; }\n    .filtros { display: none; }\n    .filtros.abierto { display: flex; }\n    .barra-superior { grid-template-columns: 1fr 1fr; }\n    .barra-busqueda { grid-column: 1 / -1; grid-row: 2; }\n  }\n\n  /* ---------- Ventana Modal (Detalle de Producto) ---------- */\n  .modal-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    background: rgba(0, 0, 0, 0.5); /* Fondo sombreado en segundo plano */\n    display: grid;\n    place-items: center;\n    z-index: 1000;\n  }\n\n  .modal-contenido {\n    background: white;\n    padding: 2rem;\n    border-radius: 12px;\n    max-width: 500px;\n    width: 90%;\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .modal-contenido h3 {\n    margin: 0;\n    color: var(--azul);\n    font-size: 1.5rem;\n  }\n\n  .modal-contenido .precio {\n    font-size: 1.2rem;\n    font-weight: 700;\n    color: var(--azul);\n  }\n\n  .modal-contenido { max-height: 90vh; overflow-y: auto; outline: none; }\n  .modal-contenido p { margin: 0; }\n  .modal-contenido .descripcion { color: #4b5563; line-height: 1.5; }\n  .acciones-modal { display: flex; gap: .5rem; margin-top: .5rem; }\n  .acciones-modal button {\n    flex: 1;\n    padding: .65rem;\n    border-radius: 6px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .btn-anadir-modal { border: none; background: var(--azul); color: white; }\n  .acciones-modal .btn-cerrar-modal {\n    margin-top: 0;\n    border: 1px solid var(--azul);\n    background: white;\n    color: var(--azul);\n  }\n\n  .btn-cerrar-modal {\n    margin-top: 1rem;\n    padding: 0.6rem;\n    background: var(--azul);\n    color: white;\n    border: none;\n    border-radius: 6px;\n    cursor: pointer;\n    font-weight: 600;\n  }\n\n", i = "viewBox=\"0 0 64 64\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"", a = {
	ropa: `<svg ${i}><path d="M22 10 8 20l6 9 6-4v29h24V25l6 4 6-9-14-10c-2 5-18 5-20 0Z"/></svg>`,
	deporte: `<svg ${i}><circle cx="32" cy="32" r="22"/><path d="M32 22l9 6.5-3.5 10.5h-11L23 28.5ZM32 22V10M41 28.5l11-3.5M37.5 39l6.5 9M26.5 39 20 48M23 28.5 12 25"/></svg>`,
	material: `<svg ${i}><rect x="16" y="10" width="32" height="44" rx="3"/><path d="M24 10v44M30 22h12M30 30h12M30 38h12"/></svg>`,
	regalos: `<svg ${i}><rect x="12" y="26" width="40" height="26" rx="2"/><rect x="10" y="18" width="44" height="8" rx="2"/><path d="M32 18v34M32 18c-6-10-14-8-10 0M32 18c6-10 14-8 10 0"/></svg>`
};
function o(e, t) {
	return e.imagen ? `<img src="${t(e.imagen)}" alt="${t(e.nombre)}" loading="lazy" />` : a[e.categoria] || a.material;
}
// src/main.js
var s = "ucjc:descubrimiento:anadir-al-carrito@1", c = "ucjc:identidad:sesion-cambiada@1", l = "ucjc:descubrimiento:campana-cambiada@1", u = {
	codigo: "black-friday-2026",
	etiqueta: "Black Friday UCJC"
}, d = Math.max(0, ...n.map((e) => e.descuento || 0)), f = {
	EUR: 60,
	USD: 70
}, p = 250, m = 4500, h = [
	"relevancia",
	"precio-asc",
	"precio-desc",
	"nombre"
], g = (e) => String(e).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(), _ = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, v = (e) => String(e).replace(/[&<>"']/g, (e) => _[e]), y = "\n  .aviso {\n    position: fixed;\n    bottom: 1.5rem;\n    left: 50%;\n    transform: translate(-50%, 1rem);\n    padding: .75rem 1.25rem;\n    border-radius: 8px;\n    color: white;\n    font-weight: 600;\n    box-shadow: 0 6px 20px rgba(0, 0, 0, .2);\n    opacity: 0;\n    pointer-events: none;\n    transition: opacity .25s, transform .25s;\n    z-index: 2000;\n  }\n  .aviso.visible { opacity: 1; transform: translate(-50%, 0); }\n  @media (prefers-reduced-motion: reduce) {\n    .aviso { transition: none; }\n  }\n  .aviso.anadido { background: #15803d; }\n", b = "\n  .tab-favoritos { color: #b91c1c; font-weight: 700; }\n  .navegacion .tab-favoritos[aria-current=\"true\"] { border-bottom-color: #b91c1c; color: #b91c1c; }\n\n  .btn-favorito {\n    position: absolute;\n    top: .5rem;\n    right: .5rem;\n    z-index: 1;\n    display: grid;\n    place-items: center;\n    width: 2.6rem;\n    height: 2.6rem;\n    border: 1px solid #e5e7eb;\n    border-radius: 50%;\n    background: white;\n    color: #374151;\n    box-shadow: 0 2px 6px rgba(0, 0, 0, .15);\n    font-size: 1.5rem;\n    cursor: pointer;\n  }\n  .btn-favorito[aria-pressed=\"true\"] {\n    background: #fff1f2;\n    border-color: #fda4af;\n    color: #be123c;\n  }\n  .btn-favorito:hover { border-color: #be123c; }\n\n  .btn-favorito-modal {\n    border: 1px solid #be123c;\n    background: white;\n    color: #be123c;\n  }\n  .btn-favorito-modal[aria-pressed=\"true\"] {\n    background: #fff1f2;\n  }\n  .aviso.error { background: #b91c1c; }\n  .aviso.favorito { background: #1e3a8a; }\n", x = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this.estado = this.estadoInicial();
	}
	estadoInicial() {
		return {
			busqueda: "",
			busquedaTexto: "",
			campanaActiva: !1,
			soloOfertas: !1,
			soloFavoritos: !1,
			favoritos: [],
			categoria: "todo",
			precioMax: f.EUR,
			moneda: "EUR",
			tallas: [],
			orden: "relevancia",
			productoSeleccionado: null,
			usuarioActivo: null,
			listaProductos: n.map((e) => ({
				...e,
				tallas: [...e.tallas]
			})),
			tallaElegida: {}
		};
	}
	claveFavoritos() {
		let e = this.estado.usuarioActivo?.id;
		return e == null || !String(e).trim() ? null : `ucjc:descubrimiento-B:favoritos:${encodeURIComponent(String(e))}`;
	}
	cargarFavoritos() {
		let e = this.claveFavoritos();
		if (!e) return [];
		try {
			let t = JSON.parse(window.localStorage.getItem(e) || "[]"), n = new Set(this.estado.listaProductos.map((e) => e.id));
			return Array.isArray(t) ? [...new Set(t.filter((e) => typeof e == "string" && n.has(e)))] : [];
		} catch {
			return [];
		}
	}
	guardarFavoritos() {
		let e = this.claveFavoritos();
		if (e) try {
			window.localStorage.setItem(e, JSON.stringify(this.estado.favoritos));
		} catch {}
	}
	botonFavorito(e, t = !1) {
		let n = this.estado.favoritos.includes(e.id), r = n ? "Quitar de favoritos" : "Añadir a favoritos", i = `type="button" data-accion="favorito" data-id="${v(e.id)}" aria-pressed="${n}" aria-label="${r}: ${v(e.nombre)}"`;
		return t ? `<button class="btn-favorito-modal" ${i}>${n ? "♥ Quitar favorito" : "♡ Añadir a favoritos"}</button>` : `<button class="btn-favorito" ${i}>${n ? "♥" : "♡"}</button>`;
	}
	alternarFavorito(e) {
		if (!this.claveFavoritos()) {
			this.mostrarAviso("Inicio de sesión necesario para añadir a favoritos", "error");
			return;
		}
		let t = this.estado.favoritos.includes(e.id);
		this.estado.favoritos = t ? this.estado.favoritos.filter((t) => t !== e.id) : [...this.estado.favoritos, e.id], this.guardarFavoritos(), this.pintarProductos(), this.estado.productoSeleccionado && this.actualizarModal(), this.mostrarAviso(`${t ? "Eliminado de favoritos" : "Añadido a favoritos"}: ${e.nombre}`, "favorito");
	}
	mostrarFavoritos() {
		if (!this.claveFavoritos()) {
			this.mostrarAviso("Inicio de sesión necesario para ver tus favoritos", "error");
			return;
		}
		let e = !this.estado.soloFavoritos;
		this.estado.soloFavoritos = e, e && (this.estado.categoria = "todo", this.estado.soloOfertas = !1, this.estado.busqueda = "", this.estado.busquedaTexto = "", this.estado.precioMax = f[this.estado.moneda], this.estado.tallas = []), this.aplicarEstadoAControles(), this.pintarProductos();
	}
	precioOriginal(e, t = this.estado.moneda) {
		return t === "USD" ? e.precioUSD : e.precioEUR;
	}
	enOferta(e) {
		return this.estado.campanaActiva && e.descuento > 0;
	}
	precioProducto(e, t = this.estado.moneda) {
		let n = this.precioOriginal(e, t);
		return this.enOferta(e) ? Math.round(n * (100 - e.descuento)) / 100 : n;
	}
	htmlPrecio(e) {
		let t = this.formatearPrecio(this.precioProducto(e));
		return this.enOferta(e) ? `<s class="precio-antes"><span class="solo-lector">Antes </span>${this.formatearPrecio(this.precioOriginal(e))}</s> <span class="precio-oferta"><span class="solo-lector">Ahora </span>${t}</span>` : t;
	}
	insigniaOferta(e) {
		return this.enOferta(e) ? `<span class="insignia-oferta">-${e.descuento}%</span>` : "";
	}
	formatearPrecio(e) {
		let t = this.estado.moneda === "USD" ? "en-US" : "es-ES";
		return new Intl.NumberFormat(t, {
			style: "currency",
			currency: this.estado.moneda
		}).format(e);
	}
	connectedCallback() {
		this.estado = {
			...this.estadoInicial(),
			usuarioActivo: this.estado.usuarioActivo
		}, this.estado.favoritos = this.cargarFavoritos(), this.pintarEstructura(), this.conectarEventos(), this.escucharSesion(), this.leerUrl(), this.aplicarEstadoAControles(), this.pintarProductos(), this.emitirCampana();
	}
	disconnectedCallback() {
		window.removeEventListener(c, this.alCambiarSesion), clearTimeout(this.temporizadorBusqueda), clearTimeout(this.temporizadorAviso);
	}
	escucharSesion() {
		this.alCambiarSesion = (e) => {
			let { autenticado: t = !1, usuario: n = null } = e.detail || {};
			this.estado.usuarioActivo = t && n?.id != null && String(n.id).trim() ? n : null, this.estado.favoritos = this.cargarFavoritos(), this.estado.usuarioActivo || (this.estado.soloFavoritos = !1), this.actualizarBarraSesion(), this.aplicarEstadoAControles(), this.pintarProductos();
		}, window.addEventListener(c, this.alCambiarSesion);
	}
	pintarEstructura() {
		this.shadowRoot.innerHTML = `
      <style>${r}${y}${b}</style>

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
          <button type="button" class="btn-bf" aria-pressed="false">${u.etiqueta}</button>
          <div class="selector-moneda" role="group" aria-label="Seleccionar moneda">
            <span>Moneda:</span>
            <button type="button" data-moneda="EUR" aria-pressed="true">€ EUR</button>
            <button type="button" data-moneda="USD" aria-pressed="false">$ USD</button>
          </div>
        </div>
      </div>
      <div class="banner-bf" hidden>
        <p><strong>${u.etiqueta}</strong>: hasta -${d}% en artículos seleccionados</p>
        <button type="button" class="btn-ver-ofertas" aria-pressed="false">Ver ofertas</button>
      </div>

      <nav class="navegacion" aria-label="Categorías">
        <button type="button" class="tab-ofertas" aria-pressed="false" hidden>Ofertas</button>
        <button data-categoria="todo" aria-current="true">Todo</button>
        ${e.map((e) => `<button data-categoria="${e.id}">${e.nombre}</button>`).join("")}
        <button type="button" class="tab-favoritos" aria-current="false">♡ Favoritos</button>
      </nav>

      <div class="cuerpo">
        <button type="button" class="btn-filtros" aria-expanded="false" aria-controls="panel-filtros">Filtros</button>
        <aside class="filtros" id="panel-filtros" aria-label="Filtros">
          <section>
            <h3>Precio máximo: <span class="valor-precio">${this.formatearPrecio(this.estado.precioMax)}</span></h3>
            <input type="range" name="precio" min="0" max="${f.EUR}" step="5" value="${f.EUR}" aria-label="Precio máximo" />
          </section>
          <section>
            <h3>Talla</h3>
            <div class="tallas">
              ${t.map((e) => `<button type="button" data-talla="${e}" aria-pressed="false">${e}</button>`).join("")}
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
    `, this.actualizarBarraSesion(), this.actualizarModal();
	}
	actualizarBarraSesion() {
		let e = this.shadowRoot.querySelector("#sesion-container"), t = this.estado.usuarioActivo;
		e.textContent = t ? `Sesión iniciada: ${t.nombre || t.email || t.id}` : "Navegando como invitado";
	}
	actualizarModal() {
		let e = this.shadowRoot.querySelector("#modal-container"), t = this.estado.productoSeleccionado;
		t ? (e.innerHTML = `
      <div class="modal-overlay" data-accion="cerrar">
        <div class="modal-contenido" role="dialog" aria-modal="true" aria-labelledby="modal-titulo" tabindex="-1" data-producto="${v(t.id)}">
          <div class="imagen modal-imagen">${o(t, v)}${this.insigniaOferta(t)}</div>
          <h3 id="modal-titulo">${v(t.nombre)}</h3>
          <p class="precio">${this.htmlPrecio(t)}</p>
          ${t.descripcion ? `<p class="descripcion">${v(t.descripcion)}</p>` : ""}
          <p><strong>Categoría:</strong> ${v(this.nombreCategoria(t.categoria))}</p>
          ${t.tallas.length ? `
                <div>
                  <strong>Talla:</strong>
                  <div class="selector-talla" role="group" aria-label="Talla de ${v(t.nombre)}">
                    ${this.botonesTalla(t)}
                  </div>
                </div>
              ` : "<p><strong>Talla:</strong> única</p>"}
          <p class="error-talla" role="alert" hidden></p>
          <div class="acciones-modal">
            <button type="button" class="btn-anadir-modal" data-accion="anadir" data-id="${v(t.id)}" aria-label="Añadir ${v(t.nombre)} al carrito">Añadir al carrito</button>
            ${this.botonFavorito(t, !0)}
            <button type="button" class="btn-cerrar-modal" data-accion="cerrar">Cerrar</button>
          </div>
        </div>
      </div>
    `, e.querySelector(".modal-contenido").focus()) : e.innerHTML = "";
	}
	botonesTalla(e) {
		return e.tallas.map((t) => `<button type="button" data-accion="talla" data-id="${v(e.id)}" data-talla="${t}" aria-pressed="${this.estado.tallaElegida[e.id] === t}">${t}</button>`).join("");
	}
	abrirModal(e, t) {
		this.elementoPrevio = t, this.estado.productoSeleccionado = { ...e }, this.actualizarModal();
	}
	cerrarModal() {
		this.estado.productoSeleccionado = null, this.actualizarModal(), this.elementoPrevio && this.elementoPrevio.isConnected && this.elementoPrevio.focus(), this.elementoPrevio = null;
	}
	teclaEnModal(e) {
		if (!this.estado.productoSeleccionado) return;
		if (e.key === "Escape") {
			e.preventDefault(), this.cerrarModal();
			return;
		}
		if (e.key !== "Tab") return;
		let t = this.shadowRoot.querySelector(".modal-contenido"), n = [...t.querySelectorAll("button")], r = n[0], i = n[n.length - 1], a = this.shadowRoot.activeElement;
		e.shiftKey && (a === r || a === t) ? (e.preventDefault(), i.focus()) : !e.shiftKey && a === i && (e.preventDefault(), r.focus());
	}
	conectarEventos() {
		let e = this.shadowRoot;
		e.querySelector(".selector-moneda").addEventListener("click", (t) => {
			let n = t.target.closest("button[data-moneda]");
			if (!n || n.dataset.moneda === this.estado.moneda) return;
			let r = this.estado.precioMax / f[this.estado.moneda];
			this.estado.moneda = n.dataset.moneda;
			let i = f[this.estado.moneda];
			this.estado.precioMax = r >= 1 ? i : Math.min(i, Math.round(r * i / 5) * 5), e.querySelectorAll(".selector-moneda button").forEach((e) => e.setAttribute("aria-pressed", String(e.dataset.moneda === this.estado.moneda)));
			let a = e.querySelector("input[name=\"precio\"]");
			a.max = i, a.value = this.estado.precioMax, e.querySelector(".valor-precio").textContent = this.formatearPrecio(this.estado.precioMax), this.pintarProductos(), this.actualizarModal();
		});
		let t = e.querySelector(".barra-busqueda"), n = () => {
			clearTimeout(this.temporizadorBusqueda), this.estado.busquedaTexto = t.q.value.trim(), this.estado.busqueda = g(t.q.value), this.pintarProductos();
		};
		t.q.addEventListener("input", () => {
			clearTimeout(this.temporizadorBusqueda), this.temporizadorBusqueda = setTimeout(n, p);
		}), t.addEventListener("submit", (e) => {
			e.preventDefault(), n();
		}), e.querySelector(".navegacion").addEventListener("click", (e) => {
			let t = e.target.closest("[data-categoria]");
			t && this.cambiarCategoria(t.dataset.categoria), e.target.closest(".tab-favoritos") && this.mostrarFavoritos();
		}), e.querySelector(".btn-bf").addEventListener("click", () => this.fijarCampana(!this.estado.campanaActiva));
		let r = () => this.fijarSoloOfertas(!this.estado.soloOfertas);
		e.querySelector(".tab-ofertas").addEventListener("click", r), e.querySelector(".btn-ver-ofertas").addEventListener("click", r), e.querySelector("input[name=\"precio\"]").addEventListener("input", (t) => {
			this.estado.precioMax = Number(t.target.value), e.querySelector(".valor-precio").textContent = this.formatearPrecio(this.estado.precioMax), this.pintarProductos();
		}), e.querySelector(".tallas").addEventListener("click", (e) => {
			let t = e.target.closest("[data-talla]");
			if (!t) return;
			let n = t.dataset.talla, r = this.estado.tallas.includes(n);
			this.estado.tallas = r ? this.estado.tallas.filter((e) => e !== n) : [...this.estado.tallas, n], t.setAttribute("aria-pressed", String(!r)), this.pintarProductos();
		}), e.querySelector("select[name=\"orden\"]").addEventListener("change", (e) => {
			this.estado.orden = e.target.value, this.pintarProductos();
		}), e.querySelector(".limpiar").addEventListener("click", () => this.limpiarFiltros()), e.querySelector(".chips").addEventListener("click", (e) => {
			let t = e.target.closest("[data-quitar]");
			t && this.quitarFiltro(t.dataset.quitar, t.dataset.valor);
		});
		let i = e.querySelector(".btn-filtros");
		i.addEventListener("click", () => {
			let t = e.querySelector(".filtros").classList.toggle("abierto");
			i.setAttribute("aria-expanded", String(t));
		}), e.querySelector(".rejilla").addEventListener("click", (e) => {
			let t = e.target.closest("button[data-accion]");
			if (t) {
				if (t.dataset.accion === "limpiar") this.limpiarFiltros();
				else if (t.dataset.accion === "catalogo") this.cambiarCategoria("todo");
				else if (t.dataset.accion === "ver") {
					let e = this.estado.listaProductos.find((e) => e.id === t.dataset.id);
					e && this.abrirModal(e, t);
				} else this.accionProducto(t, t.closest(".tarjeta"));
			}
		}), e.querySelector("#modal-container").addEventListener("click", (e) => {
			let t = e.target.closest("button[data-accion]");
			t && t.dataset.accion !== "cerrar" ? this.accionProducto(t, t.closest(".modal-contenido")) : (t || e.target.classList.contains("modal-overlay")) && this.cerrarModal();
		}), e.addEventListener("keydown", (e) => this.teclaEnModal(e));
	}
	accionProducto(e, t) {
		let n = this.estado.listaProductos.find((t) => t.id === e.dataset.id);
		if (n && t) {
			if (e.dataset.accion === "favorito") this.alternarFavorito(n);
			else if (e.dataset.accion === "talla" && this.elegirTalla(n, e.dataset.talla), e.dataset.accion === "anadir") {
				if (this.necesitaTalla(n)) {
					this.mostrarErrorTalla(t);
					return;
				}
				this.anadirAlCarrito(n), this.estado.productoSeleccionado && this.cerrarModal();
			}
		}
	}
	fijarCampana(e) {
		this.estado.campanaActiva = e, e || (this.estado.soloOfertas = !1), this.aplicarEstadoAControles(), this.pintarProductos(), this.emitirCampana();
	}
	fijarSoloOfertas(e) {
		this.estado.soloFavoritos = !1, this.estado.soloOfertas = this.estado.campanaActiva && e, this.aplicarEstadoAControles(), this.pintarProductos();
	}
	emitirCampana() {
		window.dispatchEvent(new CustomEvent(l, { detail: {
			activa: this.estado.campanaActiva,
			codigo: u.codigo,
			etiqueta: u.etiqueta,
			momento: (/* @__PURE__ */ new Date()).toISOString()
		} }));
	}
	cambiarCategoria(e) {
		this.estado.categoria = e, this.estado.soloFavoritos = !1, this.aplicarEstadoAControles(), this.pintarProductos();
	}
	limpiarFiltros() {
		clearTimeout(this.temporizadorBusqueda);
		let { listaProductos: e, usuarioActivo: t, tallaElegida: n, campanaActiva: r, favoritos: i, soloFavoritos: a } = this.estado;
		this.estado = {
			...this.estadoInicial(),
			listaProductos: e,
			usuarioActivo: t,
			tallaElegida: n,
			campanaActiva: r,
			favoritos: i,
			soloFavoritos: a
		}, this.aplicarEstadoAControles(), this.pintarProductos();
	}
	nombreCategoria(t) {
		let n = e.find((e) => e.id === t);
		return n ? n.nombre : t;
	}
	coincideBusqueda(t, n) {
		let r = e.find((e) => e.id === t.categoria), i = g(`${t.nombre} ${r ? r.nombre : ""}`);
		return n.split(/\s+/).every((e) => i.includes(e));
	}
	cumpleFiltros(e, t = !1) {
		let { busqueda: n, categoria: r, precioMax: i, tallas: a } = this.estado;
		return (r === "todo" || e.categoria === r) && (!this.estado.soloOfertas || this.enOferta(e)) && this.precioProducto(e) <= i && (!n || this.coincideBusqueda(e, n)) && (t || a.length === 0 || a.some((t) => e.tallas.includes(t)));
	}
	productosFiltrados() {
		let { orden: e, listaProductos: t } = this.estado, n = t.filter((e) => this.cumpleFiltros(e) && (!this.estado.soloFavoritos || this.estado.favoritos.includes(e.id)));
		return e === "precio-asc" && n.sort((e, t) => this.precioProducto(e) - this.precioProducto(t)), e === "precio-desc" && n.sort((e, t) => this.precioProducto(t) - this.precioProducto(e)), e === "nombre" && n.sort((e, t) => e.nombre.localeCompare(t.nombre)), n;
	}
	pintarProductos() {
		let e = this.productosFiltrados(), t = this.shadowRoot;
		t.querySelector(".contador").textContent = this.estado.soloFavoritos ? `${e.length} favorito${e.length === 1 ? "" : "s"}` : `${e.length} producto${e.length === 1 ? "" : "s"}`, this.pintarChips(), this.pintarNotaTalla(), t.querySelector(".rejilla").innerHTML = e.length ? e.map((e) => `
          <article class="tarjeta" data-producto="${v(e.id)}">
            <div class="imagen">${o(e, v)}${this.insigniaOferta(e)}${this.botonFavorito(e)}</div>
            <div class="info">
              <h4>${v(e.nombre)}</h4>
              <span class="precio">${this.htmlPrecio(e)}</span>
              ${e.tallas.length ? `
                    <div class="selector-talla" role="group" aria-label="Talla de ${v(e.nombre)}">
                      ${this.botonesTalla(e)}
                    </div>
                  ` : ""}
              <p class="error-talla" role="alert" hidden></p>
              <div class="acciones">
                <button class="btn-ver" data-accion="ver" data-id="${e.id}" aria-label="Ver detalles de ${v(e.nombre)}">Ver</button>
                <button class="btn-anadir" data-accion="anadir" data-id="${e.id}" aria-label="Añadir ${v(e.nombre)} al carrito">Añadir</button>
              </div>
            </div>
          </article>
        `).join("") : `
          <div class="vacio">
            <p>${this.estado.soloFavoritos ? this.estado.favoritos.length ? "No hay favoritos con estos filtros." : "Todavía no tienes productos favoritos." : "No hay productos con estos filtros."}</p>
            ${this.estado.soloFavoritos && !this.estado.favoritos.length ? "<button type=\"button\" class=\"btn-limpiar-vacio\" data-accion=\"catalogo\">Ver catálogo</button>" : "<button type=\"button\" class=\"btn-limpiar-vacio\" data-accion=\"limpiar\">Limpiar filtros</button>"}
          </div>
        `;
	}
	pintarChips() {
		let { busquedaTexto: e, categoria: t, precioMax: n, tallas: r, moneda: i } = this.estado, a = [];
		this.estado.busqueda && a.push({
			quitar: "busqueda",
			texto: `Búsqueda: ${e}`
		}), this.estado.soloOfertas && a.push({
			quitar: "ofertas",
			texto: "Solo ofertas"
		}), t !== "todo" && a.push({
			quitar: "categoria",
			texto: this.nombreCategoria(t)
		}), n < f[i] && a.push({
			quitar: "precio",
			texto: `Hasta ${this.formatearPrecio(n)}`
		}), r.forEach((e) => a.push({
			quitar: "talla",
			valor: e,
			texto: `Talla ${e}`
		}));
		let o = this.shadowRoot.querySelector(".chips");
		o.hidden = a.length === 0, o.innerHTML = a.map((e) => `
      <button type="button" class="chip" data-quitar="${e.quitar}" data-valor="${v(e.valor || "")}" aria-label="Quitar filtro: ${v(e.texto)}">
        ${v(e.texto)} <span aria-hidden="true">&times;</span>
      </button>
    `).join("");
	}
	pintarNotaTalla() {
		let e = this.shadowRoot.querySelector(".nota-talla"), t = this.estado.tallas.length ? this.estado.listaProductos.filter((e) => !e.tallas.length && this.cumpleFiltros(e, !0)).length : 0;
		e.hidden = t === 0, e.textContent = t ? `${t} producto${t === 1 ? "" : "s"} de talla única no se muestra${t === 1 ? "" : "n"} con el filtro de talla.` : "";
	}
	quitarFiltro(e, t) {
		let n = this.shadowRoot;
		e === "busqueda" && (n.querySelector("input[name=\"q\"]").value = "", this.estado.busqueda = "", this.estado.busquedaTexto = "", this.pintarProductos()), e === "categoria" && this.cambiarCategoria("todo"), e === "ofertas" && this.fijarSoloOfertas(!1), e === "precio" && (this.estado.precioMax = f[this.estado.moneda], n.querySelector("input[name=\"precio\"]").value = this.estado.precioMax, n.querySelector(".valor-precio").textContent = this.formatearPrecio(this.estado.precioMax), this.pintarProductos()), e === "talla" && (this.estado.tallas = this.estado.tallas.filter((e) => e !== t), n.querySelector(`.tallas [data-talla="${t}"]`)?.setAttribute("aria-pressed", "false"), this.pintarProductos());
	}
	necesitaTalla(e) {
		return e.tallas.length ? !e.tallas.includes(this.estado.tallaElegida[e.id]) : !1;
	}
	elegirTalla(e, t) {
		this.estado.tallaElegida[e.id] === t ? delete this.estado.tallaElegida[e.id] : this.estado.tallaElegida[e.id] = t;
		let n = this.estado.tallaElegida[e.id], r = this.shadowRoot;
		r.querySelectorAll(`[data-accion="talla"][data-id="${e.id}"]`).forEach((e) => e.setAttribute("aria-pressed", String(e.dataset.talla === n))), r.querySelectorAll(`[data-producto="${e.id}"]`).forEach((e) => this.ocultarErrorTalla(e));
	}
	mostrarErrorTalla(e) {
		e.classList.add("falta-talla");
		let t = e.querySelector(".error-talla");
		t.textContent = "Selecciona una talla", t.hidden = !1, e.querySelector("[data-accion=\"talla\"]")?.focus();
	}
	ocultarErrorTalla(e) {
		e.classList.remove("falta-talla");
		let t = e.querySelector(".error-talla");
		t.textContent = "", t.hidden = !0;
	}
	anadirAlCarrito(e) {
		window.dispatchEvent(new CustomEvent(s, { detail: {
			productoId: e.id,
			nombre: e.nombre,
			precio: this.precioProducto(e, "EUR"),
			cantidad: 1
		} }));
		let t = this.estado.tallaElegida[e.id];
		this.mostrarAviso(`Producto añadido: ${e.nombre}${t ? ` (talla ${t})` : ""}, ${this.formatearPrecio(this.precioProducto(e))}`, "anadido");
	}
	mostrarAviso(e, t) {
		let n = this.shadowRoot.querySelector(".aviso");
		n.textContent = e, n.className = `aviso ${t} visible`, clearTimeout(this.temporizadorAviso), this.temporizadorAviso = setTimeout(() => n.classList.remove("visible"), m);
	}
	leerUrl() {
		let n;
		try {
			n = new URLSearchParams(window.location.search);
		} catch {
			return;
		}
		let r = this.estado, i = n.get("desc_moneda");
		i && f[i] && (r.moneda = i), r.precioMax = f[r.moneda];
		let a = Number(n.get("desc_pmax"));
		n.has("desc_pmax") && Number.isFinite(a) && (r.precioMax = Math.min(f[r.moneda], Math.max(0, a)));
		let o = n.get("desc_cat");
		o && e.some((e) => e.id === o) && (r.categoria = o), r.busquedaTexto = (n.get("desc_q") || "").trim(), r.busqueda = g(r.busquedaTexto), r.tallas = (n.get("desc_tallas") || "").split(",").filter((e) => t.includes(e));
		let s = n.get("desc_orden");
		h.includes(s) && (r.orden = s), r.campanaActiva = n.get("desc_bf") === "1", r.soloOfertas = r.campanaActiva && n.get("desc_ofertas") === "1";
	}
	aplicarEstadoAControles() {
		let e = this.shadowRoot, t = this.estado;
		e.querySelector("input[name=\"q\"]").value = t.busquedaTexto, e.querySelectorAll(".navegacion [data-categoria]").forEach((e) => e.setAttribute("aria-current", String(!t.soloFavoritos && e.dataset.categoria === t.categoria))), e.querySelector(".tab-favoritos").setAttribute("aria-current", String(t.soloFavoritos)), e.querySelector(".btn-bf").setAttribute("aria-pressed", String(t.campanaActiva)), e.querySelector(".banner-bf").hidden = !t.campanaActiva, e.querySelector(".tab-ofertas").hidden = !t.campanaActiva, e.querySelector(".tab-ofertas").setAttribute("aria-pressed", String(t.soloOfertas));
		let n = e.querySelector(".btn-ver-ofertas");
		n.setAttribute("aria-pressed", String(t.soloOfertas)), n.textContent = t.soloOfertas ? "Ver todo el catálogo" : "Ver ofertas", e.querySelectorAll(".selector-moneda button").forEach((e) => e.setAttribute("aria-pressed", String(e.dataset.moneda === t.moneda)));
		let r = e.querySelector("input[name=\"precio\"]");
		r.max = f[t.moneda], r.value = t.precioMax, e.querySelector(".valor-precio").textContent = this.formatearPrecio(t.precioMax), e.querySelectorAll(".tallas button").forEach((e) => e.setAttribute("aria-pressed", String(t.tallas.includes(e.dataset.talla)))), e.querySelector("select[name=\"orden\"]").value = t.orden;
	}
};
customElements.get("ucjc-descubrimiento") || customElements.define("ucjc-descubrimiento", x);
var S = {
	nombre: "descubrimiento",
	version: "0.1.5"
};
export { s as EVENTO_ANADIR_AL_CARRITO, l as EVENTO_CAMPANA_CAMBIADA, c as EVENTO_SESION_CAMBIADA, S as default };
