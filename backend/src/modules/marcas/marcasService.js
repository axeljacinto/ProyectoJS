import { ConflictError, NotFoundError } from '../../core/errors/AppError.js';
import { MarcaRepository } from './MarcaRepository.js';
import { Marca } from './Marca.js';

export class MarcasService {
  #repo;

  constructor(repo = new MarcaRepository()) {
    this.#repo = repo;
  }

  async listar(soloActivas = true) {
    return this.#repo.listar({ soloActivas });
  }

  async obtenerPorId(id) {
    const marca = await this.#repo.buscarPorId(id);
    if (!marca) {
      throw new NotFoundError('Marca no encontrada');
    }
    return marca;
  }

  async crear(datos) {
    const existente = await this.#repo.buscarPorNombre(datos.nombre);
    if (existente) {
      throw new ConflictError('Ya existe una marca con ese nombre');
    }

    const entidad = new Marca(datos);
    return this.#repo.guardar(entidad);
  }

  async actualizar(id, datos) {
    const marca = await this.#repo.buscarPorId(id);
    if (!marca) {
      throw new NotFoundError('Marca no encontrada');
    }

    const entidadActualizada = new Marca({
      ...marca.toJSON(),
      ...datos,
      id: marca.id,
    });

    return this.#repo.actualizar(id, entidadActualizada);
  }

  async eliminar(id) {
    const marca = await this.#repo.buscarPorId(id);
    if (!marca) {
      throw new NotFoundError('Marca no encontrada');
    }
    return this.#repo.desactivar(id);
  }
}

