import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { ModeloVentilador } from './ModeloVentilador';

export function ModeloRefrigeracion({ hovered }) {
  const rgbColor = hovered ? '#5eead4' : '#14b8a6';
  const pumpColor = hovered ? '#263b3a' : '#0f172a';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* 1. Bloque de Bomba (CPU Waterblock) */}
      <group position={[-0.3, 0.35, 0.45]}>
        {/* Cuerpo cilíndrico de la bomba */}
        <RoundedBox args={[0.88, 0.82, 0.22]} radius={0.14} smoothness={5} position={[0, 0, 0.05]}>
          <meshStandardMaterial color={pumpColor} metalness={0.68} roughness={0.28} />
        </RoundedBox>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.38, 0.28, 40]} />
          <meshStandardMaterial color={pumpColor} metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Anillo de Espejo Infinito RGB */}
        <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.27, 0.035, 12, 36]} />
          <meshStandardMaterial
            color={rgbColor}
            emissive={rgbColor}
            emissiveIntensity={hovered ? 2.5 : 1.2}
          />
        </mesh>

        {/* Logo / Centro de la bomba */}
        <mesh position={[0, 0, 0.18]}>
          <circleGeometry args={[0.19, 32]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.6} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={`pump-fitting-${side}`} position={[side * 0.36, -0.22, 0.02]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.075, 0.075, 0.13, 20]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.84} roughness={0.28} />
          </mesh>
        ))}
      </group>

      {/* 2. Mangueras Malladas Reforzadas (Curvadas hacia el radiador) */}
      <mesh position={[-0.1, 0.9, 0.45]}>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-0.15, -0.4, 0.1),
              new THREE.Vector3(-0.05, 0.2, 0.3),
              new THREE.Vector3(0.1, 0.8, 0.1),
              new THREE.Vector3(0.2, 1.2, -0.1),
            ]),
            24,
            0.05,
            12,
            false,
          ]}
        />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      <mesh position={[0.05, 0.9, 0.45]}>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-0.25, -0.4, 0.05),
              new THREE.Vector3(-0.15, 0.15, 0.2),
              new THREE.Vector3(0.0, 0.75, 0.05),
              new THREE.Vector3(0.1, 1.2, -0.15),
            ]),
            24,
            0.05,
            12,
            false,
          ]}
        />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>

      {/* 3. Radiador Superior de Aluminio de 240mm */}
      <group position={[0.2, 1.6, 0.2]}>
        <RoundedBox args={[2.5, 0.35, 0.7]} radius={0.055} smoothness={3}>
          <meshStandardMaterial color="#1c2732" metalness={0.75} roughness={0.36} />
        </RoundedBox>
        {Array.from({ length: 15 }, (_, indice) => (
          <mesh key={`radiator-fin-${indice}`} position={[-1.12 + indice * 0.16, 0, 0.19]}>
            <boxGeometry args={[0.025, 0.25, 0.26]} />
            <meshStandardMaterial color="#64748b" metalness={0.82} roughness={0.34} />
          </mesh>
        ))}

        {/* Ventiladores superiores de 120mm */}
        {[-0.6, 0.6].map((x, i) => (
          <group key={i} position={[x, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ModeloVentilador
              radio={0.36}
              marcoColor="#334155"
              aspaColor="#0b1118"
              centroColor="#64748b"
              acentoColor={rgbColor}
              intensidadAcento={hovered ? 0.75 : 0.22}
              hovered={hovered}
            />
          </group>
        ))}
      </group>
    </group>
  );
}

