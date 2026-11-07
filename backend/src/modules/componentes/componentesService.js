import { ConflictError, NotFoundError } from '../../core/errors/AppError.js';
import { ComponenteRepository } from './ComponenteRepository.js';
import { ComponenteFactory } from './ComponenteFactory.js';

export class ComponentesService {
  #repo;

  constructor(repo = new ComponenteRepository()) {
    this.#repo = repo;
  }

  async listar(filtros) {
    return this.#repo.listar(filtros);
  }

  async obtenerPorId(id) {
    const comp = await this.#repo.buscarPorId(id);
    if (!comp) {
      throw new NotFoundError('Componente no encontrado');
    }
    return comp;
  }

  async crear(datos, creadoPorId = null) {
    const existente = await this.#repo.buscarPorSku(datos.sku);
    if (existente) {
      throw new ConflictError(`Ya existe un componente con el SKU '${datos.sku}'`);
    }

    const entidad = ComponenteFactory.crear(datos.tipo, {
      ...datos,
      creadoPorId,
    });

    return this.#repo.guardar(entidad);
  }

  async actualizar(id, datos) {
    const componenteActual = await this.#repo.buscarPorId(id);
    if (!componenteActual) {
      throw new NotFoundError('Componente no encontrado');
    }

    if (datos.sku && datos.sku.toUpperCase() !== componenteActual.sku) {
      const otro = await this.#repo.buscarPorSku(datos.sku);
      if (otro && otro.id !== componenteActual.id) {
        throw new ConflictError(`El SKU '${datos.sku}' ya está asignado a otro componente.`);
      }
    }

    const tipo = datos.tipo || componenteActual.tipo;
    const entidadActualizada = ComponenteFactory.crear(tipo, {
      ...componenteActual.toJSON(),
      ...datos,
      id: componenteActual.id,
      especificaciones: {
        ...componenteActual.obtenerEspecificaciones(),
        ...(datos.especificaciones || {}),
      },
    });

    return this.#repo.actualizar(id, entidadActualizada);
  }

  async eliminar(id) {
    const comp = await this.#repo.buscarPorId(id);
    if (!comp) {
      throw new NotFoundError('Componente no encontrado');
    }
    return this.#repo.desactivar(id);
  }
}

