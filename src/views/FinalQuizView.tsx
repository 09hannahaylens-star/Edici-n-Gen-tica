import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Award, Sparkles, RefreshCw } from 'lucide-react';
import { QuizQuestion } from '../types';
import { sound } from '../utils/audio';

interface FinalQuizViewProps {
  onQuizCompleted: (score: number) => void;
}

const questionsData: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Qué función cumple principalmente el ARN guía?',
    options: [
      { letter: 'A', text: 'Producir energía', isCorrect: false, explanation: 'Las mitocondrias son las encargadas de producir energía (ATP), no el ARN guía.' },
      { letter: 'B', text: 'Reconocer la secuencia objetivo', isCorrect: true, explanation: '¡Correcto! El ARN guía contiene una secuencia de unos 20 nucleótidos complementaria al ADN diana.' },
      { letter: 'C', text: 'Transportar oxígeno', isCorrect: false, explanation: 'La hemoglobina en los glóbulos rojos transporta oxígeno.' },
      { letter: 'D', text: 'Formar una célula', isCorrect: false, explanation: 'El ARN guía es una molécula sintética guía, no una estructura celular.' },
    ],
  },
  {
    id: 2,
    question: '¿Qué función cumple Cas9?',
    options: [
      { letter: 'A', text: 'Reconocer cualquier enfermedad automáticamente', isCorrect: false, explanation: 'Cas9 no detecta enfermedades por sí sola, necesita el ARN guía programado.' },
      { letter: 'B', text: 'Actuar sobre el ADN realizando un corte en el sitio correspondiente', isCorrect: true, explanation: '¡Exacto! Cas9 es una endonucleasa que produce un corte de doble cadena en la posición guiada.' },
      { letter: 'C', text: 'Transportar sangre', isCorrect: false, explanation: 'El sistema circulatorio se encarga de transportar la sangre.' },
      { letter: 'D', text: 'Crear organismos completos', isCorrect: false, explanation: 'Cas9 es únicamente una tijera molecular de edición a nivel del ADN.' },
    ],
  },
  {
    id: 3,
    question: '¿Qué significa "off-target"?',
    options: [
      { letter: 'A', text: 'Una reparación normal', isCorrect: false, explanation: 'La reparación se produce mediante NHEJ o HDR tras el corte.' },
      { letter: 'B', text: 'Una modificación fuera del sitio objetivo', isCorrect: true, explanation: '¡Muy bien! Un efecto off-target ocurre cuando Cas9 corta una secuencia no deseada pero similar a la diana.' },
      { letter: 'C', text: 'Una enfermedad genética', isCorrect: false, explanation: 'Off-target es un concepto de seguridad de la edición molecular, no una enfermedad en sí.' },
      { letter: 'D', text: 'Una célula especializada', isCorrect: false, explanation: 'No hace referencia a un tipo de célula.' },
    ],
  },
  {
    id: 4,
    question: '¿Cuál es una diferencia fundamental entre edición somática y germinal?',
    options: [
      { letter: 'A', text: 'La edición somática actúa sobre células del individuo tratado y la germinal puede implicar cambios heredables', isCorrect: true, explanation: '¡Correcto! La edición somática no se hereda, mientras que la germinal pasa a generaciones futuras.' },
      { letter: 'B', text: 'Son exactamente iguales', isCorrect: false, explanation: 'Son diametralmente distintas tanto en el tipo celular como en sus consecuencias biológicas y éticas.' },
      { letter: 'C', text: 'Una solamente modifica proteínas', isCorrect: false, explanation: 'Ambas intervienen a nivel de los ácidos nucleicos (ADN).' },
      { letter: 'D', text: 'Ninguna', isCorrect: false, explanation: 'Existe una diferencia fundamental en la herencia y las regulaciones internacionales.' },
    ],
  },
];

export const FinalQuizView: React.FC<FinalQuizViewProps> = ({ onQuizCompleted }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);

  const currentQ = questionsData[currentQuestionIdx];
  const selectedLetter = selectedAnswers[currentQ.id];
  const selectedOption = currentQ.options.find((o) => o.letter === selectedLetter);

  const handleSelectOption = (letter: string) => {
    if (selectedAnswers[currentQ.id]) return; // locked
    sound.playClick();
    const updated = { ...selectedAnswers, [currentQ.id]: letter };
    setSelectedAnswers(updated);

    const opt = currentQ.options.find((o) => o.letter === letter);
    if (opt?.isCorrect) {
      sound.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      sound.playError();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentQuestionIdx < questionsData.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      sound.playSuccess();
      onQuizCompleted(score);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Fase Final · Comprobación de Aprendizajes</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          DESAFÍO FINAL
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Poné a prueba los conceptos investigados durante la misión en este cuestionario interactivo de 4 preguntas.
        </p>

        {/* Progress pills */}
        <div className="flex justify-center gap-2 mt-4">
          {questionsData.map((q, idx) => (
            <div
              key={q.id}
              className={`w-8 h-2 rounded-full transition-colors ${
                idx === currentQuestionIdx
                  ? 'bg-cyan-400'
                  : selectedAnswers[q.id]
                  ? 'bg-emerald-500'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-xl mb-6">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-3 pb-2 border-b border-slate-800">
          <span>PREGUNTA {currentQuestionIdx + 1} DE 4</span>
          <span>Aciertos: {score}</span>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-white mb-6">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt) => {
            const isChosen = selectedLetter === opt.letter;
            const hasAnswered = !!selectedLetter;

            let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-600 hover:bg-slate-900';
            if (hasAnswered) {
              if (opt.isCorrect) {
                btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-1 ring-emerald-500/40';
              } else if (isChosen && !opt.isCorrect) {
                btnStyle = 'bg-rose-950/80 border-rose-400 text-rose-200 ring-1 ring-rose-500/40';
              } else {
                btnStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60';
              }
            }

            return (
              <button
                key={opt.letter}
                onClick={() => handleSelectOption(opt.letter)}
                disabled={hasAnswered}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {opt.letter}
                </span>
                <span className="text-xs sm:text-sm font-medium">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation callout */}
        {selectedOption && (
          <div className={`mt-6 p-4 rounded-xl border text-xs sm:text-sm animate-fadeIn ${
            selectedOption.isCorrect
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold mb-1">
              {selectedOption.isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Respuesta Correcta</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>Respuesta Incorrecta</span>
                </>
              )}
            </div>
            <p>{selectedOption.explanation}</p>
          </div>
        )}
      </div>

      {/* Next question or Finish */}
      {selectedLetter && (
        <div className="flex justify-end animate-fadeIn">
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <span>{currentQuestionIdx < questionsData.length - 1 ? 'SIGUIENTE PREGUNTA' : 'FINALIZAR MISIÓN'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
