import { Usuario } from '../Usuario.js';
import { PERMISOS } from '../../../core/permisos.js';

export class Cliente extends Usuario {
  constructor(datos) {
    super({ ...datos, rol: 'CLIENTE' });
  }

  obtenerPermisos() {
    return [
      PERMISOS.CATALOGO_VER,
    ];
  }
}

