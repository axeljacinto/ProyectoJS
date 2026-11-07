import * as THREE from 'three';

export function ModeloFuente({ hovered }) {
  const caseColor = hovered ? '#eab308' : '#0f172a';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Chasis Metálico ATX */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 1.1, 1.6]} />
        <meshStandardMaterial color={caseColor} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Rejilla de Ventilación del Ventilador Superior */}
      <mesh position={[0, 0.56, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial color="#05070b" metalness={0.9} roughness={0.2} wireframe />
      </mesh>

      {/* Rejilla de Panal de Abeja Trasera con Entrada AC y Switch */}
      <group position={[-0.91, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[1.5, 1.0]} />
          <meshStandardMaterial color="#0b0f19" metalness={0.9} roughness={0.3} wireframe />
        </mesh>
        {/* Interruptor I/O basculante */}
        <mesh position={[0.4, 0.15, 0.02]}>
          <boxGeometry args={[0.18, 0.28, 0.08]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
        </mesh>
        {/* Conector de cable de poder C14 */}
        <mesh position={[-0.3, 0.1, 0.02]}>
          <boxGeometry args={[0.3, 0.2, 0.06]} />
          <meshStandardMaterial color="#05070b" roughness={0.8} />
        </mesh>
      </group>

      {/* Etiqueta Lateral con Certificación 80 Plus */}
      <group position={[0, 0, 0.81]}>
        <mesh>
          <planeGeometry args={[1.4, 0.7]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.5, 0.3]} />
          <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={hovered ? 1.5 : 0.6} />
        </mesh>
      </group>

      {/* Conectores Modulares Frontales */}
      <mesh position={[0.91, -0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.4, 0.8]} />
        <meshStandardMaterial color="#05070b" roughness={0.9} />
      </mesh>
    </group>
  );
}

