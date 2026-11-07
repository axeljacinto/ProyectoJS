export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-[#05070b]/90 backdrop-blur-md py-10 px-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <div className="font-bold text-slate-300">
            PCBuilder 3D • Gestor de Catálogo de Componentes
          </div>
          <p className="text-slate-400 text-[11px]">
            Programación Intermedia • POO en JavaScript (ES Modules) • Three.js • PostgreSQL • Prisma ORM
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
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
