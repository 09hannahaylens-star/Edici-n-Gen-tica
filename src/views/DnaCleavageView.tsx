import React, { useState } from 'react';
import { ArrowRight, Scissors, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { DnaCanvas3D } from '../components/DnaCanvas3D';
import { sound } from '../utils/audio';

interface DnaCleavageViewProps {
  onNextRepair: () => void;
}

export const DnaCleavageView: React.FC<DnaCleavageViewProps> = ({ onNextRepair }) => {
  const [stage, setStage] = useState<'dna' | 'recognition' | 'cut'>('dna');
  const [cleaved, setCleaved] = useState(false);

  const handleStartCleavage = () => {
    sound.playClick();
    setStage('recognition');
    
    setTimeout(() => {
      sound.playCut();
      setStage('cut');
      setCleaved(true);
    }, 1200);
  };

  const handleReset = () => {
    sound.playClick();
    setStage('dna');
    setCleaved(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Scissors className="w-3.5 h-3.5" />
          <span>Fase Catalítica Molecular</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          EL CORTE DEL ADN
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Observá la secuencia dinámica en tiempo real: desde el escaneo de la doble hélice hasta la escisión catalítica de doble cadena (DSB).
        </p>
      </div>

      {/* Sequential status bar */}
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mb-6 text-center text-xs font-mono">
        <div className={`p-2 rounded-lg border transition-colors ${
          stage === 'dna' ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          1. ADN
        </div>
        <div className={`p-2 rounded-lg border transition-colors ${
          stage === 'recognition' ? 'bg-indigo-950 border-indigo-400 text-indigo-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          2. RECONOCIMIENTO
        </div>
        <div className={`p-2 rounded-lg border transition-colors ${
          stage === 'cut' ? 'bg-rose-950 border-rose-400 text-rose-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          3. CORTE (DSB)
        </div>
      </div>

      {/* Visual Canvas Stage */}
      <div className="p-6 rounded-2xl bg-[#091122] border border-cyan-500/30 shadow-2xl relative overflow-hidden mb-6 flex flex-col items-center">
        {/* Animated DNA Canvas showing separation */}
        <div className="w-full h-72 sm:h-80 relative flex items-center justify-center">
          <DnaCanvas3D
            isCleaved={cleaved}
            cleaveProgress={cleaved ? 1 : 0}
            highlightIndex={12}
            speed={cleaved ? 0.4 : 1}
          />

          {/* Molecular indicator overlays */}
          {stage === 'recognition' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse">
              <div className="bg-indigo-950/80 border border-indigo-400 px-4 py-2 rounded-xl text-xs font-mono text-indigo-200 shadow-xl backdrop-blur-sm">
                🔍 Apareamiento de bases con ARN Guía + Verificación PAM (NGG)...
              </div>
            </div>
          )}

          {stage === 'cut' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-fadeIn">
              <div className="p-3 rounded-full bg-rose-500/20 border-2 border-rose-500 text-rose-400 shadow-2xl flex items-center gap-2 px-4 py-2 backdrop-blur-sm">
                <Scissors className="w-5 h-5 text-rose-400 animate-bounce" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                  Corte de Doble Cadena Realizado
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Trigger button */}
        {!cleaved && stage === 'dna' && (
          <button
            onClick={handleStartCleavage}
            className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/30"
          >
            <Scissors className="w-4 h-4" />
            <span>ACTIVAR CAS9 Y EJECUTAR CORTE</span>
          </button>
        )}

        {cleaved && (
          <button
            onClick={handleReset}
            className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repetir animación del corte</span>
          </button>
        )}
      </div>

      {/* Educational Explanation Box */}
      {cleaved ? (
        <div className="p-6 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-slate-200 animate-fadeIn space-y-4 shadow-xl">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="font-semibold text-white">
                «Una vez identificado el sitio correspondiente, Cas9 puede realizar un corte en el ADN.»
              </p>
              <p className="text-slate-300 leading-relaxed">
                Este corte preciso interrumpe la continuidad física del genoma en una coordenada específica. Sin embargo:
              </p>
              <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-200 font-medium text-xs sm:text-sm">
                «Pero cortar el ADN no es el final del proceso. Ahora hay que repararlo.»
              </div>
              <p className="text-slate-400 text-xs">
                La célula no tolera cortes en su genoma: activa inmediatamente su maquinaria biológica de reparación. Es en esa etapa de reparación donde se produce la edición genética deseada.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                sound.playSuccess();
                onNextRepair();
              }}
              className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-md shadow-cyan-500/20"
            >
              <span>¿CÓMO SE REPARA?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-400 font-mono">
          Presioná el botón «Activar Cas9» para iniciar el reconocimiento molecular y observar la escisión.
        </div>
      )}
    </div>
  );
};
