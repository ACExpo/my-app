// src/app/home/page.tsx
import { SETS } from "@/lib/data";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold">Welcome, Andreza 👋</h1>
        <p className="text-gray-600 mt-2">
          Aqui você encontra suas atualizações, conjuntos recentes e novidades da
          plataforma.
        </p>
      </section>

      {/* Updates */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Updates</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <ul className="list-disc list-inside text-gray-700">
            <li>🚀 Novo sistema de flashcards adicionado</li>
            <li>🔔 Notificações agora aparecem em tempo real</li>
            <li>🎨 Melhorias no design da dashboard</li>
          </ul>
        </div>
      </section>

      {/* Recents */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Recents</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {SETS.map((set) => (
            <Link
              key={set.id}
              href={`/sets/${set.id}`}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold">{set.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {set.description || "Sem descrição"}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {set.cards.length} cards
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* What's new */}
      <section>
        <h2 className="text-xl font-semibold mb-3">What’s new</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">
            📢 Publicações populares e novidades vão aparecer aqui. Exemplo: novos
            conjuntos de estudo adicionados pela comunidade.
          </p>
        </div>
      </section>
    </div>
  );
}
