import { Componente } from '../Componente.js';

export class MemoriaRam extends Componente {
  #tipoRam;
  #capacidadGb;
  #velocidadMhz;
  #latenciaCl;
  #modulos;

  constructor(datos) {
    super({ ...datos, tipo: 'MemoriaRam' });
    const esp = datos.especificaciones || {};
    this.#tipoRam = esp.tipoRam || 'DDR5';
    this.#capacidadGb = Number(esp.capacidadGb || 16);
    this.#velocidadMhz = Number(esp.velocidadMhz || 5600);
    this.#latenciaCl = Number(esp.latenciaCl || 36);
    this.#modulos = Number(esp.modulos || 2);
    this.validarEspecificaciones();
  }

  get tipoRam() { return this.#tipoRam; }
  get capacidadGb() { return this.#capacidadGb; }
  get velocidadMhz() { return this.#velocidadMhz; }
  get latenciaCl() { return this.#latenciaCl; }
  get modulos() { return this.#modulos; }

  validarEspecificaciones() {
    if (!this.#tipoRam || !this.#capacidadGb) {
      throw new Error('La memoria RAM requiere especificar tipo y capacidad en GB.');
    }
  }

  obtenerEspecificaciones() {
    return {
      tipoRam: this.#tipoRam,
      capacidadGb: this.#capacidadGb,
      velocidadMhz: this.#velocidadMhz,
      latenciaCl: this.#latenciaCl,
      modulos: this.#modulos,
    };
  }
}

