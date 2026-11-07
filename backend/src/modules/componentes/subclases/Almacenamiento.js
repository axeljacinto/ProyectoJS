import { Componente } from '../Componente.js';

export class Almacenamiento extends Componente {
  #tipoAlmacenamiento; // NVMe SSD, SATA SSD, HDD
  #capacidadGb;
  #formato;
  #velocidadLecturaMbps;
  #velocidadEscrituraMbps;

  constructor(datos) {
    super({ ...datos, tipo: 'Almacenamiento' });
    const esp = datos.especificaciones || {};
    this.#tipoAlmacenamiento = esp.tipoAlmacenamiento || 'NVMe SSD';
    this.#capacidadGb = Number(esp.capacidadGb || 1000);
    this.#formato = esp.formato || 'M.2 2280';
    this.#velocidadLecturaMbps = Number(esp.velocidadLecturaMbps || 3500);
    this.#velocidadEscrituraMbps = Number(esp.velocidadEscrituraMbps || 3000);
    this.validarEspecificaciones();
  }

  get tipoAlmacenamiento() { return this.#tipoAlmacenamiento; }
  get capacidadGb() { return this.#capacidadGb; }
  get formato() { return this.#formato; }
  get velocidadLecturaMbps() { return this.#velocidadLecturaMbps; }
  get velocidadEscrituraMbps() { return this.#velocidadEscrituraMbps; }

  validarEspecificaciones() {
    if (!this.#capacidadGb) {
      throw new Error('El almacenamiento requiere especificar capacidad en GB.');
    }
  }

  obtenerEspecificaciones() {
    return {
      tipoAlmacenamiento: this.#tipoAlmacenamiento,
      capacidadGb: this.#capacidadGb,
      formato: this.#formato,
      velocidadLecturaMbps: this.#velocidadLecturaMbps,
      velocidadEscrituraMbps: this.#velocidadEscrituraMbps,
    };
  }
}

