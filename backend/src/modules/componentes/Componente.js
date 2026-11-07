/**
 * Clase Base Abstracta Componente
 * Representa cualquier pieza de hardware del catálogo.
 * Encapsula precio, stock y lógica de compatibilidad y disponibilidad.
 */
export class Componente {
  #id;
  #sku;
  #nombre;
  #descripcion;
  #tipo;
  #marcaId;
  #categoriaId;
  #precio;
  #moneda;
  #stock;
  #stockMinimo;
  #garantiaMeses;
  #imagenUrl;
  #especificaciones;
  #activo;
  #creadoPorId;
  #createdAt;
  #updatedAt;

  // Metadata opcional (relaciones populadas)
  #marca;
  #categoria;

  constructor({
    id = null,
    sku,
    nombre,
    descripcion = '',
    tipo,
    marcaId,
    categoriaId,
    precio,
    moneda = 'USD',
    stock = 0,
    stockMinimo = 5,
    garantiaMeses = 12,
    imagenUrl = null,
    especificaciones = {},
    activo = true,
    creadoPorId = null,
    createdAt = new Date(),
    updatedAt = new Date(),
    marca = null,
    categoria = null,
  }) {
    if (new.target === Componente) {
      throw new Error('Componente es una clase abstracta y no puede ser instanciada directamente.');
    }

    if (!sku || !nombre) {
      throw new Error('SKU y Nombre son obligatorios para registrar un componente.');
    }

    const numPrecio = Number(precio);
    if (isNaN(numPrecio) || numPrecio <= 0) {
      throw new Error('El precio debe ser un número mayor a 0.');
    }

    const numStock = Number(stock);
    if (isNaN(numStock) || numStock < 0) {
      throw new Error('El stock no puede ser negativo.');
    }

    this.#id = id;
    this.#sku = sku.toUpperCase().trim();
    this.#nombre = nombre.trim();
    this.#descripcion = descripcion;
    this.#tipo = tipo;
    this.#marcaId = Number(marcaId);
    this.#categoriaId = Number(categoriaId);
    this.#precio = numPrecio;
    this.#moneda = moneda;
    this.#stock = numStock;
    this.#stockMinimo = Number(stockMinimo);
    this.#garantiaMeses = Number(garantiaMeses);
    this.#imagenUrl = imagenUrl;
    this.#especificaciones = typeof especificaciones === 'string' ? JSON.parse(especificaciones) : (especificaciones || {});
    this.#activo = activo;
    this.#creadoPorId = creadoPorId;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#marca = marca;
    this.#categoria = categoria;
  }

  // Getters
  get id() { return this.#id; }
  get sku() { return this.#sku; }
  get nombre() { return this.#nombre; }
  get descripcion() { return this.#descripcion; }
  get tipo() { return this.#tipo; }
  get marcaId() { return this.#marcaId; }
  get categoriaId() { return this.#categoriaId; }
  get precio() { return this.#precio; }
  get moneda() { return this.#moneda; }
  get stock() { return this.#stock; }
  get stockMinimo() { return this.#stockMinimo; }
  get garantiaMeses() { return this.#garantiaMeses; }
  get imagenUrl() { return this.#imagenUrl; }
  get especificaciones() { return { ...this.#especificaciones }; }
  get activo() { return this.#activo; }
  get creadoPorId() { return this.#creadoPorId; }
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }
  get marca() { return this.#marca; }
  get categoria() { return this.#categoria; }

  // Métodos de negocio encapsulados
  cambiarPrecio(nuevoPrecio) {
    const valor = Number(nuevoPrecio);
    if (isNaN(valor) || valor <= 0) {
      throw new Error('El nuevo precio debe ser mayor a 0.');
    }
    this.#precio = Number(valor.toFixed(2));
    this.#updatedAt = new Date();
  }

  aplicarDescuento(porcentaje) {
    const desc = Number(porcentaje);
    if (isNaN(desc) || desc <= 0 || desc >= 100) {
      throw new Error('El porcentaje de descuento debe estar entre 1 y 99.');
    }
    const precioConDescuento = this.#precio * (1 - desc / 100);
    this.cambiarPrecio(precioConDescuento);
  }

  aumentarStock(cantidad) {
    const cant = Number(cantidad);
    if (isNaN(cant) || cant <= 0 || !Number.isInteger(cant)) {
      throw new Error('La cantidad a incrementar debe ser un entero positivo.');
    }
    this.#stock += cant;
    this.#updatedAt = new Date();
  }

  reducirStock(cantidad) {
    const cant = Number(cantidad);
    if (isNaN(cant) || cant <= 0 || !Number.isInteger(cant)) {
      throw new Error('La cantidad a reducir debe ser un entero positivo.');
    }
    if (cant > this.#stock) {
      throw new Error(`Stock insuficiente. Disponible: ${this.#stock}, solicitado: ${cant}`);
    }
    this.#stock -= cant;
    this.#updatedAt = new Date();
  }

  tieneStockBajo() {
    return this.#stock <= this.#stockMinimo;
  }

  estaDisponible() {
    return this.#activo && this.#stock > 0;
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
   * Método polimórfico de compatibilidad entre piezas.
   * @param {Componente} otroComponente
   * @returns {boolean}
   */
  esCompatibleCon(otroComponente) {
    return true; // Por defecto compatible a menos que la subclase determine lo contrario
  }

  /**
   * Métodos abstractos a sobrescribir
   */
  obtenerEspecificaciones() {
    throw new Error('Método abstracto obtenerEspecificaciones() no implementado.');
  }

  validarEspecificaciones() {
    throw new Error('Método abstracto validarEspecificaciones() no implementado.');
  }

  toJSON() {
    return {
      id: this.#id,
      sku: this.#sku,
      nombre: this.#nombre,
      descripcion: this.#descripcion,
      tipo: this.#tipo,
      marcaId: this.#marcaId,
      categoriaId: this.#categoriaId,
      precio: this.#precio,
      moneda: this.#moneda,
      stock: this.#stock,
      stockMinimo: this.#stockMinimo,
      garantiaMeses: this.#garantiaMeses,
      imagenUrl: this.#imagenUrl,
      especificaciones: this.obtenerEspecificaciones(),
      activo: this.#activo,
      tieneStockBajo: this.tieneStockBajo(),
      estaDisponible: this.estaDisponible(),
      marca: this.#marca,
      categoria: this.#categoria,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}

