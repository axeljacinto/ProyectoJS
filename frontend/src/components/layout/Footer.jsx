import { Github, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer border-t py-10 px-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <div className="font-bold text-slate-300">
            PCBuilder 3D • Gestor de Catálogo de Componentes
          </div>
          <p className="text-slate-400 text-[11px]">
            Programación Intermedia • POO en JavaScript (ES Modules) • Three.js • PostgreSQL • Prisma ORM
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
          <a
            href="https://github.com/v4nish03/ProyectoJS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Ver proyecto en GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
            Seguridad: <strong className="text-cyan-400">JWT httpOnly</strong>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
            Gráficos: <strong className="text-sky-400">React Three Fiber</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
