export class Marca {
  #id;
  #nombre;
  #paisOrigen;
  #sitioWeb;
  #logoUrl;
  #activa;
  #createdAt;
  #updatedAt;

  constructor({
    id = null,
    nombre,
    paisOrigen = null,
    sitioWeb = null,
    logoUrl = null,
    activa = true,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!nombre) {
      throw new Error('El nombre de la marca es obligatorio.');
    }

    this.#id = id;
    this.#nombre = nombre.trim();
    this.#paisOrigen = paisOrigen;
    this.#sitioWeb = sitioWeb;
    this.#logoUrl = logoUrl;
    this.#activa = activa;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get paisOrigen() { return this.#paisOrigen; }
  get sitioWeb() { return this.#sitioWeb; }
  get logoUrl() { return this.#logoUrl; }
  get activa() { return this.#activa; }
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }

  activar() {
    this.#activa = true;
    this.#updatedAt = new Date();
  }

  desactivar() {
    this.#activa = false;
    this.#updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      paisOrigen: this.#paisOrigen,
      sitioWeb: this.#sitioWeb,
      logoUrl: this.#logoUrl,
      activa: this.#activa,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}

