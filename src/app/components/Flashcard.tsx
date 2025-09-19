// src/app/components/Flashcard.tsx
"use client";

import { useState } from "react";

export default function Flashcard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        role="button"
        aria-label="flashcard"
        onClick={() => setFlipped((v) => !v)}
        className="relative h-40 cursor-pointer rounded-2xl shadow-xl border bg-white dark:bg-gray-800"
        style={{ perspective: 1000 }}
      >
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.5s",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center text-center text-lg font-medium p-4"
            style={{ backfaceVisibility: "hidden" }}
          >
            {front}
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center text-center text-lg font-medium p-4"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {back}
          </div>
        </div>
      </div>
      <p className="text-center mt-2 text-xs text-gray-500">Clique para virar</p>
    </div>
  );
}
