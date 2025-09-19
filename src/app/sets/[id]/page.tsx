import { notFound } from "next/navigation";
import { SETS } from "@/lib/data";
import Flashcard from "@/app/components/Flashcard";

type Props = {
  params: { id: string };
};

export default function SetPage({ params }: Props) {
  const set = SETS.find((s) => s.id === params.id);

  if (!set) {
    return notFound(); // se não achar, mostra 404
  }

  return (
    <div className="space-y-6">
      {/* Header do conjunto */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold">{set.title}</h1>
        {set.description && (
          <p className="text-gray-600 mt-2">{set.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {set.license ? `License: ${set.license}` : "No license"}
        </p>
      </div>

      {/* Lista de cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {set.cards.map((card) => (
          <Flashcard key={card.id} front={card.front} back={card.back} />
        ))}
      </div>
    </div>
  );
}
