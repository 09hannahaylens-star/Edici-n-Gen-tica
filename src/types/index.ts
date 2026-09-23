export type AppScreen =
  | 'hero'
  | 'intro'
  | 'hub'
  | 'dna-zoom'
  | 'mutation-challenge'
  | 'crispr-intro'
  | 'crispr-assembly'
  | 'crispr-cleavage'
  | 'dna-repair'
  | 'off-target'
  | 'diseases'
  | 'casgevy-case'
  | 'somatic-germline'
  | 'ethics-decision'
  | 'impacts'
  | 'final-quiz'
  | 'completion';

export type AppMode = 'mission' | 'explore';

export interface StationProgress {
  dna: boolean;
  crispr: boolean;
  repair: boolean;
  diseases: boolean;
  somatic: boolean;
  ethics: boolean;
  impacts: boolean;
  quiz: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface EthicalDilemma {
  id: string;
  title: string;
  context: string;
  question: string;
  choices: {
    id: string;
    label: string;
    consequences: {
      seguridad: string;
      riesgos: string;
      herencia: string;
      acceso: string;
      regulacion: string;
      equidad: string;
    };
    reflection: string;
  }[];
}
