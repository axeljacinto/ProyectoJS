import * as THREE from 'three';

export function ModeloProcesador({ hovered }) {
  const ihsColor = hovered ? '#38bdf8' : '#e2e8f0';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Sustrato PCB Verde Oscuro con contactos dorados */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.85, 0.85, 0.05]} />
        <meshStandardMaterial color="#064e3b" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Muescas doradas laterales del sustrato */}
      <mesh position={[0.42, 0, 0]}>
        <boxGeometry args={[0.02, 0.2, 0.051]} />
        <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.42, 0, 0]}>
        <boxGeometry args={[0.02, 0.2, 0.051]} />
        <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* IHS: Difusor Térmico Integrado de Cobre Niquelado con Bisel */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.72, 0.72, 0.07]} />
        <meshStandardMaterial
          color={ihsColor}
          metalness={0.95}
          roughness={0.15}
          emissive={hovered ? '#0284c7' : '#000000'}
          emissiveIntensity={hovered ? 0.4 : 0}
        />
      </mesh>

      {/* Grabado Láser Central (Insignia del CPU) */}
      <mesh position={[0, 0.08, 0.096]}>
        <planeGeometry args={[0.45, 0.18]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.12, 0.096]}>
        <planeGeometry args={[0.35, 0.1]} />
        <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

