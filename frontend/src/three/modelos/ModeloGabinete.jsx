import * as THREE from 'three';

export function ModeloGabinete({ explosionada, hovered }) {
  const metalColor = hovered ? '#22d3ee' : '#111827';
  const interiorColor = '#0b0f19';

  return (
    <group>
      {/* Estructura Principal del Chasis */}
      {/* Panel Superior con rejilla de ventilación */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[2.3, 0.1, 4.4]} />
        <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Botón de encendido con aro LED */}
      <mesh position={[0.7, 2.26, 1.8]}>
        <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={hovered ? 2 : 1} />
      </mesh>

      {/* Panel Inferior con patas */}
      <mesh position={[0, -2.1, 0]}>
        <boxGeometry args={[2.3, 0.15, 4.4]} />
        <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Patas del gabinete (4 esquinas) */}
      {[[-0.9, 1.8], [0.9, 1.8], [-0.9, -1.8], [0.9, -1.8]].map(([x, z], i) => (
        <mesh key={i} position={[x, -2.25, z]}>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 16]} />
          <meshStandardMaterial color="#05070b" roughness={0.9} />
        </mesh>
      ))}

      {/* Panel Trasero con rejillas I/O y slots PCIe */}
      <mesh position={[0, 0.05, -2.15]}>
        <boxGeometry args={[2.2, 4.2, 0.1]} />
        <meshStandardMaterial color={metalColor} metalness={0.85} roughness={0.35} />
      </mesh>

      {/* Panel Frontal con Malla / Mesh de Flujo de Aire */}
      <group position={[0, 0.05, 2.15]}>
        <mesh>
          <boxGeometry args={[2.25, 4.2, 0.15]} />
          <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.6} />
        </mesh>
        {/* Luces sutiles RGB frontales simuladas */}
        <mesh position={[0, 0.8, 0.09]}>
          <circleGeometry args={[0.5, 32]} />
          <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.6} wireframe />
        </mesh>
        <mesh position={[0, -0.6, 0.09]}>
          <circleGeometry args={[0.5, 32]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.6} wireframe />
        </mesh>
      </group>

      {/* Panel Derecho (Metal ciego) */}
      <mesh position={[-1.1, 0.05, 0]}>
        <boxGeometry args={[0.1, 4.2, 4.3]} />
        <meshStandardMaterial color={interiorColor} metalness={0.7} roughness={0.5} />
      </mesh>

      {/* Shroud / Compartimento de la Fuente de Poder (PSU Basement) */}
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[2.1, 1.45, 4.2]} />
        <meshStandardMaterial color="#090d16" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Panel Izquierdo: Cristal Templado Ahumado */}
      <group position={[1.12, 0.05, 0]}>
        <mesh>
          <boxGeometry args={[0.04, 4.15, 4.25]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            metalness={0.1}
            roughness={0.05}
            transmission={0.85}
            transparent
            opacity={explosionada ? 0.2 : 0.45}
            reflectivity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Tornillos moleteados de cristal en las esquinas */}
        {[[-1.8, 1.8], [-1.8, -1.8], [1.8, 1.8], [1.8, -1.8]].map(([y, z], i) => (
          <mesh key={i} position={[0.03, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

