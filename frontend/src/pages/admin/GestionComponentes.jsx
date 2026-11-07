import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { componentesApi } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, Cpu, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export function GestionComponentes() {
  const { tienePermiso, esRol } = useAuth();
  const queryClient = useQueryClient();
  const [pagina, setPagina] = useState(1);

  const { data: res, isLoading } = useQuery({
    queryKey: ['admin-componentes', pagina],
    queryFn: () => componentesApi.listar({ pagina, limite: 15 }),
  });

  const mutationEliminar = useMutation({
    mutationFn: (id) => componentesApi.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-componentes']);
      queryClient.invalidateQueries(['componentes']);
    },
    onError: (err) => {
      alert(err.error?.mensaje || 'Error al eliminar el componente');
    },
  });

  const handleEliminar = (id, nombre) => {
    if (confirm(`¿Estás seguro de desactivar el componente "${nombre}"?`)) {
      mutationEliminar.mutate(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span>Gestión de Componentes</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Panel para crear, actualizar y desactivar piezas de hardware del catálogo.
          </p>
        </div>

        {tienePermiso('COMPONENTE_CREAR') && (
          <Link
            to="/admin/componentes/nuevo"
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Componente</span>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="glass rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">SKU / Producto</th>
                  <th className="px-5 py-3.5">Tipo</th>
                  <th className="px-5 py-3.5">Marca</th>
                  <th className="px-5 py-3.5">Precio</th>
                  <th className="px-5 py-3.5">Stock</th>
                  <th className="px-5 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {res?.data?.map((comp) => (
                  <tr key={comp.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white text-sm">{comp.nombre}</div>
                      <div className="text-[10px] font-mono text-cyan-400">{comp.sku}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {comp.tipo}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-200">
                      {comp.marca?.nombre || '-'}
                    </td>
                    <td className="px-5 py-4 font-bold text-white">
                      ${comp.precio.toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 font-semibold">
                        {comp.stock === 0 ? (
                          <span className="text-rose-400 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> 0
                          </span>
                        ) : comp.tieneStockBajo ? (
                          <span className="text-amber-400 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> {comp.stock} (Bajo)
                          </span>
                        ) : (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> {comp.stock}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      {tienePermiso('COMPONENTE_EDITAR') && (
                        <Link
                          to={`/admin/componentes/${comp.id}/editar`}
                          className="inline-p-1.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 inline-block transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      {esRol('ADMIN') && (
                        <button
                          onClick={() => handleEliminar(comp.id, comp.nombre)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Eliminar (borrado lógico)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

