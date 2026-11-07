export function Iluminacion() {
  return (
    <>
      {/* Luz ambiente fría de relleno */}
      <ambientLight intensity={0.55} color="#cbd5e1" />

      {/* Luz Principal de Estudio (Key Light blanca fría) */}
      <directionalLight
        position={[8, 12, 8]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Luz Secundaria de Relleno (Fill Light azulada) */}
      <directionalLight
        position={[-8, 8, -6]}
        intensity={0.8}
        color="#38bdf8"
      />

      {/* Luz de Borde / Silueta (Rim Light violeta) */}
      <directionalLight
        position={[0, -5, -8]}
        intensity={0.6}
        color="#a855f7"
      />

      {/* Punto de Luz Neón Superior (simula iluminación RGB de torre gamer) */}
      <pointLight position={[0, 2.5, 0.5]} intensity={1.2} color="#00f2fe" distance={7} />

      {/* Punto de Luz Neón Inferior */}
      <pointLight position={[0, -1.8, 1.0]} intensity={0.8} color="#8b5cf6" distance={6} />
    </>
  );
}
