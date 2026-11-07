import { Procesador } from './subclases/Procesador.js';
import { PlacaMadre } from './subclases/PlacaMadre.js';
import { MemoriaRam } from './subclases/MemoriaRam.js';
import { TarjetaGrafica } from './subclases/TarjetaGrafica.js';
import { Almacenamiento } from './subclases/Almacenamiento.js';
import { FuenteDePoder } from './subclases/FuenteDePoder.js';
import { Gabinete } from './subclases/Gabinete.js';
import { Refrigeracion } from './subclases/Refrigeracion.js';

export class ComponenteFactory {
  static #catalogoTipos = {
    Procesador,
    PlacaMadre,
    MemoriaRam,
    TarjetaGrafica,
    Almacenamiento,
    FuenteDePoder,
    Gabinete,
    Refrigeracion,
  };

  /**
   * Registra una nueva subclase de Componente dinámicamente.
   */
  static registrar(tipo, clase) {
    this.#catalogoTipos[tipo] = clase;
  }

  /**
   * Devuelve la lista de tipos registrados en la factoría.
   */
  static tiposDisponibles() {
    return Object.keys(this.#catalogoTipos);
  }

  /**
   * Fabrica e hidrata una instancia polimórfica de Componente.
   * @param {string} tipo 
   * @param {Object} datos 
   * @returns {Componente}
   */
  static crear(tipo, datos) {
    // Normalizar capitalización si viene en minúscula
    const matchingKey = Object.keys(this.#catalogoTipos).find(
      k => k.toLowerCase() === tipo?.toLowerCase()
    );

    const ClaseComponente = this.#catalogoTipos[matchingKey];
    if (!ClaseComponente) {
      throw new Error(`Tipo de componente desconocido o no registrado: '${tipo}'. Tipos válidos: ${this.tiposDisponibles().join(', ')}`);
    }

    return new ClaseComponente(datos);
  }
}

