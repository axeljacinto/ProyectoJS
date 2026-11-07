import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, ContactShadows } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { PIEZAS_PC } from './piezas.config.js';
import { PiezaPC } from './PiezaPC.jsx';
import { Iluminacion } from './Iluminacion.jsx';
import { Maximize2, Minimize2, Sparkles, Compass, Eye } from 'lucide-react';

function GrupoPC({ explosionada, onSeleccionar, onToggleDesarmar }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Giro suave automático solo cuando está armada y nadie está interactuando
    if (!explosionada && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {PIEZAS_PC.map((pieza) => (
        <PiezaPC
          key={pieza.slug}
          pieza={pieza}
          explosionada={explosionada}
          onSeleccionar={onSeleccionar}
          onToggleDesarmar={onToggleDesarmar}
        />
      ))}
    </group>
  );
}

export function EscenaPC() {
  const [explosionada, setExplosionada] = useState(false);
  const controlsRef = useRef();
  const navigate = useNavigate();

  const handleSeleccionarPieza = (slug) => {
    navigate(`/catalogo?categoria=${slug}`);
  };

  const handleResetCamara = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-[580px] rounded-3xl overflow-hidden border border-slate-800/80 bg-gradient-to-b from-[#0a0f1d] via-[#070a14] to-[#04060a] shadow-2xl shadow-cyan-950/20 group">
      {/* Controles HUD Flotantes Superiores */}
      <div className="absolute top-5 inset-x-5 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Estado actual / Indicador */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg">
          <div className={`w-2.5 h-2.5 rounded-full ${explosionada ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'}`}></div>
          <span className="text-xs font-bold text-slate-200">
            {explosionada ? 'Modo Despiece Activo (Partes Ordenadas)' : 'PC Armada (Haz clic en la torre para desarmar)'}
          </span>
        </div>

        {/* Botones de Acción */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={handleResetCamara}
            className="p-2.5 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md text-slate-300 hover:text-white border border-slate-700/60 rounded-xl text-xs transition-all shadow-md active:scale-95"
            title="Restablecer ángulo de cámara"
          >
            <Compass className="w-4 h-4" />
          </button>

          <button
            onClick={() => setExplosionada(!explosionada)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-lg active:scale-95 backdrop-blur-md border ${
              explosionada
                ? 'bg-cyan-500 hover:bg-cyan-400 text-black border-cyan-400 shadow-cyan-500/25'
                : 'bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border-cyan-500/40 shadow-cyan-500/10 hover:border-cyan-400'
            }`}
          >
            {explosionada ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span>Reensamblar PC Completa</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span>Desarmar PC en Partes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Indicador de ayuda inferior */}
      <div className="absolute bottom-5 inset-x-5 z-20 flex items-center justify-between pointer-events-none text-xs text-slate-400">
        <div className="pointer-events-auto bg-slate-900/80 backdrop-blur px-3.5 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Arrastra con el ratón para rotar 360° • Rueda para zoom</span>
        </div>

        <div className="pointer-events-auto bg-slate-900/80 backdrop-blur px-3.5 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2 text-cyan-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>{explosionada ? 'Haz clic en una pieza para ir a su catálogo' : 'Haz clic en la PC para despiezar'}</span>
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [6.5, 4.5, 8.5], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <Iluminacion />
          
          <Center top position={[0, 0, 0]}>
            <GrupoPC
              explosionada={explosionada}
              onSeleccionar={handleSeleccionarPieza}
              onToggleDesarmar={setExplosionada}
            />
          </Center>

          {/* Sombra de contacto suave en el suelo */}
          <ContactShadows
            position={[0, -2.6, 0]}
            opacity={0.65}
            scale={14}
            blur={2.2}
            far={5}
            color="#000000"
          />

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={4}
            maxDistance={18}
            maxPolarAngle={Math.PI / 2 + 0.15}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
