import React, { useState } from 'react';
import { ArrowRight, Dna, User, Disc, Eye, CheckCircle2, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';
import { DnaCanvas3D } from '../components/DnaCanvas3D';
import { sound } from '../utils/audio';

interface DnaZoomStationProps {
  onComplete: () => void;
  onNextChallenge: () => void;
}

type ZoomLevel = 'cuerpo' | 'celula' | 'nucleo' | 'adn' | 'gen';

export const DnaZoomStation: React.FC<DnaZoomStationProps> = ({ onComplete, onNextChallenge }) => {
  const [level, setLevel] = useState<ZoomLevel>('cuerpo');
  const [visited, setVisited] = useState<Record<ZoomLevel, boolean>>({
    cuerpo: true,
    celula: false,
    nucleo: false,
    adn: false,
    gen: false,
  });

  const levels: { id: ZoomLevel; name: string; icon: React.ElementType }[] = [
    { id: 'cuerpo', name: 'Cuerpo Humano', icon: User },
    { id: 'celula', name: 'Célula', icon: Disc },
    { id: 'nucleo', name: 'Núcleo Celular', icon: Eye },
    { id: 'adn', name: 'Doble Hélice (ADN)', icon: Dna },
    { id: 'gen', name: 'Gen Específico', icon: Sparkles },
  ];

  const handleSelectLevel = (newLevel: ZoomLevel) => {
    sound.playClick();
    setLevel(newLevel);
    const updated = { ...visited, [newLevel]: true };
    setVisited(updated);
    if (Object.values(updated).every(Boolean)) {
      onComplete();
    }
  };

  const currentIdx = levels.findIndex((l) => l.id === level);

  const zoomNext = () => {
    if (currentIdx < levels.length - 1) {
      handleSelectLevel(levels[currentIdx + 1].id);
    }
  };

  const zoomPrev = () => {
    if (currentIdx > 0) {
      handleSelectLevel(levels[currentIdx - 1].id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Top Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Estación 1 · Arquitectura Molecular
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ADN Y GENÉTICA: ZOOM MOLECULAR
          </h1>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-lg overflow-x-auto">
          {levels.map((lvl, idx) => (
            <button
              key={lvl.id}
              onClick={() => handleSelectLevel(lvl.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                level === lvl.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : visited[lvl.id]
                  ? 'text-cyan-300 hover:bg-slate-800'
                  : 'text-slate-500 hover:bg-slate-800'
              }`}
            >
              <span>{idx + 1}. {lvl.name}</span>
              {visited[lvl.id] && level !== lvl.id && (
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Main Stage */}
      <div className="grid lg:grid-cols-12 gap-6 items-center">
        {/* Left: Visual Canvas Representation (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b1220] border border-cyan-500/20 rounded-2xl h-[380px] sm:h-[440px] relative overflow-hidden flex items-center justify-center shadow-lg">
          {/* Zoom controls overlay */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              onClick={zoomPrev}
              disabled={currentIdx === 0}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 disabled:opacity-30 hover:bg-slate-800"
              title="Alejar Zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={zoomNext}
              disabled={currentIdx === levels.length - 1}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 disabled:opacity-30 hover:bg-slate-800"
              title="Acercar Zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Level: CUERPO HUMANO */}
          {level === 'cuerpo' && (
            <div className="flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <div className="w-32 h-32 rounded-full bg-cyan-950/40 border-2 border-cyan-400/40 flex items-center justify-center mb-4 relative">
                <User className="w-16 h-16 text-cyan-400" />
                <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping opacity-25" />
              </div>
              <span className="text-xs uppercase font-mono text-cyan-400">Escala Macroscópica</span>
              <p className="text-sm text-slate-300 mt-2 max-w-sm">
                Aproximadamente <strong>37 billones de células</strong> componen el cuerpo humano coordinando funciones vitales.
              </p>
              <button
                onClick={() => handleSelectLevel('celula')}
                className="mt-4 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Entrar a la Célula</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Level: CÉLULA */}
          {level === 'celula' && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 animate-fadeIn">
              <img
                src="/src/assets/images/cell_nucleus_genetics_1790119445974.jpg"
                alt="Célula humana y núcleo"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 bg-slate-950/80 p-4 rounded-xl border border-cyan-500/40 text-center max-w-sm backdrop-blur-sm">
                <span className="text-xs uppercase font-mono text-cyan-300">Escala Celular (~20 µm)</span>
                <p className="text-xs text-slate-200 mt-1">
                  La membrana celular protege los organelos y en su centro se encuentra el <strong>núcleo</strong>, sede del material hereditario.
                </p>
                <button
                  onClick={() => handleSelectLevel('nucleo')}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors inline-flex items-center gap-1"
                >
                  <span>Seleccionar Núcleo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Level: NÚCLEO */}
          {level === 'nucleo' && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-950 via-slate-900 to-cyan-950 border-2 border-indigo-400/50 flex flex-col items-center justify-center p-4 shadow-inner relative">
                <Eye className="w-10 h-10 text-indigo-400 mb-2" />
                <span className="text-xs font-mono text-cyan-300">CROMATINA</span>
                <span className="text-[11px] text-slate-400">46 Cromosomas</span>
              </div>
              <p className="text-xs text-slate-300 mt-4 max-w-sm">
                Dentro del núcleo, el ADN está compactado en largas hebras de cromatina que si se desplegaran medirían unos <strong>2 metros</strong> por célula.
              </p>
              <button
                onClick={() => handleSelectLevel('adn')}
                className="mt-3 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1"
              >
                <span>Desplegar Doble Hélice</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Level: ADN */}
          {level === 'adn' && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-2 animate-fadeIn">
              <div className="w-full h-64">
                <DnaCanvas3D speed={1.2} />
              </div>
              <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-cyan-300 font-mono">
                Bases Nitrogenadas: A-T (Adenina-Timina) / C-G (Citosina-Guanina)
              </div>
            </div>
          )}

          {/* Level: GEN */}
          {level === 'gen' && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <div className="w-full max-w-md p-4 rounded-xl bg-slate-900/90 border border-cyan-400/50 shadow-lg">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2 pb-1 border-b border-slate-800">
                  <span>LOCUS: CROMOSOMA 11p15.5</span>
                  <span className="text-amber-400">GEN HBB (HEMOGLOBINA)</span>
                </div>
                {/* Visual sequence representation */}
                <div className="flex justify-center gap-1.5 py-3 font-mono text-xs overflow-x-auto">
                  {['A', 'C', 'T', 'C', 'C', 'T', 'G', 'A', 'G', 'G', 'A', 'G'].map((base, i) => (
                    <span
                      key={i}
                      className={`w-7 h-8 flex items-center justify-center rounded font-bold ${
                        i >= 6 && i <= 8
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 ring-1 ring-amber-400'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {base}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Región codificante del gen de la β-globina.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Educational Explanation & Callouts (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block mb-1">
              Concepto Fundamental
            </span>
            <h2 className="text-lg font-bold text-white mb-2">
              {level === 'cuerpo' && 'El Organismo Humano'}
              {level === 'celula' && 'La Unidad Funcional: La Célula'}
              {level === 'nucleo' && 'El Núcleo y los Cromosomas'}
              {level === 'adn' && 'El ADN: El Código de la Vida'}
              {level === 'gen' && '¿Qué es un Gen?'}
            </h2>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
              {level === 'cuerpo' && (
                <p>
                  El organismo está formado por células que contienen información genética. Cada una de ellas posee la misma información hereditaria básica, organizada para sostener tejidos y órganos.
                </p>
              )}
              {level === 'celula' && (
                <p>
                  Cada célula eucariota posee un núcleo delimitado por una envoltura nuclear. El núcleo actúa como la biblioteca central donde se resguarda el genoma.
                </p>
              )}
              {level === 'nucleo' && (
                <p>
                  En el interior nuclear, el ADN se enrolla alrededor de proteínas llamadas histonas formando cromosomas. Esto permite almacenar 3.200 millones de pares de bases en un espacio diminuto.
                </p>
              )}
              {level === 'adn' && (
                <p>
                  El ácido desoxirribonucleico (ADN) es una doble hélice formada por cuatro bases nitrogenadas: <strong>Adenina (A), Timina (T), Citosina (C) y Guanina (G)</strong>. Su orden específico codifica las instrucciones biológicas.
                </p>
              )}
              {level === 'gen' && (
                <div className="space-y-2">
                  <p className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 font-medium italic">
                    «Un gen es una región del ADN que contiene información genética. Las alteraciones en determinados genes pueden estar relacionadas con enfermedades genéticas.»
                  </p>
                  <p>
                    Por ejemplo, un cambio diminuto de una sola letra en el gen de la hemoglobina altera la forma de los glóbulos rojos, provocando la anemia falciforme.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action button to mini challenge */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col gap-3">
            <span className="text-xs font-mono text-cyan-400">
              Siguiente Desafío Práctico
            </span>
            <p className="text-xs text-slate-300">
              ¿Podés identificar la alteración de una sola base en una secuencia de ADN?
            </p>
            <button
              onClick={() => {
                sound.playSuccess();
                onNextChallenge();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>RESOLVER MINI DESAFÍO: ENCONTRÁ LA ALTERACIÓN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
