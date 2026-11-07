import { Componente } from '../Componente.js';

export class Refrigeracion extends Componente {
  #tipoRefrigeracion; // Aire, Líquida AIO
  #tamanoRadiadorMm;
  #tdpMaximoWatts;
  #rgb;

  constructor(datos) {
    super({ ...datos, tipo: 'Refrigeracion' });
    const esp = datos.especificaciones || {};
    this.#tipoRefrigeracion = esp.tipoRefrigeracion || 'Aire';
    this.#tamanoRadiadorMm = esp.tamanoRadiadorMm ? Number(esp.tamanoRadiadorMm) : null;
    this.#tdpMaximoWatts = Number(esp.tdpMaximoWatts || 180);
    this.#rgb = Boolean(esp.rgb);
    this.validarEspecificaciones();
  }

  get tipoRefrigeracion() { return this.#tipoRefrigeracion; }
  get tamanoRadiadorMm() { return this.#tamanoRadiadorMm; }
  get tdpMaximoWatts() { return this.#tdpMaximoWatts; }
  get rgb() { return this.#rgb; }

  validarEspecificaciones() {
    if (!this.#tipoRefrigeracion) {
      throw new Error('La refrigeración requiere especificar si es por Aire o Líquida.');
    }
  }

  obtenerEspecificaciones() {
    return {
      tipoRefrigeracion: this.#tipoRefrigeracion,
      tamanoRadiadorMm: this.#tamanoRadiadorMm,
      tdpMaximoWatts: this.#tdpMaximoWatts,
      rgb: this.#rgb,
    };
  }
}

