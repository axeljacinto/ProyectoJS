import { RoundedBox } from '@react-three/drei';

const POSICIONES_CHIPS = [-0.38, -0.12, 0.14, 0.38];

export function ModeloAlmacenamiento({ hovered }) {
  const heatsinkColor = hovered ? '#0f766e' : '#526273';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Placa PCB M.2 2280 Negra */}
      <RoundedBox args={[1.2, 0.35, 0.045]} radius={0.025} smoothness={2}>
        <meshStandardMaterial color="#101820" metalness={0.25} roughness={0.72} />
      </RoundedBox>

      {/* Chips de Memoria NAND Flash y Controlador */}
      {POSICIONES_CHIPS.map((x, indice) => (
        <RoundedBox key={`nand-${indice}`} args={[0.19, 0.23, 0.03]} radius={0.018} smoothness={2} position={[x, 0, 0.04]}>
          <meshStandardMaterial color={indice === 1 ? '#1e293b' : '#070b10'} metalness={0.36} roughness={0.55} />
        </RoundedBox>
      ))}

      {/* Disipador corto que deja visibles parte de la NAND y el controlador. */}
      <RoundedBox args={[0.55, 0.31, 0.065]} radius={0.035} smoothness={3} position={[0.29, 0, 0.075]}>
        <meshStandardMaterial
          color={heatsinkColor}
          metalness={0.76}
          roughness={0.34}
          emissive={hovered ? '#0f766e' : '#000000'}
          emissiveIntensity={hovered ? 0.22 : 0}
        />
      </RoundedBox>
      {[-0.06, 0.04, 0.14, 0.24, 0.34, 0.44, 0.54].map((x) => (
        <mesh key={`ssd-fin-${x}`} position={[x, 0, 0.112]}>
          <boxGeometry args={[0.025, 0.27, 0.035]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.82} roughness={0.3} />
        </mesh>
      ))}

      {/* Pines de Conexión M-Key Dorados */}
      <mesh position={[-0.62, 0, 0]}>
        <boxGeometry args={[0.06, 0.28, 0.035]} />
        <meshStandardMaterial color="#c69c37" metalness={0.93} roughness={0.22} />
      </mesh>
      <mesh position={[0.56, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.025, 12]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.88} roughness={0.22} />
      </mesh>
    </group>
  );
}

