"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROJECTS, type Project } from "@/lib/projects";
import { loadProjects, saveProjects } from "@/lib/store";

export default function ContributionsPage() {
  const [local, setLocal] = useState<Project[]>([]);

  useEffect(() => {
    setLocal(loadProjects());
  }, []);

  // junta MOCK + LocalStorage sem duplicar
  const map = new Map<string, Project>();
  [...PROJECTS, ...local].forEach((p) => map.set(p.id, p));
  const all = Array.from(map.values());

  const handleDelete = (id: string) => {
    if (!confirm("Deletar este projeto?")) return;
    const next = loadProjects().filter((p) => p.id !== id);
    saveProjects(next);
    setLocal(next);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contributions</h1>
        <Link
          href="/contributions/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + New Project
        </Link>
      </div>

      {/* Lista de projetos */}
      <div className="grid md:grid-cols-2 gap-6">
        {all.length === 0 && (
          <p className="text-gray-400">Nenhum projeto criado ainda.</p>
        )}
        {all.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700">
                {p.role === "creator" ? "Creator" : "Student"}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              {p.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-sm text-blue-500">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 text-center text-sm">
              <Stat label="Flashcards" value={p.stats.flashcards} />
              <Stat label="Quizzes" value={p.stats.quizzes} />
              <Stat label="Vídeos" value={p.stats.videos} />
              <Stat label="Capítulos" value={p.stats.chapters} />
            </div>

            {/* Datas */}
            <p className="text-xs text-gray-400">
              Criado em {new Date(p.createdAt).toLocaleDateString()} • Atualizado em{" "}
              {new Date(p.updatedAt).toLocaleDateString()}
            </p>

            {/* Ações */}
            <div className="flex gap-4">
              <Link
                href={`/contributions/${p.id}`}
                className="text-blue-600 hover:underline"
              >
                Detalhes / Analytics
              </Link>
              {p.role === "creator" && (
                <Link
                  href={`/contributions/${p.id}/manage`}
                  className="text-yellow-600 hover:underline"
                >
                  Editar
                </Link>
              )}
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-600 hover:underline"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <p className="font-bold">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}
