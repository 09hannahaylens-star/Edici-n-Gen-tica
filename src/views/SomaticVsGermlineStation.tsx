import React, { useState } from 'react';
import { ArrowRight, UserCheck, Users, ShieldAlert, BookOpen, HeartHandshake, HelpCircle, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface SomaticVsGermlineStationProps {
  onComplete: () => void;
  onNextEthics: () => void;
}

export const SomaticVsGermlineStation: React.FC<SomaticVsGermlineStationProps> = ({
  onComplete,
  onNextEthics,
}) => {
  const [selectedType, setSelectedType] = useState<'somatic' | 'germline'>('somatic');
  const [activeDimension, setActiveDimension] = useState<string | null>(null);

  const dimensions = [
    {
      id: 'herencia',
      title: 'Herencia',
      icon: Users,
      somatic: 'Limitada exclusivamente al paciente tratado. Los cambios no se transfieren a los hijos.',
      germline: 'Se transmite permanentemente a toda la descendencia y a futuras generaciones de ese individuo.',
    },
    {
      id: 'seguridad',
      title: 'Seguridad',
      icon: ShieldAlert,
      somatic: 'Los efectos no deseados u off-targets quedan confinados al paciente individual.',
      germline: 'Un error imprevisto pasaría al acervo genético hereditario de toda la estirpe familiar.',
    },
    {
      id: 'regulacion',
      title: 'Regulación',
      icon: BookOpen,
      somatic: 'Permitida y regulada estrictamente como terapia médica (ej. terapias celulares para la sangre).',
      germline: 'Prohibida o bajo moratoria internacional para fines reproductivos en la inmensa mayoría de los países.',
    },
    {
      id: 'consentimiento',
      title: 'Consentimiento',
      icon: HeartHandshake,
      somatic: 'El paciente otorga su consentimiento informado directo antes del tratamiento médico.',
      germline: 'Las generaciones futuras no pueden ser consultadas ni dar consentimiento sobre las alteraciones en su genoma.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fase Crucial · Destino del Genoma</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          SOMÁTICA VS. GERMINAL
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          No toda edición genética tiene las mismas implicancias. El tipo de célula intervenida define si el cambio es individual o hereditario.
        </p>
      </div>

      {/* Two Comparative Big Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Card 1: Somática */}
        <div
          onClick={() => {
            sound.playClick();
            setSelectedType('somatic');
          }}
          className={`p-6 rounded-2xl border transition-all cursor-pointer relative ${
            selectedType === 'somatic'
              ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/40 shadow-xl'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              Uso Clínico Actual
            </span>
            <UserCheck className="w-6 h-6 text-cyan-400" />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            EDICIÓN SOMÁTICA
          </h2>

          <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/20 text-xs sm:text-sm text-cyan-200 italic mb-4 font-medium">
            «Actúa sobre células del organismo tratado y no está destinada a transmitirse a la descendencia.»
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Se aplica a células del cuerpo ya diferenciadas (médula ósea, células epiteliales, neuronas, retina). El tratamiento solo afecta a ese individuo específico durante su vida.
          </p>
        </div>

        {/* Card 2: Germinal */}
        <div
          onClick={() => {
            sound.playClick();
            setSelectedType('germline');
          }}
          className={`p-6 rounded-2xl border transition-all cursor-pointer relative ${
            selectedType === 'germline'
              ? 'bg-purple-950/40 border-purple-400 ring-2 ring-purple-500/40 shadow-xl'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
              Bajo Moratoria Internacional
            </span>
            <Users className="w-6 h-6 text-purple-400" />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            EDICIÓN GERMINAL
          </h2>

          <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/20 text-xs sm:text-sm text-purple-200 italic mb-4 font-medium">
            «Puede afectar células relacionadas con la reproducción y, por lo tanto, las modificaciones podrían transmitirse a futuras generaciones.»
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Se realiza en espermatozoides, óvulos o embriones tempranos. Todo el organismo resultante y sus futuros descendientes llevarán el cambio en cada célula de su cuerpo.
          </p>
        </div>
      </div>

      {/* Deep Dive Section: ¿POR QUÉ ESTA DIFERENCIA IMPORTA? */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl mb-8">
        <h3 className="text-lg font-bold text-white mb-4 text-center sm:text-left flex items-center gap-2">
          <span>¿POR QUÉ ESTA DIFERENCIA IMPORTA?</span>
          <span className="text-xs font-mono text-purple-400 font-normal">
            (Tocá cada dimensión para comparar)
          </span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {dimensions.map((dim) => {
            const Icon = dim.icon;
            const isExpanded = activeDimension === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => {
                  sound.playClick();
                  setActiveDimension(isExpanded ? null : dim.id);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isExpanded
                    ? 'bg-slate-950 border-purple-400/80 shadow-md ring-1 ring-purple-400/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 text-purple-300">
                  <Icon className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">{dim.title}</span>
                </div>
                <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed">
                  <div>
                    <span className="text-cyan-400 font-semibold block">Somática:</span>
                    <span>{dim.somatic}</span>
                  </div>
                  <div className="pt-1 border-t border-slate-800">
                    <span className="text-purple-400 font-semibold block">Germinal:</span>
                    <span>{dim.germline}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reflexive Call to Action */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-900 to-cyan-950/30 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono text-purple-300 block mb-1">
            Espacio de Reflexión y Toma de Decisiones
          </span>
          <p className="text-xs sm:text-sm text-slate-200">
            ¿Cómo ponderar riesgos, beneficios y consentimiento en escenarios reales?
          </p>
        </div>
        <button
          onClick={() => {
            sound.playSuccess();
            onComplete();
            onNextEthics();
          }}
          className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 whitespace-nowrap self-end sm:self-center"
        >
          <span>IR A ESTACIÓN: TENÉS QUE DECIDIR</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
