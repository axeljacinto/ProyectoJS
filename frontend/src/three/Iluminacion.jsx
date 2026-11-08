export function Iluminacion() {
  return (
    <>
      <hemisphereLight skyColor="#f8fafc" groundColor="#64748b" intensity={1.15} />
      <ambientLight intensity={0.8} color="#e2e8f0" />

      {/* Luz principal amplia para revelar forma y materiales del gabinete. */}
      <directionalLight
        position={[7, 9, 8]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <directionalLight
        position={[-7, 5, 4]}
        intensity={1.25}
        color="#dbeafe"
      />

      <directionalLight
        position={[0, 5, -7]}
        intensity={1.1}
        color="#bae6fd"
      />

      <pointLight position={[0, 1.8, 2.8]} intensity={1.5} color="#67e8f9" distance={9} />
      <pointLight position={[-2.2, -0.8, 1.8]} intensity={0.75} color="#bfdbfe" distance={7} />
    </>
  );
}
