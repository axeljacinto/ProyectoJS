import { Usuario } from '../Usuario.js';
import { PERMISOS } from '../../../core/permisos.js';

export class Administrador extends Usuario {
  constructor(datos) {
    super({ ...datos, rol: 'ADMIN' });
  }

  obtenerPermisos() {
    return Object.values(PERMISOS);
  }
}

