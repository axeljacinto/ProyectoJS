import { Link } from 'react-router-dom';
import { EscenaPC } from '../three/EscenaPC';
import { PIEZAS_PC } from '../three/piezas.config';
import { Cpu, ArrowRight, Layers, ShieldCheck, Zap, Server, Activity, Sparkles, Box } from 'lucide-react';

export function Inicio() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-20">
      {/* Hero Section Modernizado */}
      <div className="relative text-center space-y-6 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-400 text-xs font-bold shadow-lg shadow-cyan-500/10 animate-float">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Experiencia 3D Interactiva • Modelo Real Despiezado</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Ensambla, Explora y Gestiona tu{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            PC de Alto Rendimiento
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Catálogo integral de componentes con simulación 3D en tiempo real. Examina el hardware ensamblado, desarma cada pieza en una vista ordenada y accede directamente a sus especificaciones técnicas.
        </p>

        {/* Live Stats Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span><strong className="text-white">8</strong> Categorías Sincronizadas</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <Server className="w-3.5 h-3.5 text-sky-400" />
            <span><strong className="text-white">PostgreSQL</strong> + Prisma ORM</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span><strong className="text-white">POO Estricta</strong> con Campos Privados #</span>
          </div>
        </div>
      </div>

      {/* Escena 3D Principal con Modelo Real */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Box className="w-5 h-5 text-cyan-400" />
              <span>Simulador y Despiece 3D de la PC</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Haz clic en la torre armada para activar el despiece ordenado sin colisiones
            </p>
          </div>
        </div>

        <EscenaPC />
      </section>

      {/* Galería de Categorías 2D (Respaldo Accesible y Navegación Rápida) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Categorías de Hardware</h2>
            <p className="text-xs text-slate-400 mt-1">Explora los componentes disponibles según cada tipo de pieza</p>
          </div>
          <Link
            to="/catalogo"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {PIEZAS_PC.map((pieza) => (
            <Link
              key={pieza.slug}
              to={`/catalogo?categoria=${pieza.slug}`}
              className="group p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                    style={{ backgroundColor: `${pieza.color}20`, color: pieza.color }}
                  >
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {pieza.badge}
                  </span>
                </div>

                <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-400 transition-colors">
                  {pieza.etiqueta}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  {pieza.descripcion}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold group-hover:text-cyan-300 transition-colors pt-2 border-t border-slate-800/60">
                <span>Explorar modelos</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Características del Sistema (Seguridad, POO, 3D) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-900">
        <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base mb-1.5">Seguridad Robusta & Roles</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Autenticación JWT en cookies httpOnly, contraseñas hasheadas con bcryptjs, protección contra fuerza bruta y autorización basada en permisos granulares.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 hover:border-sky-500/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-sky-400 mb-4 shadow-lg shadow-sky-500/10">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base mb-1.5">POO Estricta en JavaScript</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Clases abstractas simuladas, campos estrictamente privados con #, 8 subclases de hardware con polimorfismo, hidratación y fábricas desacopladas.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 hover:border-purple-500/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 mb-4 shadow-lg shadow-purple-500/10">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base mb-1.5">Three.js + React Three Fiber</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Renderizado 3D en tiempo real con iluminación PBR, control orbital en 360 grados y animación de despiece sincronizada con el catálogo.
          </p>
        </div>
      </section>
    </div>
  );
}
