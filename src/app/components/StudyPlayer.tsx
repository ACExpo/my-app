"use client";

import { useEffect, useMemo, useState } from "react";
import Flashcard from "./Flashcard";
import { Card } from "@/lib/data";
import { getProgress, setProgress } from "@/lib/storage";

type Props = {
  setId: string;
  title: string;
  cards: Card[];
};

export default function StudyPlayer({ setId, title, cards }: Props) {
  const [index, setIndex] = useState(0);
  const [progress, setLocalProgress] = useState<number[]>([]);

  // Carregar progresso salvo no localStorage
  useEffect(() => {
    const saved = getProgress(setId);
    if (saved) setLocalProgress(saved);
  }, [setId]);

  // Card atual
  const currentCard = useMemo(() => cards[index], [cards, index]);

  // Marcar como estudado
  function markStudied() {
    const newProgress = [...progress, index];
    setLocalProgress(newProgress);
    setProgress(setId, newProgress);
  }

  // Ir para próximo card
  function nextCard() {
    setIndex((i) => (i + 1 < cards.length ? i + 1 : 0));
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {currentCard ? (
        <Flashcard front={currentCard.front} back={currentCard.back} />
      ) : (
        <p>Sem cards disponíveis.</p>
      )}

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={markStudied}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Marcar como estudado
        </button>
        <button
          onClick={nextCard}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
