import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { componentesApi, categoriasApi, marcasApi } from '../../api';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

const TIPOS_DISPONIBLES = [
  'Procesador',
  'PlacaMadre',
  'MemoriaRam',
  'TarjetaGrafica',
  'Almacenamiento',
  'FuenteDePoder',
  'Gabinete',
  'Refrigeracion',
];

export function FormularioComponente() {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('Procesador');
  const [formData, setFormData] = useState({
    sku: '',
    nombre: '',
    descripcion: '',
    marcaId: '',
    categoriaId: '',
    precio: '',
    stock: '',
    stockMinimo: 5,
    garantiaMeses: 12,
    imagenUrl: '',
    especificaciones: {},
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [guardando, setGuardando] = useState(false);

  const { data: resCategorias } = useQuery({
    queryKey: ['categorias'],
    queryFn: () => categoriasApi.listar(),
  });

  const { data: resMarcas } = useQuery({
    queryKey: ['marcas'],
    queryFn: () => marcasApi.listar(),
  });

  // Si es edición, cargar el componente existente
  useEffect(() => {
    if (esEdicion) {
      componentesApi.obtenerPorId(id).then((res) => {
        if (res.ok && res.data) {
          const comp = res.data;
          setTipo(comp.tipo);
          setFormData({
            sku: comp.sku,
            nombre: comp.nombre,
            descripcion: comp.descripcion || '',
            marcaId: comp.marcaId,
            categoriaId: comp.categoriaId,
            precio: comp.precio,
            stock: comp.stock,
            stockMinimo: comp.stockMinimo,
            garantiaMeses: comp.garantiaMeses,
            imagenUrl: comp.imagenUrl || '',
            especificaciones: comp.especificaciones || {},
          });
        }
      });
    }
  }, [id, esEdicion]);

  const handleGeneralChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEspecChange = (clave, valor) => {
    setFormData((prev) => ({
      ...prev,
      especificaciones: {
        ...prev.especificaciones,
        [clave]: valor,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setGuardando(true);

    try {
      const payload = {
        ...formData,
        tipo,
        marcaId: Number(formData.marcaId),
        categoriaId: Number(formData.categoriaId),
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        stockMinimo: Number(formData.stockMinimo),
        garantiaMeses: Number(formData.garantiaMeses),
      };

      if (esEdicion) {
        await componentesApi.actualizar(id, payload);
      } else {
        await componentesApi.crear(payload);
      }

      navigate('/admin/componentes');
    } catch (err) {
      setErrorMsg(err.error?.mensaje || 'Error al guardar el componente');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <Link
        to="/admin/componentes"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al listado</span>
      </Link>

      <div className="p-8 glass rounded-3xl border border-slate-800 space-y-6">
        <h1 className="text-xl font-bold text-white">
          {esEdicion ? 'Editar Componente' : 'Registrar Nuevo Componente'}
        </h1>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Tipo de Hardware (POO)</label>
              <select
                value={tipo}
                onChange={(e) => {
                  setTipo(e.target.value);
                  setFormData((prev) => ({ ...prev, especificaciones: {} }));
                }}
                disabled={esEdicion}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 disabled:opacity-50"
              >
                {TIPOS_DISPONIBLES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">SKU (Código único)</label>
              <input
                type="text"
                name="sku"
                required
                value={formData.sku}
                onChange={handleGeneralChange}
                placeholder="Ej. CPU-AMD-7800X3D"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 uppercase font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Nombre del Producto</label>
            <input
              type="text"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleGeneralChange}
              placeholder="Ej. AMD Ryzen 7 7800X3D"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Marca</label>
              <select
                name="marcaId"
                required
                value={formData.marcaId}
                onChange={handleGeneralChange}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="">Selecciona una marca</option>
                {resMarcas?.data?.map((m) => (
                  <option key={m.id} value={m.id}>{m.nombre}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Categoría</label>
              <select
                name="categoriaId"
                required
                value={formData.categoriaId}
                onChange={handleGeneralChange}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="">Selecciona una categoría</option>
                {resCategorias?.data?.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Precio (USD)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                name="precio"
                value={formData.precio}
                onChange={handleGeneralChange}
                placeholder="299.99"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Stock Inicial</label>
              <input
                type="number"
                min="0"
                required
                name="stock"
                value={formData.stock}
                onChange={handleGeneralChange}
                placeholder="10"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Stock Mínimo (Alerta)</label>
              <input
                type="number"
                min="0"
                name="stockMinimo"
                value={formData.stockMinimo}
                onChange={handleGeneralChange}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">URL de Imagen</label>
            <input
              type="url"
              name="imagenUrl"
              value={formData.imagenUrl}
              onChange={handleGeneralChange}
              placeholder="https://..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Especificaciones Dinámicas por Tipo */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Especificaciones de {tipo}
            </h3>

            {tipo === 'Procesador' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Socket</label>
                  <input
                    type="text"
                    required
                    value={formData.especificaciones.socket || ''}
                    onChange={(e) => handleEspecChange('socket', e.target.value)}
                    placeholder="LGA1700 / AM5"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Núcleos</label>
                  <input
                    type="number"
                    value={formData.especificaciones.nucleos || ''}
                    onChange={(e) => handleEspecChange('nucleos', Number(e.target.value))}
                    placeholder="8"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Frecuencia (GHz)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.especificaciones.frecuenciaGhz || ''}
                    onChange={(e) => handleEspecChange('frecuenciaGhz', Number(e.target.value))}
                    placeholder="5.0"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>
            )}

            {tipo === 'TarjetaGrafica' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">VRAM (GB)</label>
                  <input
                    type="number"
                    required
                    value={formData.especificaciones.vramGb || ''}
                    onChange={(e) => handleEspecChange('vramGb', Number(e.target.value))}
                    placeholder="12"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tipo VRAM</label>
                  <input
                    type="text"
                    value={formData.especificaciones.tipoVram || 'GDDR6X'}
                    onChange={(e) => handleEspecChange('tipoVram', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Consumo (Watts)</label>
                  <input
                    type="number"
                    value={formData.especificaciones.consumoWatts || ''}
                    onChange={(e) => handleEspecChange('consumoWatts', Number(e.target.value))}
                    placeholder="220"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100"
                  />
                </div>
              </div>
            )}

            {/* Para el resto de tipos se permite edición JSON o campos estándar */}
            {tipo !== 'Procesador' && tipo !== 'TarjetaGrafica' && (
              <p className="text-xs text-slate-500">
                Configurado con valores de fábrica para {tipo}. (Se pueden expandir campos adicionales en el archivo de esquemas).
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            {guardando ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Guardar Componente</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

