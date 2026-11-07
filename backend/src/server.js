import { app } from './app.js';
import { ENV } from './config/env.js';
import { prisma } from './config/prisma.js';

const server = app.listen(ENV.PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${ENV.PORT}`);
  console.log(`📡 Entorno: ${ENV.NODE_ENV}`);
});

// Cierre graceful
process.on('SIGTERM', async () => {
  console.log('Cerrando servidor HTTP y conexiones de base de datos...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Servidor finalizado.');
    process.exit(0);
  });
});

