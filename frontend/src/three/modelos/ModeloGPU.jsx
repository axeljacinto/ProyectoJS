import { RoundedBox } from '@react-three/drei';
import { ModeloVentilador } from './ModeloVentilador';

const FINES = Array.from({ length: 22 }, (_, index) => index);
const TORNILLOS = [
  [-1.5, -0.48], [-1.5, 0.48], [-0.5, -0.48], [-0.5, 0.48],
  [0.5, -0.48], [0.5, 0.48], [1.5, -0.48], [1.5, 0.48],
];

export function ModeloGPU({ hovered }) {
  const shroudColor = hovered ? '#0f766e' : '#19232d';
  const fanFrameColor = hovered ? '#43615e' : '#34414d';
  const logoColor = hovered ? '#5eead4' : '#14b8a6';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Carcasa de doble ranura con bordes biselados. */}
      <RoundedBox args={[3.4, 1.25, 0.48]} radius={0.075} smoothness={4}>
        <meshStandardMaterial color={shroudColor} metalness={0.62} roughness={0.34} />
      </RoundedBox>
      <mesh position={[0, 0.61, 0.02]}>
        <boxGeometry args={[3.15, 0.035, 0.42]} />
        <meshStandardMaterial color="#526273" metalness={0.78} roughness={0.3} />
      </mesh>

      {/* Tres ventiladores axiales con aspas curvas, buje y tornillos. */}
      {[-1.05, 0, 1.05].map((x) => (
        <group key={`gpu-fan-${x}`} position={[x, 0.02, 0.27]}>
          <ModeloVentilador
            radio={0.34}
            marcoColor={fanFrameColor}
            aspaColor="#111923"
            centroColor="#71818b"
            acentoColor={logoColor}
            intensidadAcento={hovered ? 0.85 : 0.18}
            hovered={hovered}
          />
        </group>
      ))}

      {/* Placa trasera con fijaciones y aletas expuestas del disipador. */}
      <RoundedBox args={[3.36, 1.21, 0.045]} radius={0.05} smoothness={3} position={[0, 0, -0.265]}>
        <meshStandardMaterial color="#334155" metalness={0.84} roughness={0.28} />
      </RoundedBox>
      {FINES.map((fin) => (
        <mesh key={`gpu-fin-${fin}`} position={[-1.55 + fin * 0.147, -0.02, -0.04]}>
          <boxGeometry args={[0.035, 0.82, 0.26]} />
          <meshStandardMaterial color={fin % 2 ? '#64748b' : '#7c8b96'} metalness={0.86} roughness={0.3} />
        </mesh>
      ))}
      {TORNILLOS.map(([x, y], index) => (
        <mesh key={`gpu-screw-${index}`} position={[x, y, -0.294]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.018, 12]} />
          <meshStandardMaterial color="#d2d9dd" metalness={0.9} roughness={0.24} />
        </mesh>
      ))}

      {/* Etiqueta lateral y conector de energía de 8 pines. */}
      <RoundedBox args={[1.42, 0.14, 0.045]} radius={0.025} smoothness={2} position={[0, 0.69, 0.02]}>
        <meshStandardMaterial color="#0b1118" metalness={0.38} roughness={0.48} />
      </RoundedBox>
      <mesh position={[0, 0.695, 0.047]}>
        <planeGeometry args={[0.92, 0.035]} />
        <meshStandardMaterial color={logoColor} emissive={logoColor} emissiveIntensity={hovered ? 0.9 : 0.35} />
      </mesh>
      <mesh position={[1.02, 0.55, 0.02]}>
        <boxGeometry args={[0.28, 0.16, 0.2]} />
        <meshStandardMaterial color="#0b1118" metalness={0.35} roughness={0.5} />
      </mesh>

      {/* Conector PCIe, bracket y salidas de vídeo. */}
      <mesh position={[-0.4, -0.68, -0.22]}>
        <boxGeometry args={[1.5, 0.14, 0.05]} />
        <meshStandardMaterial color="#c69c37" metalness={0.92} roughness={0.22} />
      </mesh>
      <RoundedBox args={[0.07, 1.42, 0.5]} radius={0.025} smoothness={2} position={[1.7, 0, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.24} />
      </RoundedBox>
      {[-0.38, 0, 0.38].map((y, index) => (
        <mesh key={`display-port-${index}`} position={[1.745, y, 0.02]}>
          <boxGeometry args={[0.025, 0.16, 0.22]} />
          <meshStandardMaterial color="#0b1118" metalness={0.45} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
