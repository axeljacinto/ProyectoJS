import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 pt-6">
      <button
        onClick={() => onCambiarPagina(paginaActual - 1)}
        disabled={paginaActual <= 1}
        className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-cyan-400 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <span className="text-xs text-slate-400 font-medium">
        Página <span className="text-cyan-400 font-bold">{paginaActual}</span> de{' '}
        <span className="font-bold">{totalPaginas}</span>
      </span>

      <button
        onClick={() => onCambiarPagina(paginaActual + 1)}
        disabled={paginaActual >= totalPaginas}
        className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-cyan-400 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

