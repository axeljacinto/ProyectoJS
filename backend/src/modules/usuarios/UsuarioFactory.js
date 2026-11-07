import { Cliente } from './subclases/Cliente.js';
import { Vendedor } from './subclases/Vendedor.js';
import { Administrador } from './subclases/Administrador.js';

export class UsuarioFactory {
  static #rolesMap = {
    CLIENTE: Cliente,
    VENDEDOR: Vendedor,
    ADMIN: Administrador,
  };

  /**
   * Crea una instancia de Usuario polimórfica según su rol.
   * @param {string} rol 
   * @param {Object} datos 
   * @returns {Cliente | Vendedor | Administrador}
   */
  static crear(rol, datos) {
    const ClaseUsuario = this.#rolesMap[rol?.toUpperCase()];
    if (!ClaseUsuario) {
      throw new Error(`Rol desconocido: ${rol}. No se puede instanciar el usuario.`);
    }
    return new ClaseUsuario(datos);
  }

  static registrarRol(rol, clase) {
    this.#rolesMap[rol.toUpperCase()] = clase;
  }
}

