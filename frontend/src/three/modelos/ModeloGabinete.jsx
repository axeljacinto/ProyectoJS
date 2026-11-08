import { RoundedBox } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';
import { ModeloVentilador } from './ModeloVentilador';

export function ModeloGabinete({ explosionada, hovered }) {
  const theme = useTheme();
  const isLight = theme === 'light';
  const metalColor = hovered
    ? (isLight ? '#c4e6e1' : '#2dd4bf')
    : (isLight ? '#e4eaee' : '#1c2732');
  const interiorColor = isLight ? '#b9c4ca' : '#111923';
  const frontColor = isLight ? '#f4f7f8' : '#111a24';
  const frameColor = isLight ? '#71818b' : '#526273';
  const fanBladeColor = isLight ? '#aebbc2' : '#0b0f19';
  const rgbColor = isLight ? '#0f766e' : '#5eead4';

  return (
    <group>
      {/* Estructura Principal del Chasis */}
      {/* Panel Superior con rejilla de ventilación */}
      <RoundedBox args={[2.3, 0.1, 4.4]} radius={0.045} smoothness={3} position={[0, 2.2, 0]}>
        <meshStandardMaterial color={metalColor} metalness={0.72} roughness={0.34} />
      </RoundedBox>

      {/* Botón de encendido con aro LED */}
      <mesh position={[0.7, 2.26, 1.8]}>
        <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
        <meshStandardMaterial color={rgbColor} emissive={rgbColor} emissiveIntensity={hovered ? 1.1 : 0.45} />
      </mesh>
      {[-0.02, 0.18].map((x) => (
        <mesh key={`top-port-${x}`} position={[x, 2.258, 1.8]}>
          <boxGeometry args={[0.13, 0.025, 0.19]} />
          <meshStandardMaterial color={isLight ? '#687984' : '#080d12'} metalness={0.35} roughness={0.55} />
        </mesh>
      ))}

      {/* Panel Inferior con patas */}
      <RoundedBox args={[2.3, 0.15, 4.4]} radius={0.055} smoothness={3} position={[0, -2.1, 0]}>
        <meshStandardMaterial color={metalColor} metalness={0.72} roughness={0.38} />
      </RoundedBox>

      {/* Patas del gabinete (4 esquinas) */}
      {[[-0.9, 1.8], [0.9, 1.8], [-0.9, -1.8], [0.9, -1.8]].map(([x, z], i) => (
        <mesh key={i} position={[x, -2.25, z]}>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 16]} />
          <meshStandardMaterial color={isLight ? '#71818b' : '#05070b'} roughness={0.9} />
        </mesh>
      ))}

      {/* Panel Trasero con rejillas I/O y slots PCIe */}
      <RoundedBox args={[2.2, 4.2, 0.1]} radius={0.06} smoothness={3} position={[0, 0.05, -2.15]}>
        <meshStandardMaterial color={metalColor} metalness={0.75} roughness={0.38} />
      </RoundedBox>
      {[0.3, 0.55, 0.8, 1.05, 1.3, 1.55].map((y) => (
        <mesh key={`pci-slot-${y}`} position={[-0.26, y, -2.075]}>
          <boxGeometry args={[0.62, 0.12, 0.025]} />
          <meshStandardMaterial color={frameColor} metalness={0.78} roughness={0.3} />
        </mesh>
      ))}

      {/* Panel Frontal con Malla / Mesh de Flujo de Aire */}
      <group position={[0, 0.05, 2.15]}>
        <RoundedBox args={[2.25, 4.2, 0.15]} radius={0.055} smoothness={3}>
          <meshStandardMaterial color={frontColor} metalness={0.32} roughness={0.58} />
        </RoundedBox>
        {/* Tres ventiladores frontales visibles detrás de la rejilla de entrada. */}
        {[-1.25, 0, 1.25].map((y) => (
          <group key={`front-fan-${y}`} position={[0, y, 0.1]}>
            <ModeloVentilador
              radio={0.43}
              marcoColor={frameColor}
              aspaColor={fanBladeColor}
              centroColor={isLight ? '#8b9aa2' : '#334155'}
              acentoColor={rgbColor}
              intensidadAcento={hovered ? 0.75 : 0.22}
              hovered={hovered}
            />
          </group>
        ))}

        {/* Rejilla de entrada de aire colocada delante de los ventiladores. */}
        {Array.from({ length: 25 }, (_, index) => (
          <mesh key={`front-grille-${index}`} position={[0, -1.92 + index * 0.16, 0.145]}>
            <boxGeometry args={[2.05, 0.035, 0.035]} />
            <meshStandardMaterial color={frameColor} metalness={0.58} roughness={0.42} />
          </mesh>
        ))}
        {[-1.04, 1.04].map((x) => (
          <mesh key={`front-rail-${x}`} position={[x, 0, 0.13]}>
            <boxGeometry args={[0.055, 4.05, 0.06]} />
            <meshStandardMaterial color={frameColor} metalness={0.64} roughness={0.36} />
          </mesh>
        ))}
      </group>

      {/* Panel Derecho (Metal ciego) */}
      <mesh position={[-1.1, 0.05, 0]}>
        <boxGeometry args={[0.1, 4.2, 4.3]} />
        <meshStandardMaterial color={interiorColor} metalness={0.7} roughness={0.5} />
      </mesh>

      {/* Shroud / Compartimento de la Fuente de Poder (PSU Basement) */}
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[2.1, 1.45, 4.2]} />
        <meshStandardMaterial color={interiorColor} metalness={0.55} roughness={0.5} />
      </mesh>

      {/* Panel lateral transparente y marco para dejar visibles las piezas internas. */}
      <group position={[1.12, 0.05, 0]}>
        <mesh>
          <boxGeometry args={[0.04, 4.15, 4.25]} />
          <meshPhysicalMaterial
            color={isLight ? '#ffffff' : '#8197a7'}
            metalness={0.15}
            roughness={0.28}
            transmission={isLight ? 0.2 : 0.28}
            transparent
            opacity={explosionada ? 0.07 : (isLight ? 0.12 : 0.2)}
            reflectivity={0.35}
            clearcoat={0.35}
            clearcoatRoughness={0.3}
            depthWrite={false}
          />
        </mesh>

        {[-1, 1].map((z) => (
          <mesh key={`side-rail-${z}`} position={[0.035, 0, z * 2.05]}>
            <boxGeometry args={[0.09, 4.18, 0.1]} />
            <meshStandardMaterial color={frameColor} metalness={0.62} roughness={0.38} />
          </mesh>
        ))}
        {[-1, 1].map((y) => (
          <mesh key={`top-rail-${y}`} position={[0.035, y * 2.02, 0]}>
            <boxGeometry args={[0.09, 0.1, 4.12]} />
            <meshStandardMaterial color={frameColor} metalness={0.62} roughness={0.38} />
          </mesh>
        ))}

        {/* Tornillos moleteados de cristal en las esquinas */}
        {[[-1.8, 1.8], [-1.8, -1.8], [1.8, 1.8], [1.8, -1.8]].map(([y, z], i) => (
          <mesh key={i} position={[0.03, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

