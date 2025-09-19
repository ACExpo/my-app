// src/lib/projects.ts
export type UserRole = "creator" | "student";

export type Flashcard = { id: string; front: string; back: string };
export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  revealOnClick?: boolean; // se true, mostra resposta imediata
};

export type Chapter = {
  id: string;
  title: string;
  content?: string;         // texto/markdown simples
  videoUrl?: string;        // youtube embed (https://www.youtube.com/embed/...)
  githubUrl?: string;       // link externo
  driveUrl?: string;        // link externo
  flashcards?: Flashcard[];
  quiz?: QuizQuestion[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  role: UserRole; // "creator" vê editor + analytics; "student" vê estudo
  stats: {
    flashcards: number;
    quizzes: number;
    videos: number;
    chapters: number;
  };
  analytics: {
    views: number;
    clicks: number;
    hours: number;
    completionRate: number;
    rating: number;
    downloads: number;
    activeUsers: number;
  };
  chapters: Chapter[];
};

// MOCK inicial (em memória). Será mesclado com localStorage.
export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "JavaScript Essentials",
    description: "Curso rápido cobrindo fundamentos de JS.",
    tags: ["javascript", "frontend", "beginner"],
    createdAt: "2025-09-01",
    updatedAt: "2025-09-15",
    role: "creator",
    stats: { flashcards: 4, quizzes: 1, videos: 1, chapters: 1 },
    analytics: {
      views: 540,
      clicks: 210,
      hours: 72,
      completionRate: 68,
      rating: 4.5,
      downloads: 30,
      activeUsers: 85,
    },
    chapters: [
      {
        id: "c1",
        title: "Introdução",
        content: "Bem-vindo ao curso!",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        githubUrl: "https://github.com/vercel/next.js",
        flashcards: [
          { id: "f1", front: "O que é JS?", back: "Linguagem de programação." },
          { id: "f2", front: "typeof null?", back: "`object` (quirk histórico)" },
          { id: "f3", front: "let vs var", back: "let respeita escopo de bloco" },
          { id: "f4", front: "const", back: "Não reatribui (valor imutável)" },
        ],
        quiz: [
          {
            id: "q1",
            question: "Qual é o resultado de typeof null?",
            options: ["object", "null", "undefined", "string"],
            answerIndex: 0,
            revealOnClick: true,
          },
        ],
      },
    ],
  },
  {
    id: "p2",
    title: "Python for Data Science",
    description: "Flashcards e quizzes de Python aplicado a Data Science.",
    tags: ["python", "data", "machine-learning"],
    createdAt: "2025-08-10",
    updatedAt: "2025-09-12",
    role: "student",
    stats: { flashcards: 0, quizzes: 0, videos: 0, chapters: 1 },
    analytics: {
      views: 980,
      clicks: 540,
      hours: 150,
      completionRate: 74,
      rating: 4.7,
      downloads: 52,
      activeUsers: 120,
    },
    chapters: [
      {
        id: "c1",
        title: "Introdução ao Python",
        content: "Instalação, variáveis e tipos básicos.",
      },
    ],
  },
];
