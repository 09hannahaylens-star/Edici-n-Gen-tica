import React, { useState } from 'react';
import { ArrowRight, Scale, ShieldAlert, Users, BookOpen, HeartHandshake, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { EthicalDilemma } from '../types';
import { sound } from '../utils/audio';

interface BioethicsStationProps {
  onComplete: () => void;
  onNextImpacts: () => void;
}

const dilemmas: EthicalDilemma[] = [
  {
    id: 'd1',
    title: 'Dilema 1: Terapia Somática de Alto Costo para Enfermedad Severa',
    context: 'Un paciente adulto con anemia falciforme sufre crisis de dolor recurrentes y daño orgánico progresivo. Existe un tratamiento somático basado en CRISPR con alta efectividad clínica, pero su costo de manufactura e infraestructura supera los 2 millones de dólares por persona.',
    question: '¿Qué postura adoptar frente a la aprobación y financiamiento de esta terapia?',
    choices: [
      {
        id: 'c1_a',
        label: 'Aprobar su cobertura pública universal priorizando el derecho a la salud del paciente.',
        consequences: {
          seguridad: 'Tratamiento somático verificado con bajo riesgo para el resto de la población.',
          riesgos: 'Riesgo financiero de desbalancear los presupuestos del sistema de salud para otras enfermedades comunes.',
          herencia: 'Nulo impacto hereditario; las modificaciones no pasan a la descendencia.',
          acceso: 'Garantiza equidad inmediata dentro del país, pero es inviable en países de bajos ingresos sin subsidios globales.',
          regulacion: 'Exige negociaciones complejas con fabricantes farmacéuticos y acuerdos de pago por resultados.',
          equidad: 'Alta justicia social para quienes padecen la enfermedad, aunque con tensión distributiva.',
        },
        reflection: 'Priorizar el acceso universal salva vidas y alivia el sufrimiento, pero desafía la sostenibilidad fiscal de los sistemas sanitarios públicos.',
      },
      {
        id: 'c1_b',
        label: 'Restringir su uso a centros privados o esquemas de copago hasta que los costos bajen por escala.',
        consequences: {
          seguridad: 'Permite acumular mayor seguimiento a largo plazo en cohortes reducidas.',
          riesgos: 'Riesgo de perpetuar una brecha insalvable entre quienes pueden pagar y quienes no.',
          herencia: 'Sin impacto hereditario.',
          acceso: 'Muy restringido a familias con seguros de élite o altos recursos económicos.',
          regulacion: 'Menor presión presupuestaria sobre el estado, pero mayor tensión en derechos humanos.',
          equidad: 'Baja equidad; la supervivencia y calidad de vida quedan condicionadas por la capacidad de pago.',
        },
        reflection: 'Permitir que la maduración tecnológica reduzca los costos es un enfoque de mercado, pero genera profundas desigualdades mientras la tecnología se abarata.',
      },
    ],
  },
  {
    id: 'd2',
    title: 'Dilema 2: Edición en Embriones para Mejoras No Médicas (Enhancement)',
    context: 'Un laboratorio privado ofrece edición germinal en embriones humanos para optimizar capacidades cognitivas, masa muscular o rasgos estéticos que no representan ninguna patología médica.',
    question: '¿Cómo debería responder la sociedad ante solicitudes de edición genética estética o de perfeccionamiento?',
    choices: [
      {
        id: 'c2_a',
        label: 'Prohibir terminantemente cualquier edición germinal destinada a la mejora no médica.',
        consequences: {
          seguridad: 'Evita someter a futuros seres humanos a riesgos no ponderados de efectos off-target con fines superfluos.',
          riesgos: 'Riesgo de que surjan mercados negros o turismo médico en jurisdicciones sin regulación.',
          herencia: 'Protege el patrimonio genético colectivo de experimentos irreversibles sin consenso.',
          acceso: 'Mantiene a raya una división eugenésica artificial entre "editados" y "no editados".',
          regulacion: 'Requiere tratados internacionales vinculantes con supervisión científica estricta.',
          equidad: 'Protege el principio de igualdad biológica fundamental entre todos los seres humanos.',
        },
        reflection: 'La prohibición internacional resguarda la dignidad humana y previene la estratificación biológica, aunque requiere un consenso global difícil de fiscalizar.',
      },
      {
        id: 'c2_b',
        label: 'Permitir la libertad reproductiva de los padres bajo supervisión y pago privado.',
        consequences: {
          seguridad: 'Incierta: los rasgos poligénicos (inteligencia, longevidad) involucran miles de genes con interacciones imprevistas.',
          riesgos: 'Altísimo riesgo de discriminación social, presión psicológica sobre los hijos y desastres biológicos.',
          herencia: 'Las modificaciones se fijarían en el linaje familiar para siempre.',
          acceso: 'Exclusivo para las clases de mayor poder adquisitivo, creando una brecha biológica irreversible.',
          regulacion: 'Imposible de fiscalizar equitativamente.',
          equidad: 'Destrucción de la equidad social básica: los privilegios económicos se convertirían en ventajas biológicas transmitidas.',
        },
        reflection: 'Ampararse en la autonomía individual extrema en materia germinal amenaza con crear sociedades divididas en castas genéticas hereditarias.',
      },
    ],
  },
];

export const BioethicsStation: React.FC<BioethicsStationProps> = ({ onComplete, onNextImpacts }) => {
  const [currentDilemmaIdx, setCurrentDilemmaIdx] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const dilemma = dilemmas[currentDilemmaIdx];
  const selectedChoice = dilemma.choices.find((c) => c.id === selectedChoiceId);

  const handleSelectChoice = (choiceId: string) => {
    sound.playClick();
    setSelectedChoiceId(choiceId);
  };

  const handleNextDilemma = () => {
    sound.playClick();
    if (currentDilemmaIdx < dilemmas.length - 1) {
      setCurrentDilemmaIdx(currentDilemmaIdx + 1);
      setSelectedChoiceId(null);
    } else {
      sound.playSuccess();
      onComplete();
      onNextImpacts();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
          <Scale className="w-3.5 h-3.5 text-purple-400" />
          <span>Estación 4 · Bioética y Deliberación Pública</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          TENÉS QUE DECIDIR
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          En bioética no existen respuestas binarias simples de "correcto" o "incorrecto". Cada elección científica y regulatoria conlleva repercusiones humanas profundas.
        </p>
      </div>

      {/* Dilemma Case Box */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30 shadow-xl mb-6">
        <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-2">
          <span>CASO BIOÉTICO #{currentDilemmaIdx + 1} DE {dilemmas.length}</span>
          <span>Deliberación Ética</span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
          {dilemma.title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
          {dilemma.context}
        </p>

        <h3 className="text-xs sm:text-sm font-semibold text-cyan-300 mb-4">
          {dilemma.question}
        </h3>

        {/* Choices */}
        <div className="space-y-3">
          {dilemma.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            return (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-400 ring-2 ring-purple-500/40 shadow-lg'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-purple-400 bg-purple-500 text-slate-950' : 'border-slate-600'
                  }`}>
                    {isSelected && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className="text-xs sm:text-sm text-white font-medium">
                    {choice.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Consequences To Consider Panel */}
      {selectedChoice && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-slate-200 animate-fadeIn space-y-4 shadow-xl mb-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-cyan-400">
              CONSECUENCIAS A CONSIDERAR TRAS TU ELECCIÓN
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">Seguridad:</span>
              <p className="text-slate-300">{selectedChoice.consequences.seguridad}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">Riesgos:</span>
              <p className="text-slate-300">{selectedChoice.consequences.riesgos}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">Herencia:</span>
              <p className="text-slate-300">{selectedChoice.consequences.herencia}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">Acceso:</span>
              <p className="text-slate-300">{selectedChoice.consequences.acceso}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-blue-400 font-bold block mb-1">Regulación:</span>
              <p className="text-slate-300">{selectedChoice.consequences.regulacion}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-indigo-400 font-bold block mb-1">Equidad:</span>
              <p className="text-slate-300">{selectedChoice.consequences.equidad}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 italic">
            «Reflexión: {selectedChoice.reflection}»
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNextDilemma}
              className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <span>{currentDilemmaIdx < dilemmas.length - 1 ? 'SIGUIENTE DILEMA' : 'AVANZAR A IMPACTOS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
