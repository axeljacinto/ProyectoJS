import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/cliente';
import { Users, Shield } from 'lucide-react';

export function GestionUsuarios() {
  const queryClient = useQueryClient();
  const [pagina, setPagina] = useState(1);

  const { data: res, isLoading } = useQuery({
    queryKey: ['admin-usuarios', pagina],
    queryFn: () => api.get(`/usuarios?pagina=${pagina}&limite=20`),
  });

  const mutationRol = useMutation({
    mutationFn: ({ id, rol }) => api.patch(`/usuarios/${id}/rol`, { rol }),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-usuarios']);
    },
    onError: (err) => {
      alert(err.error?.mensaje || 'Error al cambiar rol');
    },
  });

  const handleCambiarRol = (id, nuevoRol) => {
    mutationRol.mutate({ id, rol: nuevoRol });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-cyan-400" />
          <span>Gestión de Usuarios y Roles</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Solo el Administrador puede promover usuarios y asignar permisos especiales.
        </p>
      </div>

      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="glass rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Usuario</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Estado</th>
                <th className="px-5 py-3.5">Rol Actual</th>
                <th className="px-5 py-3.5 text-right">Modificar Rol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {res?.data?.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4 font-bold text-white">
                    {u.nombreCompleto}
                  </td>
                  <td className="px-5 py-4 text-slate-300 font-mono text-[11px]">
                    {u.email}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.activo ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' : 'bg-rose-950/80 text-rose-400 border border-rose-800'}`}>
                      {u.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-800 text-cyan-400 border border-slate-700">
                      {u.rol}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <select
                      value={u.rol}
                      onChange={(e) => handleCambiarRol(u.id, e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    >
                      <option value="CLIENTE">CLIENTE</option>
                      <option value="VENDEDOR">VENDEDOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

