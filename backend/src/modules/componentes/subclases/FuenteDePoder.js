import { Componente } from '../Componente.js';

export class FuenteDePoder extends Componente {
  #potenciaWatts;
  #certificacion;
  #modularidad;

  constructor(datos) {
    super({ ...datos, tipo: 'FuenteDePoder' });
    const esp = datos.especificaciones || {};
    this.#potenciaWatts = Number(esp.potenciaWatts || 650);
    this.#certificacion = esp.certificacion || '80 Plus Bronze';
    this.#modularidad = esp.modularidad || 'Semi-Modular';
    this.validarEspecificaciones();
  }

  get potenciaWatts() { return this.#potenciaWatts; }
  get certificacion() { return this.#certificacion; }
  get modularidad() { return this.#modularidad; }

  validarEspecificaciones() {
    if (!this.#potenciaWatts || this.#potenciaWatts <= 0) {
      throw new Error('La fuente de poder requiere especificar una potencia en watts válida.');
    }
  }

  obtenerEspecificaciones() {
    return {
      potenciaWatts: this.#potenciaWatts,
      certificacion: this.#certificacion,
      modularidad: this.#modularidad,
    };
  }
}

