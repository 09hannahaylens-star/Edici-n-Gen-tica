import React from 'react';
import { ArrowRight, RotateCcw, BookOpen, CheckCircle2, Sparkles, Dna, ArrowDown } from 'lucide-react';
import { DnaCanvas3D } from '../components/DnaCanvas3D';
import { sound } from '../utils/audio';

interface CompletionViewProps {
  score: number;
  onExploreAgain: () => void;
  onOpenProject: () => void;
}

export const CompletionView: React.FC<CompletionViewProps> = ({
  score,
  onExploreAgain,
  onOpenProject,
}) => {
  const investigatedItems = [
    { title: 'ADN y genética', desc: 'Estructura en doble hélice, genes y bases nitrogenadas.' },
    { title: 'CRISPR-Cas9', desc: 'ARN guía complementario y tijera molecular endonucleasa.' },
    { title: 'Enfermedades genéticas', desc: 'Anemia falciforme, talasemias y terapia celular Casgevy.' },
    { title: 'Beneficios y limitaciones', desc: 'Curación potencial frente a riesgos de efectos off-target.' },
    { title: 'Ética y seguridad', desc: 'Frontera entre edición somática y modificaciones germinales.' },
    { title: 'Impactos', desc: 'Equidad en el acceso a la salud, costos y bioseguridad.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn space-y-10">
      {/* Top Banner: MISIÓN COMPLETADA */}
      <div className="text-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Misión Exitosa · Evaluación Aprobada</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">
          MISIÓN COMPLETADA
        </h1>

        <p className="text-lg sm:text-xl text-cyan-300 font-semibold italic">
          «Ahora entendés el recorrido.»
        </p>
      </div>

      {/* Rotating 3D DNA Canvas Feature Box */}
      <div className="p-6 rounded-2xl bg-[#091122] border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-lg h-56 relative flex items-center justify-center">
          <DnaCanvas3D speed={1.5} />
        </div>

        {/* Pathway flow: ADN → CRISPR → EDICIÓN → TRATAMIENTO → IMPACTO */}
        <div className="w-full pt-4 border-t border-slate-800/80">
          <span className="text-[11px] font-mono text-slate-400 uppercase block mb-3 text-center">
            El Ecosistema Conceptual Integrado
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-center">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-cyan-300 font-bold">
              ADN
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-indigo-500/40 text-indigo-300 font-bold">
              CRISPR
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-blue-500/40 text-blue-300 font-bold">
              EDICIÓN
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-300 font-bold">
              TRATAMIENTO
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 font-bold">
              IMPACTO
            </span>
          </div>
        </div>
      </div>

      {/* Investigaste Checklist */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            INVESTIGASTE Y RESOLVISTE:
          </span>
          <span className="text-xs font-mono text-slate-400">
            Aciertos en quiz: {score}/4
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          {investigatedItems.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">{item.title}</span>
                <span className="text-slate-400 text-[11px]">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reflective Closing Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0a1426] to-[#0d1c36] border-2 border-cyan-400/40 text-center shadow-2xl space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
          «CRISPR puede cambiar el ADN.<br />
          <span className="text-cyan-400">¿Cómo decidimos hasta dónde utilizar esa posibilidad?</span>»
        </h2>

        <div className="max-w-md mx-auto py-2 text-sm sm:text-base font-semibold text-slate-300 tracking-wide space-y-1">
          <p className="text-cyan-300">Investigar.</p>
          <p className="text-indigo-300">Comprender.</p>
          <p className="text-purple-300 font-bold">Decidir responsablemente.</p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              sound.playClick();
              onExploreAgain();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-700"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>VOLVER A EXPLORAR</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenProject();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
          >
            <BookOpen className="w-4 h-4" />
            <span>VER EL PROYECTO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
