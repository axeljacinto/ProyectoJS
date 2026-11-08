import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Cpu, ShoppingBag, Shield, LogOut, User, Sparkles, Sun, Moon } from 'lucide-react';

export function Navbar({ theme, onToggleTheme }) {
  const { usuario, logout, esRol } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const esRutaActiva = (ruta) => location.pathname === ruta;

  return (
    <nav className="site-nav sticky top-0 z-50 border-b px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo de Marca */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
            <Cpu className="w-5 h-5 text-black" />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight flex items-center gap-1">
              <span className="text-white font-black">PC</span>
              <span className="text-cyan-400 font-black">
                Builder
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/80 font-bold ml-1">
                3D
              </span>
            </div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Gestor de Hardware
            </span>
          </div>
        </Link>

        {/* Navegación Principal */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              esRutaActiva('/')
                ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Escena 3D</span>
          </Link>

          <Link
            to="/catalogo"
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              esRutaActiva('/catalogo')
                ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Catálogo Completo</span>
          </Link>

          {esRol('VENDEDOR', 'ADMIN') && (
            <Link
              to="/admin/componentes"
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                location.pathname.startsWith('/admin/componentes')
                  ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gestión Inventario</span>
            </Link>
          )}

          {esRol('ADMIN') && (
            <Link
              to="/admin/usuarios"
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                esRutaActiva('/admin/usuarios')
                  ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Usuarios</span>
            </Link>
          )}
        </div>

        {/* Sección de Autenticación */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800"
            title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="hidden xl:inline">{theme === 'light' ? 'Modo claro' : 'Modo oscuro'}</span>
          </button>

          {usuario ? (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
                <div className="w-6 h-6 rounded-lg bg-cyan-500 flex items-center justify-center text-black font-extrabold text-[11px]">
                  {usuario.nombre.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-100 leading-none">
                    {usuario.nombre}
                  </div>
                  <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">
                    {usuario.rol}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-900 border border-transparent hover:border-rose-900/40 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                Ingresar
              </Link>
              <Link
                to="/registro"
                className="text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg transition-colors"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
