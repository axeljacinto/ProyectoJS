import * as THREE from 'three';

export function ModeloPlacaMadre({ hovered }) {
  const pcbColor = '#0a101d';
  const heatsinkColor = hovered ? '#00f2fe' : '#1e293b';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Placa de Circuito Impreso (PCB ATX Negro Mate) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.0, 3.2, 0.08]} />
        <meshStandardMaterial color={pcbColor} metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Disipadores VRM de Aluminio Cepillado (Superior y Lateral del Socket) */}
      <mesh position={[-0.4, 0.95, 0.2]}>
        <boxGeometry args={[1.4, 0.45, 0.35]} />
        <meshStandardMaterial color={heatsinkColor} metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[-0.95, 0.25, 0.2]}>
        <boxGeometry args={[0.45, 1.3, 0.35]} />
        <meshStandardMaterial color={heatsinkColor} metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Escudo I/O Trasero Metálico */}
      <mesh position={[-1.38, 0.4, 0.35]}>
        <boxGeometry args={[0.2, 2.1, 0.6]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Disipador del Chipset con Líneas Tecnológicas */}
      <group position={[0.7, -0.7, 0.15]}>
        <mesh>
          <boxGeometry args={[0.9, 0.8, 0.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Placa decorativa RGB con relieve */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[0.7, 0.6]} />
          <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={hovered ? 1.5 : 0.6} />
        </mesh>
      </group>

      {/* 4 Ranuras DIMM para Memorias RAM */}
      {[-0.05, 0.1, 0.25, 0.4].map((offset, i) => (
        <mesh key={i} position={[0.45 + offset, 0.5, 0.08]}>
          <boxGeometry args={[0.07, 1.4, 0.12]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#1e293b' : '#0284c7'} metalness={0.5} roughness={0.5} />
        </mesh>
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
      {[-0.7, -0.5, -0.3, -0.1].map((y, idx) => (
        <mesh key={idx} position={[-0.65, 0.8 + y * 0.4, 0.1]}>
          <cylinderGeometry args={[0.05, 0.05, 0.12, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

