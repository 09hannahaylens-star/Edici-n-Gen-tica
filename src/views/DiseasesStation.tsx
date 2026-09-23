import React, { useState } from 'react';
import { ArrowRight, Droplet, Microscope, ShieldCheck, Clock, AlertCircle, Info, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface DiseasesStationProps {
  onGoToCasgevy: () => void;
}

export const DiseasesStation: React.FC<DiseasesStationProps> = ({ onGoToCasgevy }) => {
  const [selectedDisease, setSelectedDisease] = useState<'sickle' | 'thalassemia' | 'others'>('sickle');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs font-mono mb-3">
          <Droplet className="w-3.5 h-3.5" />
          <span>Estación 3 · Aplicaciones en Medicina</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          ¿DÓNDE PUEDE APLICARSE CRISPR?
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          La edición génica ha abierto nuevas vías terapéuticas, pero su alcance no es universal. Es fundamental distinguir los avances clínicos aprobados de las áreas en fase de investigación.
        </p>
      </div>

      {/* Disease Selection Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button
          onClick={() => {
            sound.playClick();
            setSelectedDisease('sickle');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            selectedDisease === 'sickle'
              ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/30'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Droplet className="w-4 h-4" />
          <span>Anemia Falciforme</span>
          <span className="text-[10px] bg-rose-950/80 text-rose-300 px-1.5 py-0.5 rounded border border-rose-400/40">
            Aprobada
          </span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setSelectedDisease('thalassemia');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            selectedDisease === 'thalassemia'
              ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/30'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Droplet className="w-4 h-4" />
          <span>β-Talasemia</span>
          <span className="text-[10px] bg-rose-950/80 text-rose-300 px-1.5 py-0.5 rounded border border-rose-400/40">
            Aprobada
          </span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setSelectedDisease('others');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            selectedDisease === 'others'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Microscope className="w-4 h-4" />
          <span>Otras Enfermedades en Investigación</span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
            Fase Clínica
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-8">
        {/* Left: Graphic Visual Card (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative">
          {selectedDisease === 'sickle' && (
            <div className="space-y-4">
              <div className="h-52 rounded-xl overflow-hidden relative border border-rose-500/30">
                <img
                  src="/src/assets/images/sickle_cell_blood_1790119459234.jpg"
                  alt="Glóbulos rojos normales y falciformes"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-sm p-2 rounded text-[11px] text-slate-300 font-mono">
                  Micrografía: Glóbulos bicóncavos vs. eritrocitos falciformes (en hoz)
                </div>
              </div>
              <div>
                <span className="text-xs uppercase font-mono text-rose-400 block mb-1">
                  Mecanismo Patológico
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Una mutación puntual en el gen HBB hace que la hemoglobina polimerice ante baja oxigenación, deformando los glóbulos rojos en forma de hoz, lo cual obstruye vasos sanguíneos y causa intensos episodios de dolor e isquemia.
                </p>
              </div>
            </div>
          )}

          {selectedDisease === 'thalassemia' && (
            <div className="space-y-4">
              <div className="h-52 rounded-xl bg-gradient-to-br from-rose-950/60 to-slate-900 border border-rose-500/30 flex flex-col items-center justify-center p-6 text-center">
                <Droplet className="w-14 h-14 text-rose-400 mb-3" />
                <span className="text-xs uppercase font-mono text-rose-300 font-bold">
                  Déficit Severo de Cadenas de β-Globina
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  Produce anemia hemolítica crónica grave, obligando a los pacientes a transfusiones periódicas de sangre de por vida.
                </p>
              </div>
              <div>
                <span className="text-xs uppercase font-mono text-rose-400 block mb-1">
                  Enfoque con CRISPR
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Al igual que en anemia falciforme, la edición genética permite reactivar la hemoglobina fetal (HbF), supliendo la falta de β-globina funcional y liberando al paciente de la dependencia de transfusiones.
                </p>
              </div>
            </div>
          )}

          {selectedDisease === 'others' && (
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono text-cyan-400 block">
                Patologías en Ensayos Clínicos
              </span>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-bold text-white block">Amaurosis Congénita de Leber (LCA10)</span>
                  <span className="text-slate-400">Edición in vivo en la retina para restaurar visión (Gen CEP290).</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-bold text-white block">Amiloidosis por Transtiretina (hATTR)</span>
                  <span className="text-slate-400">Edición in vivo en el hígado para reducir producción de proteína tóxica TTR.</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-bold text-white block">Distrofia Muscular de Duchenne</span>
                  <span className="text-slate-400">Ensayos preclínicos para saltar exones mutados en distrofina.</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Estatus: Terapia somática ex vivo / in vivo</span>
            <span className="text-rose-400">Evaluación continua</span>
          </div>
        </div>

        {/* Right: Scientific Clarification & Real Case Lead (6 cols) */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase font-mono text-amber-400">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Rigor Científico y Aclaración Crucial</span>
            </div>

            <h3 className="text-base font-bold text-white">
              No todas las enfermedades tienen tratamiento CRISPR
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              La existencia de CRISPR no implica que todas las afecciones genéticas puedan corregirse hoy en día. Las enfermedades monogénicas de la sangre son las primeras beneficiadas porque las células madre sanguíneas pueden extraerse, editarse en laboratorio bajo control riguroso, y reinfundirse al paciente.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Aplicaciones Clínicas Aprobadas:</span>
              </div>
              <p className="text-slate-300 pl-6">
                Casgevy (exagamglogene autotemcel) aprobada por la FDA, MHRA y EMA en 2023–2024 para anemia falciforme y β-talasemia severas.
              </p>
              
              <div className="flex items-center gap-2 text-indigo-400 font-semibold pt-1">
                <Clock className="w-4 h-4" />
                <span>Enfocadas en Investigación:</span>
              </div>
              <p className="text-slate-300 pl-6">
                Órganos sólidos (cerebro, corazón, pulmones) presentan la gran dificultad de cómo entregar la enzima de forma segura a millones de células simultáneamente.
              </p>
            </div>
          </div>

          {/* Card to real case */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/40 border border-rose-500/40 shadow-xl flex flex-col gap-3">
            <span className="text-xs font-mono uppercase text-rose-300">
              Caso Real Pionero
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">
              Caso Real: Casgevy y la Edición Celular
            </h4>
            <p className="text-xs text-slate-300">
              Conocé paso a paso cómo se realiza el tratamiento en el paciente mediante células autólogas y resolvés la simulación del proceso.
            </p>
            <button
              onClick={() => {
                sound.playSuccess();
                onGoToCasgevy();
              }}
              className="py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 self-start"
            >
              <span>EXPLORAR CASO REAL CASGEVY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
