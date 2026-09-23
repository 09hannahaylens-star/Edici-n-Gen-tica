import React from 'react';
import { X, Target, Compass, Sparkles, AlertTriangle, Layers, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, onResetProgress }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0c1322] border border-cyan-500/30 rounded-xl shadow-2xl p-6 text-slate-200 overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-lg bg-indigo-950 border border-indigo-500/40 text-indigo-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono">
              Instrucciones para visitantes
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              ¿Cómo interactuar con la aplicación?
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold">
              <Target className="w-4 h-4" />
              <span>Modo Misión (Recomendado)</span>
            </div>
            <p className="text-slate-400">
              Te lleva paso a paso por toda la secuencia científica: desde la estructura del ADN, el ensamblado de Cas9, el corte molecular, las vías de reparación, hasta los dilemas éticos y el cuestionario final.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold">
              <Compass className="w-4 h-4" />
              <span>Modo Exploración Libre</span>
            </div>
            <p className="text-slate-400">
              Ideal si tenés pocos minutos en el stand. Podés hacer clic en cualquiera de las 5 estaciones desde el Centro de Investigación o la barra superior para explorar solo lo que te interese.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold">
              <Layers className="w-4 h-4" />
              <span>Interacciones y Minijuegos</span>
            </div>
            <p className="text-slate-400">
              Tocá los botones, deslizadores y tarjetas interactivas. Podés arrastrar o rotar la molécula 3D de ADN con el mouse o el dedo, probar cortes de secuencias y tomar decisiones éticas.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200/90 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <span>
              <strong>Enfoque pedagógico:</strong> Toda la información es de carácter conceptual y educativo. No incluye protocolos ni directivas de laboratorio.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
            <button
              onClick={() => {
                sound.playClick();
                onResetProgress();
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar progreso de la sesión</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
