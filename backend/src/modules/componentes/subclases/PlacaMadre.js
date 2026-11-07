import { Componente } from '../Componente.js';

export class PlacaMadre extends Componente {
  #socket;
  #formato;
  #chipset;
  #tipoRam;
  #slotsRam;

  constructor(datos) {
    super({ ...datos, tipo: 'PlacaMadre' });
    const esp = datos.especificaciones || {};
    this.#socket = esp.socket;
    this.#formato = esp.formato || 'ATX';
    this.#chipset = esp.chipset || '';
    this.#tipoRam = esp.tipoRam || 'DDR5';
    this.#slotsRam = Number(esp.slotsRam || 4);
    this.validarEspecificaciones();
  }

  get socket() { return this.#socket; }
  get formato() { return this.#formato; }
  get chipset() { return this.#chipset; }
  get tipoRam() { return this.#tipoRam; }
  get slotsRam() { return this.#slotsRam; }

  validarEspecificaciones() {
    if (!this.especificaciones?.socket) {
      throw new Error('La placa madre requiere especificar el socket.');
    }
  }

  esCompatibleCon(otroComponente) {
    if (otroComponente?.tipo === 'Procesador') {
      return this.#socket.toLowerCase() === otroComponente.socket.toLowerCase();
    }
    if (otroComponente?.tipo === 'MemoriaRam') {
      return this.#tipoRam.toLowerCase() === otroComponente.tipoRam.toLowerCase();
    }
    return true;
  }

  obtenerEspecificaciones() {
    return {
      socket: this.#socket,
      formato: this.#formato,
      chipset: this.#chipset,
      tipoRam: this.#tipoRam,
      slotsRam: this.#slotsRam,
    };
  }
}

