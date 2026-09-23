import React from 'react';
import { AppScreen, StationProgress } from '../types';
import { Dna, Microscope, Droplet, Scale, Globe, FlaskConical, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { sound } from '../utils/audio';

interface ResearchHubViewProps {
  progress: StationProgress;
  onSelectStation: (screen: AppScreen) => void;
  onStartMainMission: () => void;
}

export const ResearchHubView: React.FC<ResearchHubViewProps> = ({
  progress,
  onSelectStation,
  onStartMainMission,
}) => {
  const stations: {
    id: keyof StationProgress;
    name: string;
    icon: React.ElementType;
    screen: AppScreen;
    desc: string;
    completed: boolean;
    color: string;
  }[] = [
    {
      id: 'dna',
      name: 'ADN Y GENÉTICA',
      icon: Dna,
      screen: 'dna-zoom',
      desc: 'Zoom molecular desde el cuerpo humano hasta el gen y mini-desafío de mutación.',
      completed: progress.dna,
      color: 'text-cyan-400 border-cyan-500/30 hover:border-cyan-400',
    },
    {
      id: 'crispr',
      name: 'CRISPR-CAS9',
      icon: Microscope,
      screen: 'crispr-intro',
      desc: 'ARN guía, enzima Cas9, corte de doble cadena y vías de reparación (NHEJ vs HDR).',
      completed: progress.crispr && progress.repair,
      color: 'text-indigo-400 border-indigo-500/30 hover:border-indigo-400',
    },
    {
      id: 'diseases',
      name: 'ENFERMEDADES',
      icon: Droplet,
      screen: 'diseases',
      desc: 'Anemia falciforme, talasemias, caso real Casgevy y simulación del proceso ex vivo.',
      completed: progress.diseases,
      color: 'text-rose-400 border-rose-500/30 hover:border-rose-400',
    },
    {
      id: 'ethics',
      name: 'ÉTICA Y SEGURIDAD',
      icon: Scale,
      screen: 'ethics-decision',
      desc: 'Somática vs Germinal, dilemas éticos y consecuencias multidimensionales a considerar.',
      completed: progress.ethics && progress.somatic,
      color: 'text-purple-400 border-purple-500/30 hover:border-purple-400',
    },
    {
      id: 'impacts',
      name: 'IMPACTOS',
      icon: Globe,
      screen: 'impacts',
      desc: 'Análisis de impacto social, económico, bioseguridad ambiental y equidad en salud.',
      completed: progress.impacts,
      color: 'text-emerald-400 border-emerald-500/30 hover:border-emerald-400',
    },
  ];

  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalCount = 8;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] px-4 py-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Background lab photo with subtle dark overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="/src/assets/images/crispr_bioethics_lab_1790119470654.jpg"
          alt="Centro de Investigación CRISPR"
          className="w-full h-full object-cover opacity-15 filter blur-xs"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#070b14]/90 to-[#070b14]" />
      </div>

      {/* Top Header Hub */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono mb-3">
          <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
          <span>Centro de Investigación de Biotecnología Genómica</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          CENTRO DE INVESTIGACIÓN
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Podés explorar libremente cada estación temática o activar la misión guiada completa.
        </p>

        {/* Global Progress bar */}
        <div className="mt-4 max-w-md mx-auto bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
            <span>Progreso General</span>
            <span className="text-cyan-400 font-bold">{completedCount}/{totalCount} Fases ({percent}%)</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Hub Layout */}
      <div className="grid lg:grid-cols-3 gap-6 items-stretch mb-8">
        {/* Left 2 Stations */}
        <div className="space-y-4 flex flex-col justify-center">
          {stations.slice(0, 2).map((st) => (
            <StationCard
              key={st.id}
              station={st}
              onSelect={() => {
                sound.playClick();
                onSelectStation(st.screen);
              }}
            />
          ))}
        </div>

        {/* Center: MISIÓN PRINCIPAL card */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-cyan-950/60 via-[#0d1829] to-indigo-950/50 border-2 border-cyan-500/50 shadow-xl shadow-cyan-950/30 text-center relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors" />
          
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 mb-4 animate-pulse-subtle">
            <FlaskConical className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 mb-1">
            Recorrido Completo Recomendado
          </span>
          <h2 className="text-2xl font-bold text-white mb-2">
            MISIÓN PRINCIPAL
          </h2>
          <p className="text-xs text-slate-300 mb-6 max-w-xs leading-relaxed">
            Secuencia guiada: ADN → CRISPR → Corte molecular → Reparación → Casgevy → Bioética → Desafío Final.
          </p>

          <button
            onClick={() => {
              sound.playSuccess();
              onStartMainMission();
            }}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>ACTIVAR MISIÓN GUIADA</span>
          </button>
        </div>

        {/* Right 3 Stations */}
        <div className="space-y-4 flex flex-col justify-center">
          {stations.slice(2).map((st) => (
            <StationCard
              key={st.id}
              station={st}
              onSelect={() => {
                sound.playClick();
                onSelectStation(st.screen);
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer Navigation Tip */}
      <div className="text-center text-xs text-slate-500 font-mono py-2 border-t border-slate-800/80">
        Tocá cualquier estación para investigar sus contenidos y resolver sus desafíos interactivos.
      </div>
    </div>
  );
};

interface StationCardProps {
  station: {
    id: string;
    name: string;
    icon: React.ElementType;
    screen: AppScreen;
    desc: string;
    completed: boolean;
    color: string;
  };
  onSelect: () => void;
}

const StationCard: React.FC<StationCardProps> = ({ station, onSelect }) => {
  const Icon = station.icon;
  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-xl bg-slate-900/80 border text-left transition-all hover:translate-y-[-2px] hover:bg-slate-800/90 relative ${station.color}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">{station.name}</h3>
            {station.completed ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                <CheckCircle2 className="w-3 h-3" /> COMPLETADA
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-mono">
                DISPONIBLE
              </span>
            )}
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-500 mt-1" />
      </div>
      <p className="text-xs text-slate-300 leading-relaxed pl-1">
        {station.desc}
      </p>
    </button>
  );
};
