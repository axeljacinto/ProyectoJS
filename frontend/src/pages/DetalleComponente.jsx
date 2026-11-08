import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { componentesApi } from '../api';
import { ArrowLeft, CheckCircle, XCircle, ShieldCheck, Box, Award, Sparkles } from 'lucide-react';

export function DetalleComponente() {
  const { id } = useParams();

  const { data: res, isLoading, isError, error } = useQuery({
    queryKey: ['componente', id],
    queryFn: () => componentesApi.obtenerPorId(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs text-slate-400">Cargando especificaciones del hardware...</span>
      </div>
    );
  }

  if (isError || !res?.data) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 glass-panel rounded-3xl text-center space-y-4">
        <h2 className="text-xl font-bold text-rose-400">Componente no encontrado</h2>
        <p className="text-xs text-slate-400">{error?.error?.mensaje || 'El producto solicitado no existe en la base de datos.'}</p>
        <Link to="/catalogo" className="inline-block px-5 py-2.5 bg-slate-800 text-cyan-400 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  const comp = res.data;

  const formatearPrecio = (precio, moneda = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: moneda,
    }).format(precio);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Botón Volver */}
      <Link
        to="/catalogo"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Volver al Catálogo</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Foto / Visualización del Producto */}
        <div className="glass-panel rounded-3xl border border-slate-800/80 p-8 flex items-center justify-center bg-slate-900 overflow-hidden relative">
          {comp.imagenUrl ? (
            <img
              src={comp.imagenUrl}
              alt={comp.nombre}
              className="max-h-[420px] w-auto object-contain rounded-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Box className="w-36 h-36 text-slate-700" />
          )}

          {comp.marca && (
            <span className="absolute top-5 left-5 bg-[#070a12]/90 text-xs uppercase font-extrabold tracking-wider px-3.5 py-1.5 rounded-lg text-cyan-300 border border-slate-700/80">
              {comp.marca.nombre}
            </span>
          )}
        </div>

        {/* Información y especificaciones técnicas */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-800/80 font-bold">
                SKU: {comp.sku}
              </span>
              <span className="text-xs font-bold text-slate-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                {comp.tipo}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {comp.nombre}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {comp.descripcion || 'Sin descripción detallada disponible para este modelo.'}
            </p>
          </div>

          {/* Tarjeta de Precio y Disponibilidad en Inventario */}
          <div className="p-6 glass-panel rounded-3xl border border-slate-800/80 flex items-center justify-between shadow-xl">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-extrabold tracking-wider block">
                Precio de Venta
              </span>
              <span className="text-3xl sm:text-4xl font-black text-cyan-400">
                {formatearPrecio(comp.precio, comp.moneda)}
              </span>
            </div>

            <div className="text-right space-y-1">
              {comp.stock > 0 ? (
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-800/80">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>En stock ({comp.stock} unidades)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 bg-rose-950/70 px-3 py-1 rounded-full border border-rose-800/80">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Actualmente agotado</span>
                </div>
              )}
              <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-400">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>Garantía oficial: <strong>{comp.garantiaMeses} meses</strong></span>
              </div>
            </div>
          </div>

          {/* Especificaciones Técnicas (Dinámicas según Tipo Polimórfico) */}
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Ficha Técnica y Compatibilidad</span>
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {Object.entries(comp.especificaciones || {}).map(([clave, valor]) => (
                <div
                  key={clave}
                  className="p-3.5 rounded-2xl bg-[#0a0f1d] border border-slate-800 flex flex-col justify-center"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {clave.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-slate-100 font-extrabold text-sm mt-0.5">
                    {typeof valor === 'boolean'
                      ? (valor ? 'Sí' : 'No')
                      : Array.isArray(valor)
                      ? valor.join(', ')
                      : String(valor)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
