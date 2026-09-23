import React from 'react';
import { X, Award, FileText, CheckCircle2, Compass, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0c1322] border border-cyan-500/30 rounded-xl shadow-2xl p-6 text-slate-200 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono">
              Feria Escolar de Ciencia y Tecnología
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Ficha del Proyecto de Investigación
            </h2>
          </div>
        </div>

        {/* Core content grid */}
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-xs uppercase font-mono text-slate-400 block mb-1">
                Área Temática
              </span>
              <p className="font-semibold text-white">Genética y Biotecnología</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-xs uppercase font-mono text-slate-400 block mb-1">
                Tema General
              </span>
              <p className="font-semibold text-white">Aplicaciones del ADN en la medicina moderna</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/90 border border-cyan-900/50">
            <span className="text-xs uppercase font-mono text-cyan-400 block mb-1">
              Tema Específico
            </span>
            <p className="font-medium text-slate-100">
              Aplicación de la tecnología CRISPR en el tratamiento de enfermedades genéticas.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-2 text-cyan-300 font-semibold text-xs uppercase tracking-wider font-mono">
              <FileText className="w-4 h-4" />
              <span>Pregunta de Investigación</span>
            </div>
            <p className="text-base text-white font-medium italic">
              «¿Cómo contribuye la tecnología CRISPR al tratamiento de enfermedades genéticas en el ámbito de la medicina moderna?»
            </p>
          </div>

          {/* Specific objectives */}
          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-xs uppercase font-mono text-slate-400 block mb-2">
              Objetivos Específicos
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>1. Mecanismo Molecular:</strong> Explicar el funcionamiento de CRISPR-Cas9, el ARN guía y los procesos de reparación del ADN (NHEJ y HDR).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>2. Aplicaciones Clínicas:</strong> Identificar enfermedades genéticas donde se estudia o utiliza la tecnología, diferenciando terapias aprobadas (como Casgevy) de investigaciones en curso.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>3. Evaluación Crítica:</strong> Evaluar beneficios, limitaciones técnicas (como efectos off-target), diferencias entre edición somática y germinal, e impactos éticos, sociales y ambientales.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="font-mono">Divulgación científica conceptual · Nivel educativo</span>
            <span className="text-cyan-400 font-mono">2026</span>
          </div>
        </div>

        {/* Footer action */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors"
          >
            Entendido, volver a la misión
          </button>
        </div>
      </div>
    </div>
  );
};
