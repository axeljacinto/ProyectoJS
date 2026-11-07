import * as THREE from 'three';

export function ModeloRAM({ hovered }) {
  const ramRgb = hovered ? '#00f2fe' : '#a855f7';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Par de Módulos RAM en Ranuras 2 y 4 (Dual Channel) */}
      {[-0.15, 0.15].map((offsetZ, idx) => (
        <group key={idx} position={[0, 0, offsetZ]}>
          {/* PCB y Disipador de Aluminio Anodizado Negro */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.07, 1.35, 0.22]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Cortes angulares y detalles geométricos en el disipador */}
          <mesh position={[0.04, 0.1, 0]}>
            <boxGeometry args={[0.02, 0.9, 0.18]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Barra de Luz Superior RGB Difusa */}
          <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[0.08, 0.12, 0.24]} />
            <meshStandardMaterial
              color={ramRgb}
              emissive={ramRgb}
              emissiveIntensity={hovered ? 2.5 : 1.3}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Contactos dorados inferiores */}
          <mesh position={[0, -0.68, 0]}>
            <boxGeometry args={[0.04, 0.08, 0.2]} />
            <meshStandardMaterial color="#eab308" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

