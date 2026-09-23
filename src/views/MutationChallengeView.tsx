import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, HelpCircle, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface MutationChallengeViewProps {
  onSuccess: () => void;
}

interface Codon {
  id: number;
  label: string;
  normalSequence: string;
  mutatedSequence: string;
  aminoNormal: string;
  aminoMutated: string;
  isMutatedTarget: boolean;
}

export const MutationChallengeView: React.FC<MutationChallengeViewProps> = ({ onSuccess }) => {
  const codons: Codon[] = [
    { id: 1, label: 'Codón 4', normalSequence: 'ACT', mutatedSequence: 'ACT', aminoNormal: 'Treonina', aminoMutated: 'Treonina', isMutatedTarget: false },
    { id: 2, label: 'Codón 5', normalSequence: 'CCT', mutatedSequence: 'CCT', aminoNormal: 'Prolina', aminoMutated: 'Prolina', isMutatedTarget: false },
    { id: 3, label: 'Codón 6', normalSequence: 'GAG', mutatedSequence: 'GTG', aminoNormal: 'Ácido Glutámico', aminoMutated: 'Valina', isMutatedTarget: true },
    { id: 4, label: 'Codón 7', normalSequence: 'GAG', mutatedSequence: 'GAG', aminoNormal: 'Ácido Glutámico', aminoMutated: 'Ácido Glutámico', isMutatedTarget: false },
    { id: 5, label: 'Codón 8', normalSequence: 'AAG', mutatedSequence: 'AAG', aminoNormal: 'Lisina', aminoMutated: 'Lisina', isMutatedTarget: false },
  ];

  const [selectedCodonId, setSelectedCodonId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const handleSelect = (codon: Codon) => {
    sound.playClick();
    setSelectedCodonId(codon.id);
    if (codon.isMutatedTarget) {
      sound.playSuccess();
      setFeedback('correct');
    } else {
      sound.playError();
      setFeedback('wrong');
    }
  };

  const resetChallenge = () => {
    setSelectedCodonId(null);
    setFeedback('idle');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mini Desafío 1 · Detección Molecular</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          ENCONTRÁ LA ALTERACIÓN
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Compará la secuencia de ADN de referencia (normal) con la muestra bajo investigación del gen HBB. Tocá el codón que contiene la alteración genética puntual.
        </p>
      </div>

      {/* Comparison Container */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl mb-6">
        {/* Row 1: Secuencia Normal */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>SECUENCIA DE REFERENCIA (NORMAL)</span>
            <span className="text-cyan-400 font-semibold">β-Globina funcional</span>
          </div>
          <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center font-mono">
            {codons.map((codon) => (
              <div
                key={codon.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800"
              >
                <span className="text-[10px] text-slate-500 block mb-1">{codon.label}</span>
                <span className="text-sm sm:text-base font-bold text-slate-200 tracking-wider">
                  {codon.normalSequence}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  {codon.aminoNormal}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider with Scanner indicator */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-cyan-500/30" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-900 px-3 py-1 rounded text-cyan-400 font-mono text-[11px] border border-cyan-500/20">
              ▼ Comparación con Muestra de Paciente ▼
            </span>
          </div>
        </div>

        {/* Row 2: Secuencia del Paciente (Interactive selection) */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>SECUENCIA DEL PACIENTE (TOCÁ LA REGIÓN OBJETIVO)</span>
            <span className="text-amber-400 font-semibold">Buscar mutación puntual</span>
          </div>
          <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center font-mono">
            {codons.map((codon) => {
              const isSelected = selectedCodonId === codon.id;
              return (
                <button
                  key={codon.id}
                  onClick={() => handleSelect(codon)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? codon.isMutatedTarget
                        ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500/50'
                        : 'bg-rose-950/70 border-rose-400 ring-2 ring-rose-500/50'
                      : 'bg-slate-950/90 border-slate-700 hover:border-cyan-400 hover:bg-slate-800/80'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 block mb-1">{codon.label}</span>
                  <span className={`text-sm sm:text-base font-bold tracking-wider ${
                    codon.isMutatedTarget && feedback === 'correct' ? 'text-amber-300' : 'text-white'
                  }`}>
                    {codon.mutatedSequence}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {codon.aminoMutated}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback Panels */}
      {feedback === 'correct' && (
        <div className="p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 animate-fadeIn space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>✅ OBJETIVO IDENTIFICADO</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            ¡Exacto! El Codón 6 presenta una mutación puntual de una sola base: <strong>GAG</strong> (Ácido Glutámico) cambió a <strong>GTG</strong> (Valina). Este mínimo cambio causa la anemia falciforme.
          </p>
          <div className="p-3 bg-slate-900/80 rounded-lg border border-emerald-500/30 text-xs sm:text-sm text-cyan-200 italic font-medium">
            «Para intentar modificar una secuencia específica necesitamos una herramienta capaz de reconocerla.»
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={onSuccess}
              className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>CONOCER CRISPR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {feedback === 'wrong' && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 animate-fadeIn space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>No es esa posición</span>
          </div>
          <p className="text-xs text-slate-300">
            Esa región es idéntica a la secuencia de referencia. Observá detalladamente las letras de cada codón para encontrar la letra que cambió.
          </p>
          <button
            onClick={resetChallenge}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Volver a intentar</span>
          </button>
        </div>
      )}
    </div>
  );
};
