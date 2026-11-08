import { RoundedBox } from '@react-three/drei';
import { ModeloVentilador } from './ModeloVentilador';

const TORNILLOS = [
  [-0.72, -0.38], [-0.72, 0.38], [0.72, -0.38], [0.72, 0.38],
];

export function ModeloFuente({ hovered }) {
  const caseColor = hovered ? '#263b3a' : '#17212b';
  const acento = hovered ? '#5eead4' : '#14b8a6';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Chasis ATX con cantos redondeados y paneles separados. */}
      <RoundedBox args={[1.8, 1.1, 1.6]} radius={0.075} smoothness={4}>
        <meshStandardMaterial color={caseColor} metalness={0.68} roughness={0.38} />
      </RoundedBox>
      <mesh position={[0, -0.34, 0.815]}>
        <boxGeometry args={[1.42, 0.18, 0.035]} />
        <meshStandardMaterial color="#334155" metalness={0.74} roughness={0.32} />
      </mesh>

      {/* Ventilador de refrigeración superior. */}
      <group position={[0, 0.565, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ModeloVentilador
          radio={0.42}
          marcoColor="#526273"
          aspaColor="#101820"
          centroColor="#94a3b8"
          acentoColor={acento}
          intensidadAcento={hovered ? 0.75 : 0.25}
          hovered={hovered}
        />
      </group>

      {/* Tornillos de carcasa y etiqueta técnica lateral. */}
      {TORNILLOS.map(([x, y], indice) => (
        <mesh key={`psu-screw-${indice}`} position={[x, y, 0.825]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.025, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.23} />
        </mesh>
      ))}
      <group position={[0, 0, 0.84]}>
        <mesh>
          <planeGeometry args={[1.05, 0.38]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.12} roughness={0.72} />
        </mesh>
        <mesh position={[0, 0.07, 0.012]}>
          <planeGeometry args={[0.7, 0.025]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, -0.08, 0.012]}>
          <planeGeometry args={[0.48, 0.022]} />
          <meshStandardMaterial color={acento} emissive={acento} emissiveIntensity={hovered ? 0.55 : 0.18} />
        </mesh>
      </group>

      {/* Conectores modulares para los cables de alimentación. */}
      <mesh position={[0.91, -0.06, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.36, 0.76]} />
        <meshStandardMaterial color="#0b1118" metalness={0.42} roughness={0.52} />
      </mesh>
      {[-0.42, -0.14, 0.14, 0.42].map((x, indice) => (
        <mesh key={`modular-port-${indice}`} position={[0.94, -0.06, x]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.18, 0.18, 0.035]} />
          <meshStandardMaterial color="#526273" metalness={0.72} roughness={0.34} />
        </mesh>
      ))}

      {/* Entrada de corriente, switch y rejilla posterior. */}
      <group position={[-0.91, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[1.5, 1.0]} />
          <meshStandardMaterial color="#0b1118" metalness={0.76} roughness={0.36} wireframe />
        </mesh>
        <mesh position={[0.42, 0.16, 0.02]}>
          <boxGeometry args={[0.18, 0.28, 0.08]} />
          <meshStandardMaterial color="#b93838" metalness={0.25} roughness={0.45} />
        </mesh>
        <mesh position={[-0.3, 0.1, 0.02]}>
          <boxGeometry args={[0.3, 0.2, 0.06]} />
          <meshStandardMaterial color="#101820" metalness={0.42} roughness={0.48} />
        </mesh>
      </group>
    </group>
  );
}
