import React, { useState } from 'react';
import { AppScreen, AppMode } from '../types';
import { Volume2, VolumeX, BookOpen, HelpCircle, Compass, Target, Menu, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderNavProps {
  currentScreen: AppScreen;
  mode: AppMode;
  onNavigate: (screen: AppScreen) => void;
  onToggleMode: () => void;
  onOpenProject: () => void;
  onOpenHelp: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  completedCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  mode,
  onNavigate,
  onToggleMode,
  onOpenProject,
  onOpenHelp,
  soundEnabled,
  onToggleSound,
  completedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; screen: AppScreen }[] = [
    { label: 'Centro', screen: 'hub' },
    { label: 'ADN', screen: 'dna-zoom' },
    { label: 'CRISPR', screen: 'crispr-intro' },
    { label: 'Enfermedades', screen: 'diseases' },
    { label: 'Ética', screen: 'ethics-decision' },
    { label: 'Impactos', screen: 'impacts' },
  ];

  const handleLinkClick = (screen: AppScreen) => {
    sound.playClick();
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => handleLinkClick('hub')}
          className="text-left group flex items-center gap-2"
        >
          <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            CRISPR <span className="text-cyan-400 font-medium">MISIÓN GENÉTICA</span>
          </span>
          <span className="hidden lg:inline text-xs text-slate-500 font-mono">
            {completedCount}/8 Fases
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentScreen === link.screen;
            return (
              <button
                key={link.screen}
                onClick={() => handleLinkClick(link.screen)}
                className={`transition-colors relative py-1 hover:text-cyan-300 ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode switch */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleMode();
            }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
              mode === 'mission'
                ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60'
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700/60'
            }`}
            title="Alternar entre Misión Guiada y Exploración Libre"
          >
            {mode === 'mission' ? (
              <>
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>Modo Misión</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>Exploración</span>
              </>
            )}
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title={soundEnabled ? 'Silenciar sonidos' : 'Activar efectos de sonido'}
            aria-label="Alternar sonido"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Project Details Modal */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenProject();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-700 border border-slate-700/80 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Proyecto</span>
          </button>

          {/* Help Modal */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHelp();
            }}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Guía y Ayuda"
            aria-label="Ayuda"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c1220] border-b border-slate-800 px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800/60 text-xs">
            {navLinks.map((link) => (
              <button
                key={link.screen}
                onClick={() => handleLinkClick(link.screen)}
                className={`text-left p-2 rounded ${
                  currentScreen === link.screen
                    ? 'bg-cyan-950 text-cyan-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-1 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                onToggleMode();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-slate-300"
            >
              {mode === 'mission' ? (
                <>
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Modo Misión Activo</span>
                </>
              ) : (
                <>
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Modo Exploración Libre</span>
                </>
              )}
            </button>
            <span className="font-mono text-slate-500">{completedCount}/8 Fases</span>
          </div>
        </div>
      )}
    </header>
  );
};
