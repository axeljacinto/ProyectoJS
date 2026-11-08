import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { componentesApi, categoriasApi, marcasApi } from '../api';
import { TarjetaComponente } from '../components/catalogo/TarjetaComponente';
import { Filtros } from '../components/catalogo/Filtros';
import { Paginacion } from '../components/catalogo/Paginacion';
import { Cpu, AlertCircle, ShoppingBag, Sparkles } from 'lucide-react';

export function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Estados locales de filtros inicializados desde la URL
  const [filtros, setFiltros] = useState({
    categoria: searchParams.get('categoria') || '',
    marca: searchParams.get('marca') || '',
    q: searchParams.get('q') || '',
    precioMin: searchParams.get('precioMin') || '',
    precioMax: searchParams.get('precioMax') || '',
    orden: searchParams.get('orden') || 'id_desc',
    pagina: Number(searchParams.get('pagina')) || 1,
  });

  // Mantener filtros sincronizados con cambios en searchParams (ej. clic en 3D)
  useEffect(() => {
    const categoriaUrl = searchParams.get('categoria') || '';
    if (categoriaUrl !== filtros.categoria) {
      setFiltros(prev => ({ ...prev, categoria: categoriaUrl, pagina: 1 }));
    }
  }, [searchParams]);

  // Cargar categorías y marcas para los selectores
  const { data: resCategorias } = useQuery({
    queryKey: ['categorias'],
    queryFn: () => categoriasApi.listar(),
  });

  const { data: resMarcas } = useQuery({
    queryKey: ['marcas'],
    queryFn: () => marcasApi.listar(),
  });

  // Query principal de componentes con caché y recarga automática
  const { data: resComponentes, isLoading, isError, error } = useQuery({
    queryKey: ['componentes', filtros],
    queryFn: () => componentesApi.listar(
      Object.fromEntries(
        Object.entries(filtros).filter(([, valor]) => valor !== '' && valor !== null && valor !== undefined)
      )
    ),
    keepPreviousData: true,
  });

  const handleCambiarFiltro = (campo, valor) => {
    const nuevosFiltros = { ...filtros, [campo]: valor, pagina: 1 };
    setFiltros(nuevosFiltros);

    // Actualizar searchParams de la URL
    const params = new URLSearchParams();
    Object.entries(nuevosFiltros).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  const handleLimpiarFiltros = () => {
    const reset = {
      categoria: '',
      marca: '',
      q: '',
      precioMin: '',
      precioMax: '',
      orden: 'id_desc',
      pagina: 1,
    };
    setFiltros(reset);
    setSearchParams({});
  };

  const handleCambiarPagina = (nuevaPagina) => {
    setFiltros(prev => ({ ...prev, pagina: nuevaPagina }));
    const params = new URLSearchParams(searchParams);
    params.set('pagina', nuevaPagina);
    setSearchParams(params);
  };

  // Encontrar el nombre de la categoría activa si existe
  const categoriaActivaObj = resCategorias?.data?.find(
    c => c.slug === filtros.categoria
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Cabecera del Catálogo */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                {categoriaActivaObj ? categoriaActivaObj.nombre : 'Catálogo de Hardware'}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {categoriaActivaObj
                  ? categoriaActivaObj.descripcion
                  : 'Explora todos los componentes en stock con filtrado reactivo por categoría, marca y precio.'}
              </p>
            </div>
          </div>
        </div>

        {resComponentes?.meta && (
          <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            Total en inventario: <strong className="text-cyan-400 font-extrabold">{resComponentes.meta.total}</strong> componentes
          </div>
        )}
      </div>

      {/* Contenido en 2 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        {/* Barra lateral de filtros */}
        <aside className="lg:col-span-1">
          <Filtros
            filtros={filtros}
            onCambiarFiltro={handleCambiarFiltro}
            onLimpiarFiltros={handleLimpiarFiltros}
            categorias={resCategorias?.data || []}
            marcas={resMarcas?.data || []}
          />
        </aside>

        {/* Grilla de productos */}
        <main className="lg:col-span-3 space-y-6">
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-slate-400 font-medium">Cargando componentes...</span>
            </div>
          ) : isError ? (
            <div className="p-6 rounded-3xl glass-panel border border-rose-500/40 text-center text-rose-300 flex items-center justify-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span>{error?.error?.mensaje || 'Error al conectar con el servidor'}</span>
            </div>
          ) : resComponentes?.data?.length === 0 ? (
            <div className="p-16 rounded-3xl glass-panel border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto">
                <Cpu className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-200">No se encontraron componentes</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No hay productos que coincidan con los filtros seleccionados. Intenta restablecer los filtros para ver todo el catálogo.
                </p>
              </div>
              <button
                onClick={handleLimpiarFiltros}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Restablecer todos los filtros
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {resComponentes?.data?.map((componente) => (
                  <TarjetaComponente
                    key={componente.id}
                    componente={componente}
                  />
                ))}
              </div>

              <Paginacion
                paginaActual={resComponentes?.meta?.pagina || 1}
                totalPaginas={resComponentes?.meta?.totalPaginas || 1}
                onCambiarPagina={handleCambiarPagina}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
