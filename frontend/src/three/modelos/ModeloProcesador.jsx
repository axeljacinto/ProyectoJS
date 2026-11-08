import { RoundedBox } from '@react-three/drei';

const CONTACTOS = Array.from({ length: 8 }, (_, indice) => indice);

export function ModeloProcesador({ hovered }) {
  const ihsColor = hovered ? '#5eead4' : '#d7dee3';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Sustrato PCB Verde Oscuro con contactos dorados */}
      <RoundedBox args={[0.85, 0.85, 0.05]} radius={0.035} smoothness={3}>
        <meshStandardMaterial color="#123d35" metalness={0.36} roughness={0.58} />
      </RoundedBox>

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
      <RoundedBox args={[0.72, 0.72, 0.075]} radius={0.055} smoothness={4} position={[0, 0, 0.06]}>
        <meshStandardMaterial
          color={ihsColor}
          metalness={0.82}
          roughness={0.26}
          emissive={hovered ? '#0f766e' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </RoundedBox>

      {/* Grabado Láser Central (Insignia del CPU) */}
      <mesh position={[0, 0.08, 0.096]}>
        <planeGeometry args={[0.45, 0.18]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.12, 0.096]}>
        <planeGeometry args={[0.35, 0.1]} />
        <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Matriz de contactos y componentes superficiales del encapsulado. */}
      {CONTACTOS.map((contacto) => (
        <group key={`cpu-contact-${contacto}`}>
          {[-1, 1].map((lado) => (
            <mesh key={lado} position={[lado * 0.36, -0.28 + contacto * 0.08, 0.035]}>
              <boxGeometry args={[0.035, 0.045, 0.012]} />
              <meshStandardMaterial color="#c69c37" metalness={0.92} roughness={0.22} />
            </mesh>
          ))}
        </group>
      ))}
      {[-0.27, 0.27].map((x) => (
        <mesh key={`cpu-cap-${x}`} position={[x, 0.34, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.045, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.76} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

