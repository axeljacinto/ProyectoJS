import { RoundedBox } from '@react-three/drei';

export function ModeloRAM({ hovered }) {
  const ramRgb = hovered ? '#5eead4' : '#14b8a6';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Par de Módulos RAM en Ranuras 2 y 4 (Dual Channel) */}
      {[-0.13, 0.13].map((offsetX, idx) => (
        <group key={idx} position={[offsetX, 0, 0]}>
          {/* PCB y disipador de aluminio con perfil biselado. */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.08, 1.34, 0.19]} />
            <meshStandardMaterial color="#0b1118" metalness={0.55} roughness={0.45} />
          </mesh>

          <RoundedBox args={[0.15, 1.18, 0.26]} radius={0.035} smoothness={3} position={[0.045, 0.04, 0]}>
            <meshStandardMaterial color="#263544" metalness={0.76} roughness={0.32} />
          </RoundedBox>
          {[-0.065, -0.02, 0.025, 0.07].map((offset) => (
            <mesh key={`ram-ridge-${offset}`} position={[0.125, offset, 0]}>
              <boxGeometry args={[0.018, 0.025, 0.19]} />
              <meshStandardMaterial color="#526273" metalness={0.72} roughness={0.34} />
            </mesh>
          ))}

          {/* Barra de Luz Superior RGB Difusa */}
          <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[0.08, 0.12, 0.24]} />
            <meshStandardMaterial
              color={ramRgb}
              emissive={ramRgb}
              emissiveIntensity={hovered ? 1.2 : 0.45}
              metalness={0.22}
              roughness={0.3}
            />
          </mesh>

          {/* Contactos dorados inferiores */}
          {Array.from({ length: 8 }, (_, contacto) => (
            <mesh key={`ram-contact-${contacto}`} position={[0.052, -0.64, -0.09 + contacto * 0.025]}>
              <boxGeometry args={[0.035, 0.075, 0.014]} />
              <meshStandardMaterial color="#c69c37" metalness={0.93} roughness={0.24} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

