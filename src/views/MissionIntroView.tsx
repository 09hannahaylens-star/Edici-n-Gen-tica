import React from 'react';
import { ArrowRight, Dna, Microscope, Droplet, AlertTriangle, Scale, Globe, Target } from 'lucide-react';
import { sound } from '../utils/audio';

interface MissionIntroViewProps {
  onAcceptMission: () => void;
}

export const MissionIntroView: React.FC<MissionIntroViewProps> = ({ onAcceptMission }) => {
  const missionPillars = [
    {
      icon: Dna,
      title: 'Cómo funciona el ADN',
      desc: 'El código biológico fundamental y la estructura de los genes.',
      color: 'text-cyan-400',
      border: 'border-cyan-500/20',
      bg: 'bg-cyan-950/20',
    },
    {
      icon: Microscope,
      title: 'Cómo actúa CRISPR-Cas9',
      desc: 'La precisión del ARN guía y la enzima Cas9 que corta la doble hélice.',
      color: 'text-indigo-400',
      border: 'border-indigo-500/20',
      bg: 'bg-indigo-950/20',
    },
    {
      icon: Droplet,
      title: 'Aplicación a enfermedades genéticas',
      desc: 'Terapias en células de la sangre como Casgevy frente a anemia falciforme.',
      color: 'text-rose-400',
      border: 'border-rose-500/20',
      bg: 'bg-rose-950/20',
    },
    {
      icon: AlertTriangle,
      title: 'Beneficios y limitaciones',
      desc: 'El potencial de curación y los desafíos de efectos fuera de diana (off-target).',
      color: 'text-amber-400',
      border: 'border-amber-500/20',
      bg: 'bg-amber-950/20',
    },
    {
      icon: Scale,
      title: 'Ética y seguridad',
      desc: 'Diferencias clave entre edición somática y modificaciones germinales heredables.',
      color: 'text-purple-400',
      border: 'border-purple-500/20',
      bg: 'bg-purple-950/20',
    },
    {
      icon: Globe,
      title: 'Impactos en la sociedad',
      desc: 'Implicancias sociales, económicas, de equidad en salud y ambientales.',
      color: 'text-emerald-400',
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-950/20',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
      {/* Top mission briefing badge */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
          <Target className="w-3.5 h-3.5" />
          <span>Fase 0 · Informe de Misión</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          TU MISIÓN
        </h1>
        <p className="text-lg sm:text-xl text-cyan-200 font-medium italic max-w-2xl mx-auto border-l-2 border-cyan-400 pl-4 py-1 text-left sm:text-center sm:border-l-0 sm:pl-0">
          «Investigar cómo la tecnología CRISPR puede contribuir al tratamiento de enfermedades genéticas.»
        </p>
      </div>

      {/* Progressive Pillars Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {missionPillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl ${item.bg} border ${item.border} backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:border-cyan-400/40`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-slate-900/90 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-white text-sm">
                  {item.title}
                </h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Call to action */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <button
          onClick={() => {
            sound.playSuccess();
            onAcceptMission();
          }}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group"
        >
          <span>ACEPTAR MISIÓN</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
