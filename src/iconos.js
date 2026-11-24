// Iconos de línea por categoría. Sirven de imagen mientras el catálogo no tenga fotos reales.
const ATRIBUTOS = 'viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';

const ICONOS = {
  ropa: `<svg ${ATRIBUTOS}><path d="M22 10 8 20l6 9 6-4v29h24V25l6 4 6-9-14-10c-2 5-18 5-20 0Z"/></svg>`,
  deporte: `<svg ${ATRIBUTOS}><circle cx="32" cy="32" r="22"/><path d="M32 22l9 6.5-3.5 10.5h-11L23 28.5ZM32 22V10M41 28.5l11-3.5M37.5 39l6.5 9M26.5 39 20 48M23 28.5 12 25"/></svg>`,
  material: `<svg ${ATRIBUTOS}><rect x="16" y="10" width="32" height="44" rx="3"/><path d="M24 10v44M30 22h12M30 30h12M30 38h12"/></svg>`,
  regalos: `<svg ${ATRIBUTOS}><rect x="12" y="26" width="40" height="26" rx="2"/><rect x="10" y="18" width="44" height="8" rx="2"/><path d="M32 18v34M32 18c-6-10-14-8-10 0M32 18c6-10 14-8 10 0"/></svg>`,
};

// Si el producto trae una foto (campo "imagen") se usa; si no, el icono de su categoría
export function imagenProducto(producto, escapar) {
  if (producto.imagen) {
    return `<img src="${escapar(producto.imagen)}" alt="${escapar(producto.nombre)}" loading="lazy" />`;
  }
  return ICONOS[producto.categoria] || ICONOS.material;
}
