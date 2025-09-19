// src/app/contributions/[id]/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PROJECTS, type Project } from "@/lib/projects";
import { loadProjects } from "@/lib/store";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();

  // juntar mock + locais
  const map = new Map<string, Project>();
  [...PROJECTS, ...loadProjects()].forEach((p) => map.set(p.id, p));
  const project = map.get(id);

  if (!project) {
    return <p className="p-6 text-red-500">Projeto não encontrado ❌</p>;
  }

  const isCreator = project.role === "creator";
  const a = project.analytics;
  const s = project.stats;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-sm rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {isCreator && (
              <Link
                href={`/contributions/${project.id}/manage`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Gerenciar
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <Stat label="👀 Views" value={a.views} />
        <Stat label="🖱 Clicks" value={a.clicks} />
        <Stat label="⏱ Horas" value={a.hours} />
        <Stat label="✅ Conclusão" value={`${a.completionRate}%`} />
        <Stat label="⭐ Rating" value={a.rating} />
        <Stat label="📥 Downloads" value={a.downloads} />
        <Stat label="👤 Ativos" value={a.activeUsers} />
        <Stat label="📚 Capítulos" value={s.chapters} />
      </div>

      {/* Capítulos */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold mb-3">Capítulos</h2>
        {project.chapters.map((ch) => (
          <div
            key={ch.id}
            className="p-4 rounded bg-gray-50 dark:bg-gray-700 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{ch.title}</span>
              <Link
                className="text-blue-600 hover:underline"
                href={`/contributions/${project.id}/chapter/${ch.id}`}
              >
                Abrir
              </Link>
            </div>

            {/* Preview do conteúdo */}
            {ch.content && (
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                {ch.content}
              </p>
            )}

            {ch.videoUrl && (
              <div className="mt-2">
                <YouTubeEmbed url={ch.videoUrl} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
