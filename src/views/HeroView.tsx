import React from 'react';
import { Play, Compass, Dna, Sparkles } from 'lucide-react';
import { DnaCanvas3D } from '../components/DnaCanvas3D';
import { sound } from '../utils/audio';

interface HeroViewProps {
  onStartMission: () => void;
  onExploreHub: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({ onStartMission, onExploreHub }) => {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden grid-bg-pattern px-4 py-8">
      {/* Background imagery with measured dark scrim */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/hero_crispr_dna_1790119432854.jpg"
          alt="CRISPR Cas9 y ADN en 3D"
          className="w-full h-full object-cover opacity-20 filter blur-xs scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/85 to-[#070b14]/70" />
      </div>

      {/* Interactive 3D DNA Canvas backdrop */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-auto">
        <div className="w-full max-w-2xl h-[480px]">
          <DnaCanvas3D speed={1.2} />
        </div>
      </div>

      {/* Main hero card */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Academic context kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Muestra Escolar de Ciencia y Tecnología · Biotecnología 2026</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-2 leading-none drop-shadow-md">
          CRISPR
        </h1>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-widest text-cyan-400 uppercase mb-4 drop-shadow">
          MISIÓN GENÉTICA
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl font-semibold text-slate-200 tracking-wide mb-3">
          Investigá. Editá. Decidí.
        </p>

        {/* Brief phrase */}
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
          «Una experiencia interactiva sobre genética, CRISPR y medicina moderna.»
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => {
              sound.playClick();
              onStartMission();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
          >
            <Play className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition-transform" />
            <span>COMENZAR MISIÓN</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onExploreHub();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Explorar Estaciones</span>
          </button>
        </div>

        {/* Interactive hint */}
        <div className="mt-12 flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Dna className="w-4 h-4 text-cyan-500/70" />
          <span>Tip: Podés arrastrar la molécula de ADN con el cursor para rotarla</span>
        </div>
      </div>
    </div>
  );
};
