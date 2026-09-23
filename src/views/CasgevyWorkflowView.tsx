import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, User, Syringe, Scissors, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

interface CasgevyWorkflowViewProps {
  onSuccess: () => void;
}

interface StepItem {
  id: string;
  orderNumber: number;
  label: string;
  shortDesc: string;
  fullDesc: string;
}

const stepsData: StepItem[] = [
  {
    id: 's1',
    orderNumber: 1,
    label: '1. Paciente',
    shortDesc: 'Evaluación y movilización celular',
    fullDesc: 'El paciente diagnosticado con anemia falciforme severa es evaluado. Se administran medicamentos para movilizar las células madre hematopoyéticas de la médula ósea hacia el torrente sanguíneo.',
  },
  {
    id: 's2',
    orderNumber: 2,
    label: '2. Obtención de Células',
    shortDesc: 'Aféresis de células CD34+',
    fullDesc: 'Mediante un procedimiento de aféresis, se recolectan las células madre de la sangre periférica del propio paciente (células autólogas). No hay riesgo de rechazo inmunológico del donante.',
  },
  {
    id: 's3',
    orderNumber: 3,
    label: '3. Edición Genética',
    shortDesc: 'CRISPR-Cas9 en laboratorio ex vivo',
    fullDesc: 'En instalaciones especializadas de alta seguridad biológica, se introduce el complejo CRISPR-Cas9 para editar la región potenciadora del gen BCL11A, apagando el interruptor que silenciaba la hemoglobina fetal.',
  },
  {
    id: 's4',
    orderNumber: 4,
    label: '4. Células Modificadas',
    shortDesc: 'Control de calidad y viabilidad',
    fullDesc: 'Las células editadas se cultivan y se someten a rigurosas pruebas de seguridad molecular (verificando ausencia de off-targets y garantizando alta viabilidad y esterilidad antes de su criopreservación).',
  },
  {
    id: 's5',
    orderNumber: 5,
    label: '5. Reinfusión',
    shortDesc: 'Trasplante autólogo en el paciente',
    fullDesc: 'Tras un acondicionamiento médico previo, las células editadas se infunden de vuelta al paciente vía intravenosa. Anidan en la médula ósea y comienzan a producir glóbulos rojos sanos con hemoglobina fetal.',
  },
];

export const CasgevyWorkflowView: React.FC<CasgevyWorkflowViewProps> = ({ onSuccess }) => {
  const [activeStepId, setActiveStepId] = useState<string>('s1');
  const [mode, setMode] = useState<'info' | 'puzzle'>('info');

  // Mini simulation puzzle state
  // Initial scrambled order: s3, s1, s5, s2, s4
  const [puzzlePool, setPuzzlePool] = useState<StepItem[]>([
    stepsData[2],
    stepsData[0],
    stepsData[4],
    stepsData[1],
    stepsData[3],
  ]);
  const [puzzlePlaced, setPuzzlePlaced] = useState<StepItem[]>([]);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);

  const activeStep = stepsData.find((s) => s.id === activeStepId)!;

  const handlePlaceStep = (step: StepItem) => {
    sound.playClick();
    const newPlaced = [...puzzlePlaced, step];
    const newPool = puzzlePool.filter((s) => s.id !== step.id);
    setPuzzlePlaced(newPlaced);
    setPuzzlePool(newPool);

    if (newPlaced.length === 5) {
      // Check if ordered correctly 1, 2, 3, 4, 5
      const isCorrect = newPlaced.every((s, idx) => s.orderNumber === idx + 1);
      if (isCorrect) {
        sound.playSuccess();
        setPuzzleCompleted(true);
      } else {
        sound.playError();
      }
    }
  };

  const handleResetPuzzle = () => {
    sound.playClick();
    setPuzzlePool([
      stepsData[2],
      stepsData[0],
      stepsData[4],
      stepsData[1],
      stepsData[3],
    ]);
    setPuzzlePlaced([]);
    setPuzzleCompleted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Caso Clínico Real · Hito Médico Mundial</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          CASO REAL: CASGEVY (ANEMIA FALCIFORME)
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Casgevy es la primera terapia génica basada en CRISPR aprobada por agencias reguladoras internacionales para modificar células del propio paciente.
        </p>

        {/* View toggle */}
        <div className="mt-4 inline-flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setMode('info')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              mode === 'info' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Explorar el Recorrido
          </button>
          <button
            onClick={() => {
              setMode('puzzle');
              sound.playClick();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              mode === 'puzzle' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Mini Simulación: Ordená el Proceso
          </button>
        </div>
      </div>

      {mode === 'info' ? (
        <div className="space-y-6">
          {/* Interactive Steps Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {stepsData.map((step) => {
              const isActive = activeStepId === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveStepId(step.id);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-rose-950/60 border-rose-400 ring-2 ring-rose-500/40 shadow-lg'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono text-rose-400 block mb-1">
                    ETAPA 0{step.orderNumber}
                  </span>
                  <span className="text-xs font-bold text-white block truncate">
                    {step.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate mt-1">
                    {step.shortDesc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed step explanation card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-rose-500/30 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-rose-400 uppercase">
                Detalle de la Etapa {activeStep.orderNumber}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Terapia Celular Ex Vivo
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{activeStep.label}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {activeStep.fullDesc}
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 italic">
              «Nota pedagógica: La edición celular ex vivo se realiza fuera del cuerpo del paciente, permitiendo someter a las células a estrictos controles de calidad antes de su reinserción.»
            </div>
          </div>

          {/* Button to puzzle */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                sound.playClick();
                setMode('puzzle');
              }}
              className="px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <span>PONER A PRUEBA: ORDENÁ EL PROCESO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* MINI SIMULATION: ORDENÁ EL PROCESO */
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            Tocá las etapas desordenadas en la parte inferior en el orden conceptual correcto (del 1 al 5) para armar el protocolo del tratamiento.
          </div>

          {/* Placed Steps Timeline */}
          <div className="p-5 rounded-2xl bg-[#091122] border border-cyan-500/30">
            <span className="text-xs font-mono text-cyan-400 uppercase block mb-3">
              Secuencia Armada por el Investigador ({puzzlePlaced.length}/5)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 min-h-[90px]">
              {[0, 1, 2, 3, 4].map((slotIdx) => {
                const placedItem = puzzlePlaced[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className={`p-3 rounded-xl border flex flex-col justify-center text-center transition-all ${
                      placedItem
                        ? 'bg-slate-900 border-cyan-500/50 text-white'
                        : 'bg-slate-950/60 border-dashed border-slate-800 text-slate-600'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">
                      Paso 0{slotIdx + 1}
                    </span>
                    {placedItem ? (
                      <span className="text-xs font-bold text-slate-200">
                        {placedItem.label}
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-600">Vacío</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pool of Available Scrambled Steps */}
          {puzzlePool.length > 0 && (
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase block mb-2">
                Etapas Pendientes (Tocá para colocar la siguiente):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {puzzlePool.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => handlePlaceStep(step)}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-left transition-all hover:bg-slate-800"
                  >
                    <span className="text-xs font-bold text-white block">{step.label}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">{step.shortDesc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results feedback */}
          {puzzlePlaced.length === 5 && !puzzleCompleted && (
            <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs block">El orden no es el correcto.</span>
                <span className="text-[11px] text-slate-300">
                  Recordá: primero se evalúa al paciente, se extraen las células, se editan con CRISPR, se controlan y finalmente se reinfunden.
                </span>
              </div>
              <button
                onClick={handleResetPuzzle}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium ml-3"
              >
                Reintentar
              </button>
            </div>
          )}

          {puzzleCompleted && (
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 animate-fadeIn space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>✅ PROCESO COMPLETADO</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                «La edición genética puede utilizarse para modificar células del propio paciente en determinados tratamientos.»
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onSuccess();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2"
                >
                  <span>CONTINUAR A SOMÁTICA VS. GERMINAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Reset link */}
          {puzzlePlaced.length > 0 && !puzzleCompleted && (
            <div className="flex justify-center">
              <button
                onClick={handleResetPuzzle}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reiniciar orden</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
