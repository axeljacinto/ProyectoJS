import { DoubleSide, Shape } from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const formaAspa = new Shape();
formaAspa.moveTo(0.06, -0.035);
formaAspa.bezierCurveTo(0.12, -0.13, 0.28, -0.24, 0.43, -0.3);
formaAspa.quadraticCurveTo(0.39, -0.07, 0.24, 0.08);
formaAspa.quadraticCurveTo(0.12, 0.08, 0.06, -0.035);

const ASPAS = Array.from({ length: 7 }, (_, indice) => indice * (Math.PI * 2 / 7));
const TORNILLOS = [
  [-0.32, -0.32],
  [-0.32, 0.32],
  [0.32, -0.32],
  [0.32, 0.32],
];

export function ModeloVentilador({
  radio = 0.4,
  marcoColor = '#334155',
  aspaColor = '#111923',
  centroColor = '#64748b',
  acentoColor = '#14b8a6',
  intensidadAcento = 0.35,
  hovered = false,
}) {
  const escala = radio * 2;
  const aspasRef = useRef();

  useFrame((_, delta) => {
    if (aspasRef.current) {
      aspasRef.current.rotation.z += delta * (hovered ? 5.5 : 1.2);
    }
  });

  return (
    <group scale={[escala, escala, escala]}>
      {/* Aro exterior y canal interior del marco. */}
      <mesh>
        <torusGeometry args={[0.43, 0.045, 10, 40]} />
        <meshStandardMaterial color={marcoColor} metalness={0.55} roughness={0.36} />
      </mesh>
      <mesh position={[0, 0, -0.018]}>
        <torusGeometry args={[0.36, 0.012, 8, 40]} />
        <meshStandardMaterial
          color={acentoColor}
          emissive={acentoColor}
          emissiveIntensity={intensidadAcento}
          metalness={0.25}
          roughness={0.5}
        />
      </mesh>

      {/* Aspas curvas con relieve. */}
      <group ref={aspasRef}>
        {ASPAS.map((angulo) => (
          <mesh key={angulo} rotation={[0, 0, angulo]} position={[0, 0, -0.005]}>
            <extrudeGeometry
              args={[formaAspa, { depth: 0.025, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.006, bevelThickness: 0.004 }]}
            />
            <meshStandardMaterial color={aspaColor} metalness={0.12} roughness={0.62} side={DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* Motor central, tapa y cuatro tornillos del marco. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.055, 32]} />
        <meshStandardMaterial color={centroColor} metalness={0.68} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.031]}>
        <circleGeometry args={[0.095, 32]} />
        <meshStandardMaterial
          color={acentoColor}
          emissive={acentoColor}
          emissiveIntensity={intensidadAcento * 0.65}
        />
      </mesh>
      {TORNILLOS.map(([x, y], indice) => (
        <mesh key={indice} position={[x, y, 0.008]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.035, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}
