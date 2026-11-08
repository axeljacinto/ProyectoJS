import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Importación de los modelos realistas especializados
import { ModeloGabinete } from './modelos/ModeloGabinete';
import { ModeloPlacaMadre } from './modelos/ModeloPlacaMadre';
import { ModeloProcesador } from './modelos/ModeloProcesador';
import { ModeloRefrigeracion } from './modelos/ModeloRefrigeracion';
import { ModeloRAM } from './modelos/ModeloRAM';
import { ModeloGPU } from './modelos/ModeloGPU';
import { ModeloAlmacenamiento } from './modelos/ModeloAlmacenamiento';
import { ModeloFuente } from './modelos/ModeloFuente';

export function PiezaPC({ pieza, explosionada, onSeleccionar, onToggleDesarmar }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Interpolación suave y orgánica (lerp) entre la posición armada y la galería explosionada
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const destino = explosionada ? pieza.posicionExplosionada : pieza.posicionArmada;
    const targetVec = new THREE.Vector3(...destino);

    // Movimiento fluido tipo muelle / amortiguación
    groupRef.current.position.lerp(targetVec, delta * 3.8);

    // Sutil elevación o flotación cuando el cursor está encima
    if (hovered && explosionada) {
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 4) * 0.005;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!explosionada) {
      // Si la PC está armada, el primer clic la desarma ordenadamente
      onToggleDesarmar(true);
    } else {
      // Si ya está desarmada, el clic lleva directo a la categoría en el catálogo
      onSeleccionar(pieza.slug);
    }
  };

  const renderModelo = () => {
    switch (pieza.slug) {
      case 'gabinete':
        return <ModeloGabinete explosionada={explosionada} hovered={hovered} />;
      case 'placa-madre':
        return <ModeloPlacaMadre hovered={hovered} />;
      case 'procesador':
        return <ModeloProcesador hovered={hovered} />;
      case 'refrigeracion':
        return <ModeloRefrigeracion hovered={hovered} />;
      case 'ram':
        return <ModeloRAM hovered={hovered} />;
      case 'gpu':
        return <ModeloGPU hovered={hovered} />;
      case 'almacenamiento':
        return <ModeloAlmacenamiento hovered={hovered} />;
      case 'fuente':
        return <ModeloFuente hovered={hovered} />;
      default:
        return null;
    }
  };

  return (
    <group
      ref={groupRef}
      position={pieza.posicionArmada}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={handleClick}
    >
      {renderModelo()}

      {/* Tarjeta de información interactiva visible al hacer hover */}
      {hovered && (
        <Html
          distanceFactor={10}
          position={[0, 0.9, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div className="bg-dark-900/95 px-4 py-2.5 rounded-xl border border-cyan-400/80 text-xs min-w-[210px]">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                {pieza.badge}
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </div>
            <div className="font-extrabold text-white text-sm">
              {pieza.etiqueta}
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug line-clamp-2">
              {pieza.descripcion}
            </p>
            <div className="mt-2 pt-1.5 border-t border-slate-800 text-[10px] font-bold text-cyan-300 flex items-center justify-between">
              <span>{explosionada ? 'Ver catálogo de productos' : 'Clic para desarmar la PC'}</span>
              <span>➜</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
