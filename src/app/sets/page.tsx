"use client";

import Link from "next/link";
import { SETS } from "@/lib/data";

export default function SetsPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Escolha um Conjunto</h1>
      <ul className="space-y-4">
        {SETS.map((set) => (
          <li key={set.id} className="p-4 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold">{set.title}</h2>
            <p className="text-gray-600">{set.description}</p>
            <Link
              href={`/sets/${set.id}`}
              className="mt-2 inline-block text-blue-600 font-medium hover:underline"
            >
              Estudar →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
