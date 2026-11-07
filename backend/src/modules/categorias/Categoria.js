export class Categoria {
  #id;
  #nombre;
  #slug;
  #descripcion;
  #orden;
  #activa;
  #createdAt;
  #updatedAt;

  constructor({
    id = null,
    nombre,
    slug,
    descripcion = null,
    orden = 0,
    activa = true,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!nombre || !slug) {
      throw new Error('Nombre y slug son requeridos para una Categoría.');
    }

    this.#id = id;
    this.#nombre = nombre.trim();
    this.#slug = slug.toLowerCase().trim();
    this.#descripcion = descripcion;
    this.#orden = Number(orden);
    this.#activa = activa;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get slug() { return this.#slug; }
  get descripcion() { return this.#descripcion; }
  get orden() { return this.#orden; }
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
      slug: this.#slug,
      descripcion: this.#descripcion,
      orden: this.#orden,
      activa: this.#activa,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}

