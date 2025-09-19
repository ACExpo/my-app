// src/app/components/FlashcardList.tsx
"use client";

import Flashcard from "./Flashcard";
import type { Flashcard as TFlashcard } from "@/lib/projects";

export default function FlashcardList({ cards }: { cards: TFlashcard[] }) {
  if (!cards?.length) return <p className="text-sm text-gray-500">Sem flashcards.</p>;
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {cards.map((c) => (
        <Flashcard key={c.id} front={c.front} back={c.back} />
      ))}
    </div>
  );
}
