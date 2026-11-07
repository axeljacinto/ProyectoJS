import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando carga de datos de prueba (Seed)...');

  // 1. Limpieza de datos previos (orden según claves foráneas)
  await prisma.componente.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.marca.deleteMany();
  await prisma.usuario.deleteMany();

  // 2. Creación de usuarios con contraseñas encriptadas
  const passwordComun = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.usuario.create({
    data: {
      nombre: 'Carlos',
      apellido: 'Administrador',
      email: 'admin@pccatalog.com',
      passwordHash: passwordComun,
      rol: 'ADMIN',
    },
  });

  const vendedor = await prisma.usuario.create({
    data: {
      nombre: 'Valeria',
      apellido: 'Vendedora',
      email: 'vendedor@pccatalog.com',
      passwordHash: passwordComun,
      rol: 'VENDEDOR',
    },
  });

  const cliente = await prisma.usuario.create({
    data: {
      nombre: 'Lucas',
      apellido: 'Cliente',
      email: 'cliente@pccatalog.com',
      passwordHash: passwordComun,
      rol: 'CLIENTE',
    },
  });

  console.log('✅ Usuarios creados: Admin, Vendedor, Cliente (Contraseña: Password123!)');

  // 3. Creación de Marcas
  const marcasData = [
    { nombre: 'Intel', paisOrigen: 'EE.UU.', sitioWeb: 'https://intel.com' },
    { nombre: 'AMD', paisOrigen: 'EE.UU.', sitioWeb: 'https://amd.com' },
    { nombre: 'NVIDIA', paisOrigen: 'EE.UU.', sitioWeb: 'https://nvidia.com' },
    { nombre: 'ASUS', paisOrigen: 'Taiwán', sitioWeb: 'https://asus.com' },
    { nombre: 'Corsair', paisOrigen: 'EE.UU.', sitioWeb: 'https://corsair.com' },
    { nombre: 'Kingston', paisOrigen: 'EE.UU.', sitioWeb: 'https://kingston.com' },
    { nombre: 'Samsung', paisOrigen: 'Corea del Sur', sitioWeb: 'https://samsung.com' },
    { nombre: 'Cooler Master', paisOrigen: 'Taiwán', sitioWeb: 'https://coolermaster.com' },
  ];

  const marcasMap = {};
  for (const m of marcasData) {
    const creada = await prisma.marca.create({ data: m });
    marcasMap[m.nombre] = creada.id;
  }
  console.log('✅ Marcas creadas.');

  // 4. Creación de Categorías (Slugs coinciden 1:1 con la Escena 3D)
  const categoriasData = [
    { nombre: 'Procesadores', slug: 'procesador', descripcion: 'CPUs Intel y AMD de alto rendimiento', orden: 1 },
    { nombre: 'Placas Madre', slug: 'placa-madre', descripcion: 'Motherboards para gaming y productividad', orden: 2 },
    { nombre: 'Memorias RAM', slug: 'ram', descripcion: 'Módulos de memoria DDR4 y DDR5', orden: 3 },
    { nombre: 'Tarjetas Gráficas', slug: 'gpu', descripcion: 'GPUs dedicadas para gaming y render', orden: 4 },
    { nombre: 'Almacenamiento', slug: 'almacenamiento', descripcion: 'Unidades SSD M.2 NVMe y discos duros', orden: 5 },
    { nombre: 'Fuentes de Poder', slug: 'fuente', descripcion: 'PSUs certificadas y modulares', orden: 6 },
    { nombre: 'Gabinetes', slug: 'gabinete', descripcion: 'Torres con flujo de aire optimizado', orden: 7 },
    { nombre: 'Refrigeración', slug: 'refrigeracion', descripcion: 'Sistemas líquidos AIO y disipadores de aire', orden: 8 },
  ];

  const categoriasMap = {};
  for (const c of categoriasData) {
    const creada = await prisma.categoria.create({ data: c });
    categoriasMap[c.slug] = creada.id;
  }
  console.log('✅ 8 Categorías creadas sincronizadas con la escena 3D.');

  // 5. Creación de Componentes de muestra
  const componentesData = [
    // Procesadores
    {
      sku: 'CPU-INTEL-14700K',
      nombre: 'Intel Core i7-14700K',
      descripcion: '20 núcleos (8P + 12E) hasta 5.6 GHz LGA1700',
      tipo: 'Procesador',
      marcaId: marcasMap['Intel'],
      categoriaId: categoriasMap['procesador'],
      precio: 409.99,
      stock: 12,
      stockMinimo: 3,
      garantiaMeses: 36,
      imagenUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500',
      especificaciones: { socket: 'LGA1700', nucleos: 20, hilos: 28, frecuenciaGhz: 5.6, consumoWatts: 125, graficosIntegrados: true },
      creadoPorId: admin.id,
    },
    {
      sku: 'CPU-AMD-7800X3D',
      nombre: 'AMD Ryzen 7 7800X3D',
      descripcion: '8 núcleos / 16 hilos con tecnología 3D V-Cache',
      tipo: 'Procesador',
      marcaId: marcasMap['AMD'],
      categoriaId: categoriasMap['procesador'],
      precio: 449.00,
      stock: 8,
      stockMinimo: 2,
      garantiaMeses: 36,
      imagenUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500',
      especificaciones: { socket: 'AM5', nucleos: 8, hilos: 16, frecuenciaGhz: 5.0, consumoWatts: 120, graficosIntegrados: true },
      creadoPorId: admin.id,
    },

    // Placas Madre
    {
      sku: 'MB-ASUS-B650E',
      nombre: 'ASUS ROG STRIX B650E-F Gaming WiFi',
      descripcion: 'Socket AM5, DDR5, PCIe 5.0, WiFi 6E',
      tipo: 'PlacaMadre',
      marcaId: marcasMap['ASUS'],
      categoriaId: categoriasMap['placa-madre'],
      precio: 289.99,
      stock: 10,
      stockMinimo: 3,
      garantiaMeses: 36,
      imagenUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500',
      especificaciones: { socket: 'AM5', formato: 'ATX', chipset: 'B650E', tipoRam: 'DDR5', slotsRam: 4 },
      creadoPorId: admin.id,
    },

    // Memorias RAM
    {
      sku: 'RAM-COR-32GB-6000',
      nombre: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
      descripcion: 'Kit dual channel de alta velocidad optimizado para Intel y AMD',
      tipo: 'MemoriaRam',
      marcaId: marcasMap['Corsair'],
      categoriaId: categoriasMap['ram'],
      precio: 119.99,
      stock: 25,
      stockMinimo: 5,
      garantiaMeses: 60,
      imagenUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500',
      especificaciones: { tipoRam: 'DDR5', capacidadGb: 32, velocidadMhz: 6000, latenciaCl: 30, modulos: 2 },
      creadoPorId: vendedor.id,
    },

    // Tarjetas Gráficas
    {
      sku: 'GPU-ASUS-RTX4070S',
      nombre: 'ASUS Dual GeForce RTX 4070 SUPER 12GB',
      descripcion: 'Arquitectura Ada Lovelace con DLSS 3 y Ray Tracing',
      tipo: 'TarjetaGrafica',
      marcaId: marcasMap['ASUS'],
      categoriaId: categoriasMap['gpu'],
      precio: 599.99,
      stock: 6,
      stockMinimo: 2,
      garantiaMeses: 36,
      imagenUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500',
      especificaciones: { vramGb: 12, tipoVram: 'GDDR6X', consumoWatts: 220, longitudMm: 267, puertos: ['HDMI 2.1', '3x DisplayPort 1.4a'] },
      creadoPorId: admin.id,
    },

    // Almacenamiento
    {
      sku: 'SSD-SAM-990PRO-2TB',
      nombre: 'Samsung 990 PRO NVMe M.2 SSD 2TB',
      descripcion: 'Velocidades de hasta 7450 MB/s de lectura secuencial PCIe 4.0',
      tipo: 'Almacenamiento',
      marcaId: marcasMap['Samsung'],
      categoriaId: categoriasMap['almacenamiento'],
      precio: 179.99,
      stock: 18,
      stockMinimo: 4,
      garantiaMeses: 60,
      imagenUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
      especificaciones: { tipoAlmacenamiento: 'NVMe SSD', capacidadGb: 2000, formato: 'M.2 2280', velocidadLecturaMbps: 7450, velocidadEscrituraMbps: 6900 },
      creadoPorId: vendedor.id,
    },

    // Fuentes de Poder
    {
      sku: 'PSU-COR-RM850X',
      nombre: 'Corsair RM850x 850W 80 Plus Gold Modular',
      descripcion: 'Fuente 100% modular con condensadores japoneses a 105°C',
      tipo: 'FuenteDePoder',
      marcaId: marcasMap['Corsair'],
      categoriaId: categoriasMap['fuente'],
      precio: 139.99,
      stock: 14,
      stockMinimo: 3,
      garantiaMeses: 120,
      imagenUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500',
      especificaciones: { potenciaWatts: 850, certificacion: '80 Plus Gold', modularidad: 'Full-Modular' },
      creadoPorId: vendedor.id,
    },

    // Gabinetes
    {
      sku: 'CAB-COR-4000D',
      nombre: 'Corsair 4000D Airflow Mid-Tower',
      descripcion: 'Panel frontal optimizado para ventilación con vidrio templado',
      tipo: 'Gabinete',
      marcaId: marcasMap['Corsair'],
      categoriaId: categoriasMap['gabinete'],
      precio: 104.99,
      stock: 7,
      stockMinimo: 2,
      garantiaMeses: 24,
      imagenUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=500',
      especificaciones: { formatoSoportado: 'ATX / Micro-ATX / Mini-ITX', ventiladoresIncluidos: 2, color: 'Negro', ventanaLateral: true },
      creadoPorId: admin.id,
    },

    // Refrigeración
    {
      sku: 'COOL-CM-HYPER212',
      nombre: 'Cooler Master Hyper 212 Halo Black',
      descripcion: 'Disipador por aire con ventilador Halo ARGB y 4 heatpipes',
      tipo: 'Refrigeracion',
      marcaId: marcasMap['Cooler Master'],
      categoriaId: categoriasMap['refrigeracion'],
      precio: 44.99,
      stock: 20,
      stockMinimo: 5,
      garantiaMeses: 24,
      imagenUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500',
      especificaciones: { tipoRefrigeracion: 'Aire', tamanoRadiadorMm: null, tdpMaximoWatts: 180, rgb: true },
      creadoPorId: vendedor.id,
    },
  ];

  for (const c of componentesData) {
    await prisma.componente.create({ data: c });
  }

  console.log('✅ Componentes iniciales cargados en la base de datos.');
  console.log('✨ Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

