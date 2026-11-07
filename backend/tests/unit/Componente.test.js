import { describe, it, expect } from 'vitest';
import { Componente } from '../../src/modules/componentes/Componente.js';
import { ComponenteFactory } from '../../src/modules/componentes/ComponenteFactory.js';
import { Procesador } from '../../src/modules/componentes/subclases/Procesador.js';

describe('POO: Jerarquía de Componentes', () => {
  it('No permite instanciar directamente la clase abstracta Componente', () => {
    expect(() => {
      new Componente({
        sku: 'TEST-01',
        nombre: 'Test',
        precio: 100,
      });
    }).toThrow('Componente es una clase abstracta');
  });

  it('Crea una instancia de Procesador mediante la Factory y valida compatibilidad', () => {
    const cpu = ComponenteFactory.crear('Procesador', {
      sku: 'CPU-TEST',
      nombre: 'Ryzen 5 7600',
      marcaId: 1,
      categoriaId: 1,
      precio: 200,
      stock: 10,
      especificaciones: {
        socket: 'AM5',
        nucleos: 6,
        hilos: 12,
      },
    });

    expect(cpu).toBeInstanceOf(Procesador);
    expect(cpu.precio).toBe(200);
    expect(cpu.stock).toBe(10);
    expect(cpu.socket).toBe('AM5');

    // Cambiar precio encapsulado
    cpu.cambiarPrecio(180);
    expect(cpu.precio).toBe(180);

    // Aplicar descuento
    cpu.aplicarDescuento(10); // 10% de 180 = 162
    expect(cpu.precio).toBe(162);

    // Reducir stock
    cpu.reducirStock(3);
    expect(cpu.stock).toBe(7);

    // Error al reducir más de lo disponible
    expect(() => cpu.reducirStock(20)).toThrow('Stock insuficiente');
  });

  it('Lanza error si el precio o stock inicial son inválidos', () => {
    expect(() => {
      ComponenteFactory.crear('MemoriaRam', {
        sku: 'RAM-TEST',
        nombre: 'RAM 8GB',
        precio: -50,
        especificaciones: { tipoRam: 'DDR4', capacidadGb: 8 },
      });
    }).toThrow('El precio debe ser un número mayor a 0');
  });
});

