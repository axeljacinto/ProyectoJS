import * as THREE from 'three';

const RUTAS_CABLES = [
  {
    color: '#101820',
    radius: 0.024,
    puntos: [
      [-0.24, 1.48, -1.42],
      [-0.42, 1.18, -1.55],
      [-0.48, 0.55, -1.62],
      [-0.4, -0.35, -1.56],
      [-0.15, -1.1, -1.5],
      [0, -1.41, -1.41],
    ],
  },
  {
    color: '#263544',
    radius: 0.03,
    puntos: [
      [-0.52, 0.9, -1.3],
      [-0.84, 0.72, -1.48],
      [-0.88, 0.1, -1.55],
      [-0.72, -0.76, -1.52],
      [-0.28, -1.22, -1.46],
      [0, -1.41, -1.41],
    ],
  },
  {
    color: '#263544',
    radius: 0.022,
    puntos: [
      [-0.52, 1.8, 1.3],
      [-0.88, 1.62, 1.42],
      [-0.93, 0.85, 1.48],
      [-0.9, -0.4, 1.42],
      [-0.55, -1.17, 0.9],
      [-0.1, -1.3, -0.65],
      [0, -1.41, -1.41],
    ],
  },
];

export function CablesPC() {
  return (
    <group>
      {RUTAS_CABLES.map(({ color, radius, puntos }, indice) => {
        const curva = new THREE.CatmullRomCurve3(
          puntos.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
          false,
          'catmullrom',
          0.45
        );

        return (
          <mesh key={`cable-${indice}`}>
            <tubeGeometry args={[curva, 40, radius, 8, false]} />
            <meshStandardMaterial color={color} metalness={0.22} roughness={0.72} />
          </mesh>
        );
      })}
    </group>
  );
}
