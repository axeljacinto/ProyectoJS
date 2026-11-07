import { Componente } from '../Componente.js';

export class Gabinete extends Componente {
  #formatoSoportado;
  #ventiladoresIncluidos;
  #color;
  #ventanaLateral;

  constructor(datos) {
    super({ ...datos, tipo: 'Gabinete' });
    const esp = datos.especificaciones || {};
    this.#formatoSoportado = esp.formatoSoportado || 'ATX / Micro-ATX';
    this.#ventiladoresIncluidos = Number(esp.ventiladoresIncluidos || 2);
    this.#color = esp.color || 'Negro';
    this.#ventanaLateral = esp.ventanaLateral !== undefined ? Boolean(esp.ventanaLateral) : true;
    this.validarEspecificaciones();
  }

  get formatoSoportado() { return this.#formatoSoportado; }
  get ventiladoresIncluidos() { return this.#ventiladoresIncluidos; }
  get color() { return this.#color; }
  get ventanaLateral() { return this.#ventanaLateral; }

  validarEspecificaciones() {
    if (!this.#formatoSoportado) {
      throw new Error('El gabinete requiere especificar el formato de placa soportado.');
    }
  }

  obtenerEspecificaciones() {
    return {
      formatoSoportado: this.#formatoSoportado,
      ventiladoresIncluidos: this.#ventiladoresIncluidos,
      color: this.#color,
      ventanaLateral: this.#ventanaLateral,
    };
  }
}

