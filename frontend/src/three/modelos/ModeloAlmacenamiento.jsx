import * as THREE from 'three';

export function ModeloAlmacenamiento({ hovered }) {
  const heatsinkColor = hovered ? '#ec4899' : '#1e293b';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Placa PCB M.2 2280 Negra */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.35, 0.04]} />
        <meshStandardMaterial color="#0b0f19" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Chips de Memoria NAND Flash y Controlador */}
      {[-0.3, 0.05, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.03]}>
          <boxGeometry args={[0.22, 0.26, 0.03]} />
          <meshStandardMaterial color="#05070b" metalness={0.4} roughness={0.5} />
        </mesh>
      ))}

      {/* Disipador de Aluminio Ranurado M.2 */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[1.1, 0.32, 0.05]} />
        <meshStandardMaterial
          color={heatsinkColor}
          metalness={0.85}
          roughness={0.25}
          emissive={hovered ? '#be185d' : '#000000'}
          emissiveIntensity={hovered ? 0.6 : 0}
        />
      </mesh>

      {/* Pines de Conexión M-Key Dorados */}
      <mesh position={[-0.62, 0, 0]}>
        <boxGeometry args={[0.06, 0.28, 0.035]} />
        <meshStandardMaterial color="#eab308" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
}

