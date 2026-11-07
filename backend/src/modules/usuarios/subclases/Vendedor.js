import { Usuario } from '../Usuario.js';
import { PERMISOS } from '../../../core/permisos.js';

export class Vendedor extends Usuario {
  #codigoEmpleado;
  #fechaContratacion;

  constructor(datos) {
    super({ ...datos, rol: 'VENDEDOR' });
    this.#codigoEmpleado = datos.codigoEmpleado || null;
    this.#fechaContratacion = datos.fechaContratacion ? new Date(datos.fechaContratacion) : new Date();
  }

  get codigoEmpleado() { return this.#codigoEmpleado; }
  get fechaContratacion() { return this.#fechaContratacion; }

  obtenerPermisos() {
    return [
      PERMISOS.CATALOGO_VER,
      PERMISOS.COMPONENTE_CREAR,
      PERMISOS.COMPONENTE_EDITAR,
    ];
  }

  toPublicJSON() {
    return {
      ...super.toPublicJSON(),
      codigoEmpleado: this.#codigoEmpleado,
      fechaContratacion: this.#fechaContratacion,
    };
  }
}

