import * as THREE from 'three';

export function ModeloGPU({ hovered }) {
  const shroudColor = hovered ? '#00f2fe' : '#0f172a';
  const logoColor = hovered ? '#00f2fe' : '#38bdf8';

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* 1. Shroud / Carcasa Principal de la GPU */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 1.25, 0.45]} />
        <meshStandardMaterial color={shroudColor} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 2. Backplate Metálico Trasero */}
      <mesh position={[0, 0, -0.24]}>
        <boxGeometry args={[2.78, 1.22, 0.04]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* 3. Aletas de Disipación de Aluminio Visibles (Fin stack) */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[2.6, 1.1, 0.35]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} wireframe />
      </mesh>

      {/* 4. Dos Ventiladores Axiales Grandes */}
      {[-0.65, 0.65].map((x, i) => (
        <group key={i} position={[x, 0, 0.24]}>
          {/* Aro del ventilador */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.04, 16, 32]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Centro / Rodamiento */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.06, 24]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Aspas con acabado mate */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.46, 0.46, 0.02, 11]} />
            <meshStandardMaterial color="#0b0f19" roughness={0.6} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* 5. Logo Lateral Iluminado ("GEFORCE RTX") */}
      <group position={[0, 0.64, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 0.1, 0.46]} />
          <meshStandardMaterial color="#05070b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <planeGeometry args={[1.3, 0.06]} />
          <meshStandardMaterial
            color={logoColor}
            emissive={logoColor}
            emissiveIntensity={hovered ? 2.5 : 1.2}
          />
        </mesh>
      </group>

      {/* 6. Conector PCIe x16 Dorado (Interfaz de conexión a placa) */}
      <mesh position={[-0.4, -0.68, 0]}>
        <boxGeometry args={[1.5, 0.14, 0.05]} />
        <meshStandardMaterial color="#eab308" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* 7. Placa de Puertos Traseros (Bracket I/O) */}
      <mesh position={[-1.42, 0, 0]}>
        <boxGeometry args={[0.06, 1.45, 0.48]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
}

