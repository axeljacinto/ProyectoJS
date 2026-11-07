import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children, rolesPermitidos = [] }) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario.rol)) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 glass rounded-2xl text-center">
        <h2 className="text-xl font-bold text-rose-400 mb-2">Acceso Denegado</h2>
        <p className="text-sm text-slate-400 mb-6">
          Tu rol ({usuario.rol}) no tiene los permisos suficientes para ver esta sección.
        </p>
        <a
          href="/catalogo"
          className="inline-block px-4 py-2 bg-slate-800 text-cyan-400 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors"
        >
          Volver al Catálogo
        </a>
      </div>
    );
  }

  return children;
}

