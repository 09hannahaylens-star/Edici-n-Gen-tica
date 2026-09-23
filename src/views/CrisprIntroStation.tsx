import React, { useState } from 'react';
import { ArrowRight, Scissors, Compass, Dna, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

interface CrisprIntroStationProps {
  onNextMiniGame: () => void;
}

export const CrisprIntroStation: React.FC<CrisprIntroStationProps> = ({ onNextMiniGame }) => {
  const [activeElement, setActiveElement] = useState<'arn' | 'cas9' | null>('arn');
  const [visitedBoth, setVisitedBoth] = useState({ arn: true, cas9: false });

  const handleSelect = (elem: 'arn' | 'cas9') => {
    sound.playClick();
    setActiveElement(elem);
    setVisitedBoth((prev) => ({ ...prev, [elem]: true }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Station Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Estación 2 · La Herramienta Molecular</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          ¿QUÉ ES CRISPR-CAS9?
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          CRISPR es un sistema de defensa bacteriano adaptado por la ciencia como una tijera molecular de altísima precisión para la edición genética.
        </p>
      </div>

      {/* Interactive 2-Element Molecular Explorer */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Element 1: ARN GUÍA */}
        <div
          onClick={() => handleSelect('arn')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            activeElement === 'arn'
              ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-950/40'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Compass className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono text-cyan-400">Componente 1/2</span>
          </div>

          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <span>ARN GUÍA (gRNA)</span>
            {visitedBoth.arn && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
          </h2>

          <div className="p-3 bg-slate-950/90 rounded-xl border border-cyan-500/20 text-xs sm:text-sm text-cyan-200 italic mb-4 font-medium">
            «El ARN guía orienta al sistema hacia una secuencia específica del ADN.»
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Consiste en una cadena de ARN sintético de unos 20 nucleótidos que se aparea de manera complementaria con la secuencia objetivo exacta que se desea intervenir. Funciona como las "coordenadas GPS" del complejo.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
            <span>Rol: Reconocimiento y direccionamiento</span>
          </div>
        </div>

        {/* Element 2: CAS9 */}
        <div
          onClick={() => handleSelect('cas9')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            activeElement === 'cas9'
              ? 'bg-indigo-950/40 border-indigo-400 ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-950/40'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-400">
              <Scissors className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono text-indigo-400">Componente 2/2</span>
          </div>

          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <span>PROTEÍNA CAS9</span>
            {visitedBoth.cas9 && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
          </h2>

          <div className="p-3 bg-slate-950/90 rounded-xl border border-indigo-500/20 text-xs sm:text-sm text-indigo-200 italic mb-4 font-medium">
            «La proteína Cas9 actúa como una herramienta molecular capaz de cortar el ADN en el sitio seleccionado.»
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Es una enzima endonucleasa dotada de dos dominios catalíticos (RuvC y HNH). Cuando el ARN guía se une al ADN adyacente al motivo PAM, Cas9 desenrolla la hélice y realiza un corte preciso en ambas cadenas.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block" />
            <span>Rol: Escisión catalítica de la doble hélice</span>
          </div>
        </div>
      </div>

      {/* Visual Sequence Pipeline: ARN GUÍA → RECONOCE → CAS9 CORTA */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 mb-8">
        <span className="text-xs font-mono uppercase text-slate-400 block mb-3 text-center sm:text-left">
          Flujo de Acción Molecular
        </span>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <div className="flex-1 p-3 rounded-xl bg-slate-950 border border-cyan-500/30 w-full">
            <span className="text-xs font-mono text-cyan-400 block mb-1">PASO 1</span>
            <span className="text-sm font-bold text-white block">ARN GUÍA</span>
            <span className="text-xs text-slate-400">Carga la secuencia complementaria</span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-500 shrink-0 rotate-90 sm:rotate-0" />

          <div className="flex-1 p-3 rounded-xl bg-slate-950 border border-blue-500/30 w-full">
            <span className="text-xs font-mono text-blue-400 block mb-1">PASO 2</span>
            <span className="text-sm font-bold text-white block">RECONOCIMIENTO</span>
            <span className="text-xs text-slate-400">Inspecciona el ADN y localiza el PAM</span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-500 shrink-0 rotate-90 sm:rotate-0" />

          <div className="flex-1 p-3 rounded-xl bg-slate-950 border border-indigo-500/30 w-full">
            <span className="text-xs font-mono text-indigo-400 block mb-1">PASO 3</span>
            <span className="text-sm font-bold text-white block">CAS9 ACTÚA</span>
            <span className="text-xs text-slate-400">Ejecuta el corte de doble cadena</span>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            sound.playSuccess();
            onNextMiniGame();
          }}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
        >
          <span>PROBAR MINI JUEGO: ARMÁ EL SISTEMA</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
