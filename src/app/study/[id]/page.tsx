// src/app/study/[id]/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PROJECTS, type Project } from "@/lib/projects";
import { loadProjects } from "@/lib/store";

export default function StudyProjectPage() {
  const { id } = useParams<{ id: string }>();

  const map = new Map<string, Project>();
  [...PROJECTS, ...loadProjects()].forEach((p) => map.set(p.id, p));
  const project = map.get(id);

  if (!project) return <p className="p-6 text-red-500">Projeto não encontrado</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Estudar: {project.title}</h1>
      <p className="text-gray-600 dark:text-gray-300">{project.description}</p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Capítulos</h2>
        <ul className="space-y-2">
          {project.chapters.map((ch) => (
            <li key={ch.id} className="p-3 rounded bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
              <span>{ch.title}</span>
              <Link className="text-blue-600" href={`/study/${project.id}/chapter/${ch.id}`}>Abrir</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
