import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Scissors, Compass, Dna, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface CrisprAssemblyGameProps {
  onSuccess: () => void;
}

export const CrisprAssemblyGame: React.FC<CrisprAssemblyGameProps> = ({ onSuccess }) => {
  // Slots: slot 1: Cas9, slot 2: ARN Guía, slot 3: ADN Objetivo
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState<boolean>(false);

  const components = [
    { id: 'adn', name: 'ADN Objetivo', icon: Dna, role: 'Secuencia diana en el genoma', color: 'from-amber-500/20 to-amber-700/20 text-amber-300 border-amber-500/40' },
    { id: 'arn', name: 'ARN Guía (gRNA)', icon: Compass, role: 'Sonda complementaria de localización', color: 'from-cyan-500/20 to-cyan-700/20 text-cyan-300 border-cyan-500/40' },
    { id: 'cas9', name: 'Proteína Cas9', icon: Scissors, role: 'Enzima endonucleasa de corte', color: 'from-indigo-500/20 to-indigo-700/20 text-indigo-300 border-indigo-500/40' },
  ];

  const handleToggleItem = (id: string) => {
    if (isActivated) return;
    sound.playClick();
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      const updated = [...selectedItems, id];
      setSelectedItems(updated);
      if (updated.length === 3) {
        sound.playSuccess();
        setIsActivated(true);
      }
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedItems([]);
    setIsActivated(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mini Juego · Ensamblaje Ribonucleoproteico</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          ARMÁ EL SISTEMA CRISPR
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Para que la edición funcione, los tres componentes moleculares deben acoplarse en un único complejo biológico activo. Tocá cada uno para integrarlo en la cámara de reacción.
        </p>
      </div>

      {/* Assembly Chamber (The Dock) */}
      <div className="p-6 rounded-2xl bg-[#091122] border-2 border-cyan-500/30 shadow-2xl relative overflow-hidden mb-8">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs font-mono">
          <span className="text-slate-400">CÁMARA MOLECULAR</span>
          <span className={isActivated ? 'text-emerald-400 font-bold' : 'text-cyan-400'}>
            ESTADO: {isActivated ? '● COMPLEJO ACTIVO (RNP)' : '◯ ESPERANDO COMPONENTES'}
          </span>
        </div>

        {/* Visual Assembly Arena */}
        <div className="min-h-[160px] flex flex-col sm:flex-row items-center justify-center gap-4 py-6">
          {selectedItems.length === 0 ? (
            <div className="text-center text-xs text-slate-500 font-mono py-8">
              Seleccioná los 3 elementos moleculares abajo para acoplarlos
            </div>
          ) : (
            selectedItems.map((id) => {
              const comp = components.find((c) => c.id === id)!;
              const Icon = comp.icon;
              return (
                <div
                  key={id}
                  className={`p-4 rounded-xl bg-slate-900 border ${comp.color} flex flex-col items-center justify-center text-center animate-fadeIn w-48 shadow-lg`}
                >
                  <Icon className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold text-white block">{comp.name}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">{comp.role}</span>
                </div>
              );
            })
          )}
        </div>

        {/* Success Banner when activated */}
        {isActivated && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 animate-fadeIn flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-900/80 text-emerald-300">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-emerald-300">
                  ✅ SISTEMA CRISPR ACTIVADO
                </h3>
                <p className="text-xs text-slate-200 mt-0.5">
                  El ARN guía se une a la enzima Cas9 formando una ribonucleoproteína (RNP) que ya está lista para hibridar con el ADN objetivo.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                onSuccess();
              }}
              className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 self-end sm:self-center"
            >
              <span>VER EL CORTE DEL ADN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Available Components Selector */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {components.map((comp) => {
          const isSelected = selectedItems.includes(comp.id);
          const Icon = comp.icon;
          return (
            <button
              key={comp.id}
              onClick={() => handleToggleItem(comp.id)}
              disabled={isActivated}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400 shadow-md'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              } ${isActivated ? 'opacity-70 cursor-default' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-slate-900 ${comp.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">Tocar para acoplar</span>
                )}
              </div>
              <h4 className="font-bold text-sm text-white mb-1">{comp.name}</h4>
              <p className="text-xs text-slate-400">{comp.role}</p>
            </button>
          );
        })}
      </div>

      {/* Reset button */}
      {selectedItems.length > 0 && !isActivated && (
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reiniciar acople</span>
          </button>
        </div>
      )}
    </div>
  );
};
