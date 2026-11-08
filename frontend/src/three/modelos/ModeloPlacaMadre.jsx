import { RoundedBox } from '@react-three/drei';

const POSICIONES_TORNILLOS = [
  [-1.32, -1.42], [-1.32, 1.42], [1.32, -1.42], [1.32, 1.42],
];
const POSICIONES_CAPACITORES = [
  [-0.92, 0.92], [-0.72, 0.92], [-0.52, 0.92], [-0.32, 0.92],
  [-0.92, 0.68], [-0.72, 0.68], [-0.52, 0.68],
  [-0.92, 0.44], [-0.72, 0.44], [-0.52, 0.44],
];

export function ModeloPlacaMadre({ hovered }) {
  const pcbColor = '#0a101d';
  const heatsinkColor = hovered ? '#0f766e' : '#1e293b';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Placa de Circuito Impreso (PCB ATX Negro Mate) */}
      <RoundedBox args={[3.0, 3.2, 0.08]} radius={0.045} smoothness={3}>
        <meshStandardMaterial color={pcbColor} metalness={0.24} roughness={0.68} />
      </RoundedBox>

      {/* Orificios metalizados y puntos de montaje del PCB. */}
      {POSICIONES_TORNILLOS.map(([x, y], indice) => (
        <group key={`mount-${indice}`} position={[x, y, 0.055]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.018, 24]} />
            <meshStandardMaterial color="#b88746" metalness={0.9} roughness={0.28} />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <circleGeometry args={[0.052, 20]} />
            <meshStandardMaterial color="#0b1118" metalness={0.3} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Disipadores VRM de Aluminio Cepillado (Superior y Lateral del Socket) */}
      <mesh position={[-0.4, 0.95, 0.2]}>
        <boxGeometry args={[1.4, 0.45, 0.35]} />
        <meshStandardMaterial color={heatsinkColor} metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[-0.95, 0.25, 0.2]}>
        <boxGeometry args={[0.45, 1.3, 0.35]} />
        <meshStandardMaterial color={heatsinkColor} metalness={0.85} roughness={0.2} />
      </mesh>
      {Array.from({ length: 9 }, (_, indice) => (
        <mesh key={`vrm-fin-${indice}`} position={[-0.94 + indice * 0.13, 1.19, 0.23]}>
          <boxGeometry args={[0.045, 0.24, 0.25]} />
          <meshStandardMaterial color="#64748b" metalness={0.82} roughness={0.32} />
        </mesh>
      ))}

      {/* Escudo I/O Trasero Metálico */}
      <mesh position={[2.05, 0.4, -0.15]}>
        <boxGeometry args={[0.2, 2.1, 0.6]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </mesh>
      {[-0.35, -0.05, 0.25, 0.55].map((y, indice) => (
        <mesh key={`rear-io-${indice}`} position={[2.05, y, -0.15]}>
          <boxGeometry args={[0.16, 0.12, 0.08]} />
          <meshStandardMaterial color={indice === 0 ? '#0f766e' : '#101820'} metalness={0.38} roughness={0.5} />
        </mesh>
      ))}

      {/* Disipador del Chipset con Líneas Tecnológicas */}
      <group position={[0.7, -0.7, 0.15]}>
        <RoundedBox args={[0.9, 0.8, 0.2]} radius={0.045} smoothness={3}>
          <meshStandardMaterial color="#0f172a" metalness={0.72} roughness={0.35} />
        </RoundedBox>
        {/* Placa decorativa RGB con relieve */}
        <mesh position={[0, 0, 0.112]}>
          <planeGeometry args={[0.7, 0.6]} />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={hovered ? 0.9 : 0.28} />
        </mesh>
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[0.44, 0.07]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.45} roughness={0.4} />
        </mesh>
      </group>

      {/* 4 Ranuras DIMM para Memorias RAM */}
      {[-0.05, 0.1, 0.25, 0.4].map((offset, i) => (
        <group key={i} position={[0.45 + offset, 0.5, 0.08]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.07, 1.4, 0.12]} />
            <meshStandardMaterial color="#111923" metalness={0.42} roughness={0.52} />
          </mesh>
          <mesh position={[0, 0.69, 0.01]}>
            <boxGeometry args={[0.075, 0.055, 0.13]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#64748b' : '#0f766e'} metalness={0.58} roughness={0.38} />
          </mesh>
        </group>
      ))}

      {/* Ranuras PCIe x16 Blindadas con Acero */}
      <mesh position={[0, -0.15, 0.12]}>
        <boxGeometry args={[1.8, 0.14, 0.18]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.65, 0.12]}>
        <boxGeometry args={[1.8, 0.12, 0.15]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>
      {[-1.05, -0.82, -0.59, -0.36, -0.13, 0.1, 0.33, 0.56, 0.79, 1.02].map((x) => (
        <mesh key={`trace-${x}`} position={[x, -1.1, 0.055]}>
          <boxGeometry args={[0.025, 0.34, 0.012]} />
          <meshStandardMaterial color="#b88746" metalness={0.72} roughness={0.4} />
        </mesh>
      ))}

      {/* Disipador M.2 Shield Frozr (Debajo del socket) */}
      <mesh position={[0.1, -0.38, 0.1]}>
        <boxGeometry args={[1.1, 0.18, 0.12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Socket del Procesador (Marco Metálico LGA con Puntos de Retención) */}
      <group position={[-0.3, 0.35, 0.06]}>
        <mesh>
          <boxGeometry args={[0.95, 0.95, 0.06]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Palanca de cierre / retention arm */}
        <mesh position={[0.52, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.9, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Condensadores Electrolíticos Sólidos (Array de cilindros plateados) */}
      {POSICIONES_CAPACITORES.map(([x, y], idx) => (
        <group key={`capacitor-${idx}`} position={[x, y, 0.12]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.16, 16]} />
            <meshStandardMaterial color="#9aa8b2" metalness={0.76} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.083]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.012, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.55} roughness={0.32} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

