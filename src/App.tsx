import React, { useState, useEffect } from 'react';
import { AppScreen, AppMode, StationProgress } from './types';
import { HeaderNav } from './components/HeaderNav';
import { ProjectModal } from './components/ProjectModal';
import { HelpModal } from './components/HelpModal';
import { HeroView } from './views/HeroView';
import { MissionIntroView } from './views/MissionIntroView';
import { ResearchHubView } from './views/ResearchHubView';
import { DnaZoomStation } from './views/DnaZoomStation';
import { MutationChallengeView } from './views/MutationChallengeView';
import { CrisprIntroStation } from './views/CrisprIntroStation';
import { CrisprAssemblyGame } from './views/CrisprAssemblyGame';
import { DnaCleavageView } from './views/DnaCleavageView';
import { DnaRepairStation } from './views/DnaRepairStation';
import { OffTargetChallenge } from './views/OffTargetChallenge';
import { DiseasesStation } from './views/DiseasesStation';
import { CasgevyWorkflowView } from './views/CasgevyWorkflowView';
import { SomaticVsGermlineStation } from './views/SomaticVsGermlineStation';
import { BioethicsStation } from './views/BioethicsStation';
import { ImpactsStation } from './views/ImpactsStation';
import { FinalQuizView } from './views/FinalQuizView';
import { CompletionView } from './views/CompletionView';
import { sound } from './utils/audio';
import { Target, Compass, ChevronRight, Home } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('hero');
  const [mode, setMode] = useState<AppMode>('mission');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false);
  const [helpModalOpen, setHelpModalOpen] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Progress state stored in memory during the session
  const [progress, setProgress] = useState<StationProgress>({
    dna: false,
    crispr: false,
    repair: false,
    diseases: false,
    somatic: false,
    ethics: false,
    impacts: false,
    quiz: false,
  });

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
  };

  const handleResetProgress = () => {
    setProgress({
      dna: false,
      crispr: false,
      repair: false,
      diseases: false,
      somatic: false,
      ethics: false,
      impacts: false,
      quiz: false,
    });
    setQuizScore(0);
    setCurrentScreen('hub');
  };

  const markCompleted = (key: keyof StationProgress) => {
    setProgress((prev) => ({ ...prev, [key]: true }));
  };

  // Determine mission step index (1 to 8) for the mission indicator
  const getMissionStepInfo = (): { step: number; label: string } | null => {
    switch (currentScreen) {
      case 'dna-zoom':
      case 'mutation-challenge':
        return { step: 1, label: 'ADN y Genética' };
      case 'crispr-intro':
      case 'crispr-assembly':
        return { step: 2, label: 'CRISPR-Cas9' };
      case 'crispr-cleavage':
        return { step: 3, label: 'El Corte del ADN' };
      case 'dna-repair':
        return { step: 4, label: 'Vías de Reparación (NHEJ vs HDR)' };
      case 'off-target':
        return { step: 5, label: 'Seguridad y Efecto Off-Target' };
      case 'diseases':
      case 'casgevy-case':
        return { step: 6, label: 'Enfermedades y Caso Casgevy' };
      case 'somatic-germline':
      case 'ethics-decision':
        return { step: 7, label: 'Somática vs. Germinal y Bioética' };
      case 'impacts':
      case 'final-quiz':
        return { step: 8, label: 'Impactos y Desafío Final' };
      default:
        return null;
    }
  };

  const missionInfo = getMissionStepInfo();
  const completedCount = Object.values(progress).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Contract */}
      <HeaderNav
        currentScreen={currentScreen}
        mode={mode}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onToggleMode={() => setMode((m) => (m === 'mission' ? 'explore' : 'mission'))}
        onOpenProject={() => setProjectModalOpen(true)}
        onOpenHelp={() => setHelpModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        completedCount={completedCount}
      />

      {/* Discrete Mission Mode Progress Ribbon (when inside an active station) */}
      {missionInfo && (
        <div className="bg-[#0b1322] border-b border-slate-800/80 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold border border-cyan-500/30">
                MISIÓN {missionInfo.step}/8
              </span>
              <span className="text-slate-300 font-medium hidden sm:inline">
                {missionInfo.label}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-slate-400">
                <span>Progreso:</span>
                <span className="text-cyan-400 font-semibold">{completedCount}/8 Fases</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentScreen('hub');
                }}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                title="Volver al Centro de Investigación"
              >
                <Home className="w-3.5 h-3.5 text-cyan-400" />
                <span>Centro</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Screen Router */}
      <main className="flex-1 w-full">
        {currentScreen === 'hero' && (
          <HeroView
            onStartMission={() => setCurrentScreen('intro')}
            onExploreHub={() => {
              setMode('explore');
              setCurrentScreen('hub');
            }}
          />
        )}

        {currentScreen === 'intro' && (
          <MissionIntroView
            onAcceptMission={() => {
              setMode('mission');
              setCurrentScreen('hub');
            }}
          />
        )}

        {currentScreen === 'hub' && (
          <ResearchHubView
            progress={progress}
            onSelectStation={(screen) => setCurrentScreen(screen)}
            onStartMainMission={() => {
              setMode('mission');
              setCurrentScreen('dna-zoom');
            }}
          />
        )}

        {currentScreen === 'dna-zoom' && (
          <DnaZoomStation
            onComplete={() => markCompleted('dna')}
            onNextChallenge={() => setCurrentScreen('mutation-challenge')}
          />
        )}

        {currentScreen === 'mutation-challenge' && (
          <MutationChallengeView
            onSuccess={() => {
              markCompleted('dna');
              setCurrentScreen('crispr-intro');
            }}
          />
        )}

        {currentScreen === 'crispr-intro' && (
          <CrisprIntroStation
            onNextMiniGame={() => setCurrentScreen('crispr-assembly')}
          />
        )}

        {currentScreen === 'crispr-assembly' && (
          <CrisprAssemblyGame
            onSuccess={() => {
              markCompleted('crispr');
              setCurrentScreen('crispr-cleavage');
            }}
          />
        )}

        {currentScreen === 'crispr-cleavage' && (
          <DnaCleavageView
            onNextRepair={() => setCurrentScreen('dna-repair')}
          />
        )}

        {currentScreen === 'dna-repair' && (
          <DnaRepairStation
            onComplete={() => markCompleted('repair')}
            onNextOffTarget={() => setCurrentScreen('off-target')}
          />
        )}

        {currentScreen === 'off-target' && (
          <OffTargetChallenge
            onSuccess={() => setCurrentScreen('diseases')}
          />
        )}

        {currentScreen === 'diseases' && (
          <DiseasesStation
            onGoToCasgevy={() => setCurrentScreen('casgevy-case')}
          />
        )}

        {currentScreen === 'casgevy-case' && (
          <CasgevyWorkflowView
            onSuccess={() => {
              markCompleted('diseases');
              setCurrentScreen('somatic-germline');
            }}
          />
        )}

        {currentScreen === 'somatic-germline' && (
          <SomaticVsGermlineStation
            onComplete={() => markCompleted('somatic')}
            onNextEthics={() => setCurrentScreen('ethics-decision')}
          />
        )}

        {currentScreen === 'ethics-decision' && (
          <BioethicsStation
            onComplete={() => markCompleted('ethics')}
            onNextImpacts={() => setCurrentScreen('impacts')}
          />
        )}

        {currentScreen === 'impacts' && (
          <ImpactsStation
            onComplete={() => markCompleted('impacts')}
            onNextQuiz={() => setCurrentScreen('final-quiz')}
          />
        )}

        {currentScreen === 'final-quiz' && (
          <FinalQuizView
            onQuizCompleted={(score) => {
              setQuizScore(score);
              markCompleted('quiz');
              setCurrentScreen('completion');
            }}
          />
        )}

        {currentScreen === 'completion' && (
          <CompletionView
            score={quizScore}
            onExploreAgain={() => {
              setMode('explore');
              setCurrentScreen('hub');
            }}
            onOpenProject={() => setProjectModalOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />

      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
