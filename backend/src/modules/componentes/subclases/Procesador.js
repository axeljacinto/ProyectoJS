import { Componente } from '../Componente.js';

export class Procesador extends Componente {
  #socket;
  #nucleos;
  #hilos;
  #frecuenciaGhz;
  #consumoWatts;
  #graficosIntegrados;

  constructor(datos) {
    super({ ...datos, tipo: 'Procesador' });
    const esp = datos.especificaciones || {};
    this.#socket = esp.socket;
    this.#nucleos = Number(esp.nucleos || 0);
    this.#hilos = Number(esp.hilos || 0);
    this.#frecuenciaGhz = Number(esp.frecuenciaGhz || 0);
    this.#consumoWatts = Number(esp.consumoWatts || 0);
    this.#graficosIntegrados = Boolean(esp.graficosIntegrados);
    this.validarEspecificaciones();
  }

  get socket() { return this.#socket; }
  get nucleos() { return this.#nucleos; }
  get hilos() { return this.#hilos; }
  get frecuenciaGhz() { return this.#frecuenciaGhz; }
  get consumoWatts() { return this.#consumoWatts; }
  get graficosIntegrados() { return this.#graficosIntegrados; }

  validarEspecificaciones() {
    if (!this.especificaciones?.socket) {
      throw new Error('El procesador requiere especificar el socket.');
    }
  }

  esCompatibleCon(otroComponente) {
    if (otroComponente?.tipo === 'PlacaMadre') {
      return this.#socket.toLowerCase() === otroComponente.socket.toLowerCase();
    }
    return true;
  }

  obtenerEspecificaciones() {
    return {
      socket: this.#socket,
      nucleos: this.#nucleos,
      hilos: this.#hilos,
      frecuenciaGhz: this.#frecuenciaGhz,
      consumoWatts: this.#consumoWatts,
      graficosIntegrados: this.#graficosIntegrados,
    };
  }
}

