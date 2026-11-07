import bcrypt from 'bcryptjs';

/**
 * Clase Base Abstracta Usuario
 * Aplica encapsulamiento mediante campos privados (#), herencia y polimorfismo.
 */
export class Usuario {
  #id;
  #nombre;
  #apellido;
  #email;
  #passwordHash;
  #rol;
  #activo;
  #intentosFallidos;
  #bloqueadoHasta;
  #ultimoAcceso;
  #createdAt;
  #updatedAt;

  constructor({
    id = null,
    nombre,
    apellido,
    email,
    passwordHash,
    rol,
    activo = true,
    intentosFallidos = 0,
    bloqueadoHasta = null,
    ultimoAcceso = null,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (new.target === Usuario) {
      throw new Error('Usuario es una clase abstracta y no puede ser instanciada directamente.');
    }

    this.#id = id;
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#email = email;
    this.#passwordHash = passwordHash;
    this.#rol = rol;
    this.#activo = activo;
    this.#intentosFallidos = intentosFallidos;
    this.#bloqueadoHasta = bloqueadoHasta ? new Date(bloqueadoHasta) : null;
    this.#ultimoAcceso = ultimoAcceso ? new Date(ultimoAcceso) : null;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  // Getters
  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get apellido() { return this.#apellido; }
  get nombreCompleto() { return `${this.#nombre} ${this.#apellido}`; }
  get email() { return this.#email; }
  get rol() { return this.#rol; }
  get activo() { return this.#activo; }
  get intentosFallidos() { return this.#intentosFallidos; }
  get bloqueadoHasta() { return this.#bloqueadoHasta; }
  get ultimoAcceso() { return this.#ultimoAcceso; }
  get passwordHash() { return this.#passwordHash; }
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }

  // Métodos de negocio y autenticación
  async verificarPassword(plainPassword) {
    if (!this.#passwordHash) return false;
    return bcrypt.compare(plainPassword, this.#passwordHash);
  }

  cambiarPassword(nuevoPasswordHash) {
    if (!nuevoPasswordHash) throw new Error('El hash de contraseña es requerido');
    this.#passwordHash = nuevoPasswordHash;
    this.#updatedAt = new Date();
  }

  registrarAcceso() {
    this.#ultimoAcceso = new Date();
    this.#intentosFallidos = 0;
    this.#bloqueadoHasta = null;
  }

  registrarIntentoFallido(maxIntentos = 5, minutosBloqueo = 15) {
    this.#intentosFallidos += 1;
    if (this.#intentosFallidos >= maxIntentos) {
      this.#bloqueadoHasta = new Date(Date.now() + minutosBloqueo * 60 * 1000);
    }
  }

  estaBloqueado() {
    if (!this.#bloqueadoHasta) return false;
    if (new Date() < this.#bloqueadoHasta) {
      return true;
    }
    // Si ya expiró el tiempo de bloqueo, se resetea
    this.#bloqueadoHasta = null;
    this.#intentosFallidos = 0;
    return false;
  }

  activar() {
    this.#activo = true;
    this.#updatedAt = new Date();
  }

  desactivar() {
    this.#activo = false;
    this.#updatedAt = new Date();
  }

  /**
   * Método polimórfico abstracto a ser implementado por cada subclase.
   * @returns {string[]} Lista de permisos asignados al rol.
   */
  obtenerPermisos() {
    throw new Error('Método abstracto obtenerPermisos() debe ser implementado por la subclase.');
  }

  tienePermiso(permiso) {
    return this.obtenerPermisos().includes(permiso);
  }

  /**
   * Serialización segura para enviar al cliente sin exponer passwordHash ni datos sensibles.
   */
  toPublicJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      apellido: this.#apellido,
      nombreCompleto: this.nombreCompleto,
      email: this.#email,
      rol: this.#rol,
      activo: this.#activo,
      ultimoAcceso: this.#ultimoAcceso,
      permisos: this.obtenerPermisos(),
    };
  }
}

