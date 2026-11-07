import { Search, Filter, RotateCcw, Tag, DollarSign, Layers } from 'lucide-react';

export function Filtros({
  filtros,
  onCambiarFiltro,
  onLimpiarFiltros,
  categorias = [],
  marcas = [],
}) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-6 shadow-xl sticky top-24">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>Filtrar Componentes</span>
        </h3>
        <button
          onClick={onLimpiarFiltros}
          className="text-xs font-semibold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
          title="Restablecer todos los filtros"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Limpiar</span>
        </button>
      </div>

      {/* Buscador de Hardware */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Búsqueda Textual</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={filtros.q || ''}
            onChange={(e) => onCambiarFiltro('q', e.target.value)}
            placeholder="Ej. RTX 4070, Ryzen, DDR5..."
            className="w-full bg-[#0a0f1d] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* Selector de Categorías (Sincronizado con 3D) */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Categoría de Hardware</span>
        </label>
        <select
          value={filtros.categoria || ''}
          onChange={(e) => onCambiarFiltro('categoria', e.target.value)}
          className="w-full bg-[#0a0f1d] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
        >
          <option value="">Todas las Categorías</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Selector de Marca */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-cyan-400" />
          <span>Marca / Fabricante</span>
        </label>
        <select
          value={filtros.marca || ''}
          onChange={(e) => onCambiarFiltro('marca', e.target.value)}
          className="w-full bg-[#0a0f1d] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
        >
          <option value="">Todas las Marcas</option>
          {marcas.map((m) => (
            <option key={m.id} value={m.nombre}>
              {m.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Rango de Precios */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
          <span>Rango de Precio (USD)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-[11px] text-slate-500 font-bold">$</span>
            <input
              type="number"
              value={filtros.precioMin || ''}
              onChange={(e) => onCambiarFiltro('precioMin', e.target.value)}
              placeholder="Mín"
              min="0"
              className="w-full bg-[#0a0f1d] border border-slate-700/80 rounded-xl pl-6 pr-2.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-[11px] text-slate-500 font-bold">$</span>
            <input
              type="number"
              value={filtros.precioMax || ''}
              onChange={(e) => onCambiarFiltro('precioMax', e.target.value)}
              placeholder="Máx"
              min="0"
              className="w-full bg-[#0a0f1d] border border-slate-700/80 rounded-xl pl-6 pr-2.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Criterio de Ordenamiento */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <label className="text-xs font-bold text-slate-300">Ordenar Resultados</label>
        <select
          value={filtros.orden || 'id_desc'}
          onChange={(e) => onCambiarFiltro('orden', e.target.value)}
          className="w-full bg-[#0a0f1d] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
        >
          <option value="id_desc">Más Recientes Primero</option>
          <option value="precio_asc">Precio: Menor a Mayor</option>
          <option value="precio_desc">Precio: Mayor a Menor</option>
          <option value="nombre_asc">Nombre: A - Z</option>
        </select>
      </div>
    </div>
  );
}
