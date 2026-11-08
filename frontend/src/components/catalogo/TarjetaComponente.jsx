import { Link } from 'react-router-dom';
import { Cpu, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export function TarjetaComponente({ componente }) {
  const formatearPrecio = (precio, moneda = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: moneda,
    }).format(precio);
  };

  const getStockBadge = () => {
    if (componente.stock === 0) {
      return (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-400 bg-rose-950/70 px-2.5 py-0.5 rounded-full border border-rose-800/80">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
          <span>Agotado</span>
        </span>
      );
    }
    if (componente.tieneStockBajo) {
      return (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-800/80">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span>Bajo stock ({componente.stock})</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-800/80">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Disponible ({componente.stock})</span>
      </span>
    );
  };

  return (
    <Link
      to={`/componentes/${componente.id}`}
      aria-label={`Ver detalles de ${componente.nombre}`}
      className="group rounded-2xl glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between"
    >
      {/* Contenedor de Imagen con Overlay y Badges */}
      <div className="relative h-52 w-full bg-slate-900 overflow-hidden flex items-center justify-center p-5 border-b border-slate-800/70">
        {componente.imagenUrl ? (
          <img
            src={componente.imagenUrl}
            alt={componente.nombre}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-500">
            <Cpu className="w-10 h-10" />
          </div>
        )}

        {/* Badge de Marca Flotante */}
        {componente.marca && (
          <span className="absolute top-3 left-3 bg-[#070a12]/85 text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-lg text-cyan-300 border border-slate-700/80">
            {componente.marca.nombre}
          </span>
        )}

        {/* Tipo de Hardware */}
        <span className="absolute top-3 right-3 bg-slate-900/80 text-[10px] font-bold text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60">
          {componente.tipo}
        </span>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-slate-400 font-semibold tracking-wider">
              {componente.sku}
            </span>
            {getStockBadge()}
          </div>

          <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            {componente.nombre}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {componente.descripcion || 'Sin descripción adicional disponible.'}
          </p>
        </div>

        {/* Pie de Tarjeta: Precio y Botón de Detalle */}
        <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Precio Oficial
            </span>
            <span className="text-xl font-black text-cyan-400">
              {formatearPrecio(componente.precio, componente.moneda)}
            </span>
          </div>

          <span className="p-2.5 rounded-xl bg-slate-800/80 text-cyan-400 border border-slate-700/60 group-hover:bg-cyan-500 group-hover:text-black transition-colors flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
