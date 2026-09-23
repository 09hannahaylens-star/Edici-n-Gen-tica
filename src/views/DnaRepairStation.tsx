import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, GitMerge, FileCode, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface DnaRepairStationProps {
  onComplete: () => void;
  onNextOffTarget: () => void;
}

export const DnaRepairStation: React.FC<DnaRepairStationProps> = ({ onComplete, onNextOffTarget }) => {
  const [activePathway, setActivePathway] = useState<'nhej' | 'hdr'>('nhej');
  const [quizAnswers, setQuizAnswers] = useState<{ q1: 'nhej' | 'hdr' | null; q2: 'nhej' | 'hdr' | null }>({
    q1: null,
    q2: null,
  });

  const handleSelectQuiz = (q: 'q1' | 'q2', val: 'nhej' | 'hdr') => {
    sound.playClick();
    const updated = { ...quizAnswers, [q]: val };
    setQuizAnswers(updated);
    if (updated.q1 === 'nhej' && updated.q2 === 'hdr') {
      sound.playSuccess();
      onComplete();
    }
  };

  const isChallengeSolved = quizAnswers.q1 === 'nhej' && quizAnswers.q2 === 'hdr';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mecanismos Celulares de Reparación</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          REPARACIÓN DEL ADN: DOS CAMINOS
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Tras el corte provocado por Cas9, la célula activa enzimas propias para sellar la rotura. El resultado final depende de cuál vía se utilice.
        </p>
      </div>

      {/* Split Pathway Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Pathway 1: NHEJ */}
        <div
          onClick={() => {
            sound.playClick();
            setActivePathway('nhej');
          }}
          className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            activePathway === 'nhej'
              ? 'bg-amber-950/30 border-amber-500/60 ring-2 ring-amber-500/30 shadow-xl'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">
              Vía Rápida / Ruptura
            </span>
            <GitMerge className="w-5 h-5 text-amber-400" />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            NHEJ — Reparación por unión de extremos
          </h2>
          <p className="text-xs font-mono text-slate-400 mb-4">
            Non-Homologous End Joining
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Los dos extremos rotos del ADN vuelven a unirse directamente. Durante este proceso rápido suelen ocurrir pequeños errores biológicos (inserciones o deleciones de letras).
          </p>

          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="text-amber-300 font-semibold block">Efecto terapéutico habitual:</span>
            <p>
              Inactivación génica (<strong>Knock-out</strong>). Al provocar un error en la lectura, se puede "apagar" un gen defectuoso que causa daño al organismo.
            </p>
          </div>
        </div>

        {/* Pathway 2: HDR */}
        <div
          onClick={() => {
            sound.playClick();
            setActivePathway('hdr');
          }}
          className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            activePathway === 'hdr'
              ? 'bg-cyan-950/30 border-cyan-500/60 ring-2 ring-cyan-500/30 shadow-xl'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              Vía Dirigida / Reemplazo
            </span>
            <FileCode className="w-5 h-5 text-cyan-400" />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            HDR — Reparación dirigida por homología
          </h2>
          <p className="text-xs font-mono text-slate-400 mb-4">
            Homology-Directed Repair
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            La célula utiliza una secuencia de referencia como molde para reconstruir la zona rota con alta fidelidad y sin introducir errores fortuitos.
          </p>

          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="text-cyan-300 font-semibold block">Efecto terapéutico habitual:</span>
            <p>
              Corrección precisa (<strong>Knock-in</strong>). Se aporta un fragmento molde sintético con la secuencia corregida para subsanar una mutación puntual.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Association Mini-Challenge */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl mb-8">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-white">
            Mini Desafío: Asociá cada caso clínico con su vía biológica
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Situation 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-xs text-slate-200">
              <strong>Situación A:</strong> «Apagar un interruptor genético para evitar que se bloquee la producción de hemoglobina fetal en glóbulos rojos.»
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleSelectQuiz('q1', 'nhej')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-colors ${
                  quizAnswers.q1 === 'nhej'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                Vía NHEJ (Inactivar)
              </button>
              <button
                onClick={() => handleSelectQuiz('q1', 'hdr')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-colors ${
                  quizAnswers.q1 === 'hdr'
                    ? 'bg-rose-950 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                Vía HDR (Molde)
              </button>
            </div>
            {quizAnswers.q1 === 'nhej' && (
              <span className="text-[11px] text-emerald-400 block font-mono">
                ✓ Correcto: Casgevy usa NHEJ para inactivar el represor BCL11A.
              </span>
            )}
          </div>

          {/* Situation 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-xs text-slate-200">
              <strong>Situación B:</strong> «Sustituir una letra mutada específica (T por A) insertando una cadena molde sintética idéntica a la sana.»
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleSelectQuiz('q2', 'nhej')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-colors ${
                  quizAnswers.q2 === 'nhej'
                    ? 'bg-rose-950 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                Vía NHEJ (Inactivar)
              </button>
              <button
                onClick={() => handleSelectQuiz('q2', 'hdr')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-colors ${
                  quizAnswers.q2 === 'hdr'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                Vía HDR (Molde)
              </button>
            </div>
            {quizAnswers.q2 === 'hdr' && (
              <span className="text-[11px] text-emerald-400 block font-mono">
                ✓ Correcto: HDR requiere un molde de ADN para reescribir con precisión.
              </span>
            )}
          </div>
        </div>

        {isChallengeSolved && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 animate-fadeIn flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">
                ¡Excelente! Comprendiste cómo la biología celular repara el corte molecular.
              </span>
            </div>
            <button
              onClick={() => {
                sound.playSuccess();
                onNextOffTarget();
              }}
              className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <span>SIGUIENTE: ¿QUÉ PUEDE SALIR MAL?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
