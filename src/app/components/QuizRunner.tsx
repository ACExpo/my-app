// src/app/components/QuizRunner.tsx
"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/projects";

export default function QuizRunner({ quiz }: { quiz: QuizQuestion[] }) {
  if (!quiz?.length) return <p className="text-sm text-gray-500">Sem perguntas.</p>;

  const [answers, setAnswers] = useState<number[]>(Array(quiz.length).fill(-1));
  const select = (qi: number, oi: number) => {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  };

  const score = answers.reduce((acc, ans, i) => (ans === quiz[i].answerIndex ? acc + 1 : acc), 0);

  return (
    <div className="space-y-4">
      {quiz.map((q, qi) => (
        <div key={q.id} className="p-4 rounded border bg-white dark:bg-gray-800">
          <p className="font-medium mb-2">{qi + 1}. {q.question}</p>
          <div className="space-y-1">
            {q.options.map((opt, oi) => {
              const chosen = answers[qi] === oi;
              const correct = q.answerIndex === oi;
              const reveal = q.revealOnClick && answers[qi] !== -1;

              return (
                <button
                  key={oi}
                  onClick={() => select(qi, oi)}
                  className={`block w-full text-left px-3 py-2 rounded border ${
                    chosen
                      ? "bg-blue-600 text-white"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {opt}
                  {reveal && correct && <span className="ml-2 text-xs"> ✅</span>}
                  {reveal && chosen && !correct && <span className="ml-2 text-xs"> ❌</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* só faz sentido para quizzes sem reveal automático */}
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Pontuação: {score}/{quiz.length}
      </div>
    </div>
  );
}
