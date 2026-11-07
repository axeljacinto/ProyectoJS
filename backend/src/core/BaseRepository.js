/**
 * BaseRepository - Clase abstracta base para repositorios de persistencia.
 * Impone el desacople entre Prisma y el modelo de dominio mediante hidratación.
 */
export class BaseRepository {
  constructor() {
    if (new.target === BaseRepository) {
      throw new Error('BaseRepository es una clase abstracta y no puede ser instanciada directamente.');
    }
  }

  /**
   * Transforma una fila de la base de datos en una instancia de la clase de dominio.
   * @param {Object} row 
   * @returns {Object} Instancia de la clase de dominio.
   */
  hidratar(row) {
    throw new Error('Método abstracto hidratar(row) no implementado.');
  }

  /**
   * Transforma una entidad de dominio en un objeto plano listo para Prisma.
   * @param {Object} entidad 
   * @returns {Object}
   */
  aPersistencia(entidad) {
    throw new Error('Método abstracto aPersistencia(entidad) no implementado.');
  }
}

