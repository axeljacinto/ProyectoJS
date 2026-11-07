import { Componente } from '../Componente.js';

export class TarjetaGrafica extends Componente {
  #vramGb;
  #tipoVram;
  #consumoWatts;
  #longitudMm;
  #puertos;

  constructor(datos) {
    super({ ...datos, tipo: 'TarjetaGrafica' });
    const esp = datos.especificaciones || {};
    this.#vramGb = Number(esp.vramGb || 8);
    this.#tipoVram = esp.tipoVram || 'GDDR6';
    this.#consumoWatts = Number(esp.consumoWatts || 200);
    this.#longitudMm = Number(esp.longitudMm || 280);
    this.#puertos = esp.puertos || ['HDMI', 'DisplayPort'];
    this.validarEspecificaciones();
  }

  get vramGb() { return this.#vramGb; }
  get tipoVram() { return this.#tipoVram; }
  get consumoWatts() { return this.#consumoWatts; }
  get longitudMm() { return this.#longitudMm; }
  get puertos() { return this.#puertos; }

  validarEspecificaciones() {
    if (!this.#vramGb) {
      throw new Error('La tarjeta gráfica requiere especificar la cantidad de VRAM.');
    }
  }

  obtenerEspecificaciones() {
    return {
      vramGb: this.#vramGb,
      tipoVram: this.#tipoVram,
      consumoWatts: this.#consumoWatts,
      longitudMm: this.#longitudMm,
      puertos: this.#puertos,
    };
  }
}

