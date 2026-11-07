import * as THREE from 'three';

export function ModeloRefrigeracion({ hovered }) {
  const rgbColor = hovered ? '#00f2fe' : '#38bdf8';
  const pumpColor = hovered ? '#22d3ee' : '#0f172a';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* 1. Bloque de Bomba (CPU Waterblock) */}
      <group position={[-0.3, 0.35, 0.45]}>
        {/* Cuerpo cilíndrico de la bomba */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.44, 0.35, 32]} />
          <meshStandardMaterial color={pumpColor} metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Anillo de Espejo Infinito RGB */}
        <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.04, 16, 32]} />
          <meshStandardMaterial
            color={rgbColor}
            emissive={rgbColor}
            emissiveIntensity={hovered ? 2.5 : 1.2}
          />
        </mesh>

        {/* Logo / Centro de la bomba */}
        <mesh position={[0, 0, 0.185]}>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#05070b" roughness={0.1} metalness={0.9} />
        </mesh>
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
        <mesh>
          <boxGeometry args={[2.5, 0.35, 0.7]} />
          <meshStandardMaterial color="#0b0f19" metalness={0.85} roughness={0.3} />
        </mesh>

        {/* Dos Ventiladores de 120mm con Aspas RGB */}
        {[-0.6, 0.6].map((x, i) => (
          <group key={i} position={[x, -0.25, 0]}>
            {/* Marco del ventilador */}
            <mesh>
              <boxGeometry args={[1.1, 0.2, 0.65]} />
              <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.6} />
            </mesh>
            {/* Aspas translúcidas con iluminación */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.48, 0.48, 0.1, 24]} />
              <meshStandardMaterial
                color={rgbColor}
                emissive={rgbColor}
                emissiveIntensity={hovered ? 1.8 : 0.8}
                transparent
                opacity={0.7}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

