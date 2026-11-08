/**
 * piezas.config.js
 * Configuración maestra de piezas 3D de la PC.
 * Sincronizada 1:1 con los slugs de la base de datos PostgreSQL.
 * Define posiciones ordenadas y sin superposición tanto en estado armado como desarmado.
 */
export const PIEZAS_PC = [
  {
    slug: 'gabinete',
    etiqueta: 'Gabinete ATX & Cristal Templado',
    color: '#00f2fe',
    badge: 'Chasis & Estructura',
    // Posición montada dentro de la PC
    posicionArmada: [0, 0, 0],
    // Posición desarmada en cuadrante posterior izquierdo
    posicionExplosionada: [-3.6, 0.8, -1.5],
    descripcion: 'Chasis semitorre con panel de cristal templado y flujo de aire optimizado',
  },
  {
    slug: 'placa-madre',
    etiqueta: 'Placa Madre (Motherboard)',
    color: '#38bdf8',
    badge: 'Columna Vertebral',
    // Montada en el fondo del gabinete
    posicionArmada: [-0.6, 0.4, 0],
    // Centro neurálgico del despiece
    posicionExplosionada: [0, 0.5, 0],
    descripcion: 'Placa base ATX con disipadores VRM, PCIe blindado y chipset de alto rendimiento',
  },
  {
    slug: 'procesador',
    etiqueta: 'Procesador (CPU)',
    color: '#38bdf8',
    badge: 'Cerebro del Sistema',
    // Instalado en el socket LGA
    posicionArmada: [-0.54, 0.75, 0.3],
    // Eyectado al frente sobre la placa
    posicionExplosionada: [0, 1.9, 2.3],
    descripcion: 'Unidad Central de Procesamiento de alta frecuencia con difusor de cobre niquelado',
  },
  {
    slug: 'refrigeracion',
    etiqueta: 'Refrigeración Líquida AIO',
    color: '#00f2fe',
    badge: 'Disipación Térmica',
    // Sobre el CPU y radiador arriba
    posicionArmada: [-0.99, 0.4, 0],
    // Elevada ordenadamente en la parte superior
    posicionExplosionada: [0, 3.6, 0.8],
    descripcion: 'Sistema líquido con bloque de bomba RGB infinito y radiador dual de 240mm',
  },
  {
    slug: 'ram',
    etiqueta: 'Memoria RAM DDR5',
    color: '#a855f7',
    badge: 'Ultra Alta Velocidad',
    // En las ranuras DIMM
    posicionArmada: [-0.52, 0.9, -0.65],
    // Cuadrante superior derecho
    posicionExplosionada: [3.3, 2.2, 0.8],
    descripcion: 'Kit dual channel de módulos de alto rendimiento con difusor térmico y barra RGB',
  },
  {
    slug: 'gpu',
    etiqueta: 'Tarjeta Gráfica Dedicada (GPU)',
    color: '#00f2fe',
    badge: 'Potencia Gráfica',
    // En la ranura PCIe central
    posicionArmada: [-0.26, 0.93, -0.4],
    // Frente inferior centrado
    posicionExplosionada: [0, -1.4, 2.6],
    descripcion: 'Acelerador gráfico con sistema de doble ventilador, backplate y disipador de cobre',
  },
  {
    slug: 'almacenamiento',
    etiqueta: 'Almacenamiento SSD M.2 NVMe',
    color: '#ec4899',
    badge: 'Lectura / Escritura Rápida',
    // Debajo del socket
    posicionArmada: [-0.5, 0.02, -0.1],
    // Cuadrante inferior derecho
    posicionExplosionada: [3.1, -0.8, 1.2],
    descripcion: 'Unidad de estado sólido NVMe ultrarrápida con disipador ranurado de aluminio',
  },
  {
    slug: 'fuente',
    etiqueta: 'Fuente de Poder (PSU 80+)',
    color: '#eab308',
    badge: 'Energía Certificada',
    // En el compartimento inferior
    posicionArmada: [0, -1.35, -0.5],
    // Cuadrante inferior izquierdo
    posicionExplosionada: [-3.2, -1.8, 0.8],
    descripcion: 'Suministro de energía modular de alta eficiencia con certificación 80 Plus y ventilador silencioso',
  },
];
