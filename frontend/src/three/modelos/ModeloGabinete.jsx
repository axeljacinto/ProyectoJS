import { useTheme } from '../../context/ThemeContext';

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
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[2.3, 0.1, 4.4]} />
        <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Botón de encendido con aro LED */}
      <mesh position={[0.7, 2.26, 1.8]}>
        <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
        <meshStandardMaterial color={rgbColor} emissive={rgbColor} emissiveIntensity={hovered ? 1.1 : 0.45} />
      </mesh>

      {/* Panel Inferior con patas */}
      <mesh position={[0, -2.1, 0]}>
        <boxGeometry args={[2.3, 0.15, 4.4]} />
        <meshStandardMaterial color={metalColor} metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Patas del gabinete (4 esquinas) */}
      {[[-0.9, 1.8], [0.9, 1.8], [-0.9, -1.8], [0.9, -1.8]].map(([x, z], i) => (
        <mesh key={i} position={[x, -2.25, z]}>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 16]} />
          <meshStandardMaterial color={isLight ? '#71818b' : '#05070b'} roughness={0.9} />
        </mesh>
      ))}

      {/* Panel Trasero con rejillas I/O y slots PCIe */}
      <mesh position={[0, 0.05, -2.15]}>
        <boxGeometry args={[2.2, 4.2, 0.1]} />
        <meshStandardMaterial color={metalColor} metalness={0.85} roughness={0.35} />
      </mesh>

      {/* Panel Frontal con Malla / Mesh de Flujo de Aire */}
      <group position={[0, 0.05, 2.15]}>
        <mesh>
          <boxGeometry args={[2.25, 4.2, 0.15]} />
          <meshStandardMaterial color={frontColor} metalness={0.35} roughness={0.55} />
        </mesh>
        {[-1.25, 0, 1.25].map((y) => (
          <group key={`front-fan-${y}`} position={[0, y, 0.1]}>
            <mesh>
              <torusGeometry args={[0.43, 0.045, 10, 40]} />
              <meshStandardMaterial
                color={rgbColor}
                emissive={rgbColor}
                emissiveIntensity={0.35}
                metalness={0.25}
                roughness={0.45}
              />
            </mesh>
            {[0, 1, 2].map((blade) => (
              <mesh key={blade} rotation={[0, 0, blade * Math.PI / 3]} position={[0, 0, 0.025]}>
                <boxGeometry args={[0.09, 0.34, 0.025]} />
                <meshStandardMaterial color={fanBladeColor} metalness={0.2} roughness={0.55} />
              </mesh>
            ))}
            <mesh position={[0, 0, 0.055]}>
              <circleGeometry args={[0.13, 24]} />
              <meshStandardMaterial color={frameColor} metalness={0.5} roughness={0.35} />
            </mesh>
          </group>
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

