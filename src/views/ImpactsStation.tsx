import React, { useState } from 'react';
import { ArrowRight, Users, DollarSign, Leaf, Sparkles, CheckCircle2, ChevronDown, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

interface ImpactsStationProps {
  onComplete: () => void;
  onNextQuiz: () => void;
}

export const ImpactsStation: React.FC<ImpactsStationProps> = ({ onComplete, onNextQuiz }) => {
  const [activeArea, setActiveArea] = useState<'social' | 'economic' | 'environmental'>('social');
  const [readSections, setReadSections] = useState<Record<string, boolean>>({
    social: true,
    economic: false,
    environmental: false,
  });

  const handleSelectArea = (area: 'social' | 'economic' | 'environmental') => {
    sound.playClick();
    setActiveArea(area);
    const updated = { ...readSections, [area]: true };
    setReadSections(updated);
    if (Object.values(updated).every(Boolean)) {
      onComplete();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Estación 5 · Evaluación Integral</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          IMPACTOS: SOCIAL, ECONÓMICO Y AMBIENTAL
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          La biotecnología no ocurre en un vacío de laboratorio: interactúa directamente con los sistemas de salud pública, la economía de las naciones y el medio ambiente.
        </p>
      </div>

      {/* 3 Interactive Area Selector Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {/* Social */}
        <button
          onClick={() => handleSelectArea('social')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            activeArea === 'social'
              ? 'bg-cyan-950/50 border-cyan-400 ring-2 ring-cyan-500/40 shadow-xl'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
            {readSections.social && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
          </div>
          <h2 className="text-base font-bold text-white mb-1">Impacto Social</h2>
          <p className="text-xs text-slate-400">
            Pacientes, calidad de vida, desigualdades y alfabetización científica.
          </p>
        </button>

        {/* Economic */}
        <button
          onClick={() => handleSelectArea('economic')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            activeArea === 'economic'
              ? 'bg-amber-950/50 border-amber-400 ring-2 ring-amber-500/40 shadow-xl'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-amber-950 border border-amber-500/30 text-amber-400">
              <DollarSign className="w-5 h-5" />
            </div>
            {readSections.economic && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
          </div>
          <h2 className="text-base font-bold text-white mb-1">Impacto Económico</h2>
          <p className="text-xs text-slate-400">
            I+D de alta complejidad, infraestructura, costos y sustentabilidad.
          </p>
        </button>

        {/* Environmental */}
        <button
          onClick={() => handleSelectArea('environmental')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            activeArea === 'environmental'
              ? 'bg-emerald-950/50 border-emerald-400 ring-2 ring-emerald-500/40 shadow-xl'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
            {readSections.environmental && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>
          <h2 className="text-base font-bold text-white mb-1">Impacto Ambiental</h2>
          <p className="text-xs text-slate-400">
            Bioseguridad, residuos de reactivos y aplicaciones en ecosistemas.
          </p>
        </button>
      </div>

      {/* Dynamic Detail Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl mb-8">
        {activeArea === 'social' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase pb-2 border-b border-slate-800">
              <Users className="w-4 h-4" />
              <span>Dimensión Social y Comunitaria</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Posibles beneficios para pacientes:</span>
                <p className="text-slate-300">
                  Posibilidad de remisión duradera de los síntomas clínicos en enfermedades genéticas crónicas anteriormente intratables.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Transformación en la calidad de vida:</span>
                <p className="text-slate-300">
                  Cese del dolor isquémico crónico, reducción de hospitalizaciones continuas e independencia de transfusiones de sangre.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-300 block">Desigualdad en el acceso:</span>
                <p className="text-slate-300">
                  La gran mayoría de los pacientes con anemia falciforme viven en África subsahariana y regiones en desarrollo, donde la infraestructura médica para trasplante autólogo y edición celular aún no está disponible.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-300 block">Importancia de la información científica:</span>
                <p className="text-slate-300">
                  La divulgación rigurosa evita expectativas mágicas o desinformación, empoderando a la ciudadanía para participar en los debates públicos.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeArea === 'economic' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase pb-2 border-b border-slate-800">
              <DollarSign className="w-4 h-4" />
              <span>Dimensión Económica y Productiva</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Investigación especializada:</span>
                <p className="text-slate-300">
                  Requiere décadas de financiación científica básica, secuenciación genómica de última generación y patentes biotecnológicas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Infraestructura y personal especializado:</span>
                <p className="text-slate-300">
                  Demanda salas limpias con certificación GMP, bioprocesamiento celular criogénico y equipos interdisciplinarios altamente calificados.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-300 block">Costos de los tratamientos:</span>
                <p className="text-slate-300">
                  El precio de lista de Casgevy ronda los 2,2 millones de dólares por paciente. Aunque ahorra costos médicos futuros de transfusiones hospitalarias, genera un impacto presupuestario mayúsculo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-rose-300 block">Desigualdad económica internacional:</span>
                <p className="text-slate-300">
                  Existe el riesgo de que solo los países de mayores ingresos puedan costear estas terapias, ensanchando la brecha sanitaria global.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeArea === 'environmental' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase pb-2 border-b border-slate-800">
              <Leaf className="w-4 h-4" />
              <span>Dimensión Ambiental y Bioseguridad</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Recursos en investigación de laboratorio:</span>
                <p className="text-slate-300">
                  Uso intensivo de plásticos biomédicos desechables, energía en ultracongeladores a -80°C y reactivos moleculares enzimáticos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Generación de residuos biológicos y químicos:</span>
                <p className="text-slate-300">
                  Manejo de material celular humano, vectores virales de entrega y reactivos que requieren esterilización en autoclave y trazabilidad estricta.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-300 block">Necesidad de bioseguridad:</span>
                <p className="text-slate-300">
                  Protocolos de contención BSL-2 / BSL-3 para resguardar a los investigadores y al medio ambiente de posibles contaminaciones biológicas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-300 block">Implicancias en ecosistemas abiertos:</span>
                <p className="text-slate-300">
                  En aplicaciones como <em>Gene Drive</em> (impulsores génicos para controlar mosquitos de malaria), cualquier liberación al medio ambiente puede alterar cadenas tróficas y requiere análisis de impacto ecológico previo.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Button to Final Quiz */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30">
        <div>
          <span className="text-xs uppercase font-mono text-emerald-300 block mb-1">
            Evaluación Final de la Misión
          </span>
          <p className="text-xs sm:text-sm text-slate-200">
            ¡Has completado las estaciones de investigación! Comprobá lo aprendido en el Desafío Final.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playSuccess();
            onNextQuiz();
          }}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap self-end sm:self-center"
        >
          <span>IR AL DESAFÍO FINAL</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
