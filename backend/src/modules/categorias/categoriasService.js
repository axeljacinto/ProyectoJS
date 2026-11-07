import { ConflictError, NotFoundError } from '../../core/errors/AppError.js';
import { CategoriaRepository } from './CategoriaRepository.js';
import { Categoria } from './Categoria.js';

export class CategoriasService {
  #repo;

  constructor(repo = new CategoriaRepository()) {
    this.#repo = repo;
  }

  async listar(soloActivas = true) {
    return this.#repo.listar({ soloActivas });
  }

  async obtenerPorSlugOId(identificador) {
    let cat = null;
    if (!isNaN(Number(identificador))) {
      cat = await this.#repo.buscarPorId(identificador);
    }
    if (!cat) {
      cat = await this.#repo.buscarPorSlug(identificador);
    }
    if (!cat) {
      throw new NotFoundError('Categoría no encontrada');
    }
    return cat;
  }

  async crear(datos) {
    const existente = await this.#repo.buscarPorSlug(datos.slug);
    if (existente) {
      throw new ConflictError('Ya existe una categoría con ese slug');
    }

    const entidad = new Categoria(datos);
    return this.#repo.guardar(entidad);
  }

  async actualizar(id, datos) {
    const categoria = await this.#repo.buscarPorId(id);
    if (!categoria) {
      throw new NotFoundError('Categoría no encontrada');
    }

    const entidadActualizada = new Categoria({
      ...categoria.toJSON(),
      ...datos,
      id: categoria.id,
    });

    return this.#repo.actualizar(id, entidadActualizada);
  }

  async eliminar(id) {
    const categoria = await this.#repo.buscarPorId(id);
    if (!categoria) {
      throw new NotFoundError('Categoría no encontrada');
    }
    return this.#repo.desactivar(id);
  }
}

