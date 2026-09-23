import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface OffTargetChallengeProps {
  onSuccess: () => void;
}

export const OffTargetChallenge: React.FC<OffTargetChallengeProps> = ({ onSuccess }) => {
  const targetSequence = 'G G A C T T C C T A G A C C T A T G A T - G G';
  
  const options = [
    {
      id: 'a',
      label: 'Locus Genómico A (Sitio Objetivo Real)',
      sequence: 'G G A C T T C C T A G A C C T A T G A T - G G',
      isTarget: true,
      mismatches: 0,
      note: 'Apareamiento exacto de 20 bases + PAM canónico (AGG).',
    },
    {
      id: 'b',
      label: 'Locus Genómico B (Pseudogen en Cromosoma 4)',
      sequence: 'G G A C T T C C T A G T C C T A T G A T - G G',
      isTarget: false,
      mismatches: 1, // 'T' instead of 'A'
      note: 'Difiere en solo 1 base. Podría ser cortado erróneamente si la enzima tolera un mismatch.',
    },
    {
      id: 'c',
      label: 'Locus Genómico C (Gen no relacionado)',
      sequence: 'G G A C T A C C T A G A C C T A T C A T - T G',
      isTarget: false,
      mismatches: 3,
      note: 'Difiere en 2 bases y en el motivo PAM.',
    },
  ];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'off-target'>('idle');

  const handleSelect = (opt: typeof options[0]) => {
    sound.playClick();
    setSelectedId(opt.id);
    if (opt.isTarget) {
      sound.playSuccess();
      setFeedback('correct');
    } else {
      sound.playError();
      setFeedback('off-target');
    }
  };

  const reset = () => {
    setSelectedId(null);
    setFeedback('idle');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Fase Crítica · Cuestiones de Seguridad</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          ¿QUÉ PUEDE SALIR MAL? EL EFECTO OFF-TARGET
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          En un genoma de más de 3.000 millones de letras existen secuencias muy parecidas. La enzima no debe equivocarse de dirección.
        </p>
      </div>

      {/* Target Guide Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 mb-6 shadow-md">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
          <span>ARN GUÍA CARGADO: COORDENADA OBJETIVO (ON-TARGET)</span>
          <span className="text-slate-400">Longitud: 20 nt + PAM</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg text-center font-mono text-xs sm:text-sm font-bold tracking-wider text-cyan-300 border border-slate-800">
          {targetSequence}
        </div>
      </div>

      {/* Explanatory quote */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 mb-6 italic leading-relaxed">
        «CRISPR debe reconocer la secuencia correcta. Una modificación producida en un lugar diferente al sitio buscado se denomina <strong>efecto off-target</strong> (fuera de diana).»
      </div>

      {/* Challenge Choices */}
      <div className="space-y-3 mb-6">
        <span className="text-xs font-mono text-slate-400 block mb-1">
          Seleccioná cuál de las siguientes tres regiones genómicas corresponde exactamente al sitio deseado:
        </span>
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? opt.isTarget
                    ? 'bg-emerald-950/60 border-emerald-400 ring-2 ring-emerald-500/40'
                    : 'bg-amber-950/60 border-amber-400 ring-2 ring-amber-500/40'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-600 hover:bg-slate-900/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">{opt.label}</span>
                {isSelected && (
                  opt.isTarget ? (
                    <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> OBJETIVO EXACTO
                    </span>
                  ) : (
                    <span className="text-xs text-amber-400 font-mono font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> OFF-TARGET
                    </span>
                  )
                )}
              </div>
              <div className="font-mono text-xs sm:text-sm text-slate-300 tracking-wider bg-slate-900/80 p-2 rounded border border-slate-800">
                {opt.sequence}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Panels */}
      {feedback === 'correct' && (
        <div className="p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 animate-fadeIn space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-emerald-400">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>✅ SECUENCIA CORRECTA IDENTIFICADA</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Identificaste la coincidencia al 100%. En la práctica clínica, los científicos realizan análisis bioinformáticos y secuenciación masiva (NGS) para comprobar que la enzima no realice ningún corte accidental en los otros sitios parecidos.
          </p>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                sound.playSuccess();
                onSuccess();
              }}
              className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>CONTINUAR A ENFERMEDADES GENÉTICAS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {feedback === 'off-target' && (
        <div className="p-5 rounded-xl bg-amber-950/50 border border-amber-500/50 text-amber-200 animate-fadeIn space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>⚠️ POSIBLE EFECTO OFF-TARGET DETECTADO</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Esta secuencia se parece mucho a la buscada, pero difiere en una o más bases. Si Cas9 cortara aquí por error, podría dañar un gen sano o generar una alteración cromosómica no deseada. Por eso, el control de los efectos off-target es uno de los mayores desafíos de seguridad en biotecnología.
          </p>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Probar con otra secuencia</span>
          </button>
        </div>
      )}
    </div>
  );
};
