"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { loadProjects } from "@/lib/store";
import YouTubeEmbed from "@/app/components/YouTubeEmbed";

export default function ChapterPage() {
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>();
  const router = useRouter();

  // juntar mock + local
  const map = new Map();
  [...PROJECTS, ...loadProjects()].forEach((p) => map.set(p.id, p));
  const project = map.get(id);
  if (!project) return <p className="p-6 text-red-500">Projeto não encontrado ❌</p>;

  const chapterIndex = project.chapters.findIndex((c) => c.id === chapterId);
  const chapter = project.chapters[chapterIndex];
  if (!chapter) return <p className="p-6 text-red-500">Capítulo não encontrado ❌</p>;

  const prevChapter = project.chapters[chapterIndex - 1];
  const nextChapter = project.chapters[chapterIndex + 1];

  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <h2 className="text-lg font-semibold">Capítulo {chapterIndex + 1}: {chapter.title}</h2>

      {/* Conteúdo */}
      {chapter.content && (
        <p className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
          {chapter.content}
        </p>
      )}

      {/* Vídeo */}
      {chapter.videoUrl && <YouTubeEmbed url={chapter.videoUrl} />}

      {/* Links extras */}
      <div className="flex gap-3">
        {chapter.githubUrl && (
          <a
            href={chapter.githubUrl}
            target="_blank"
            className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm hover:underline"
          >
            🔗 GitHub
          </a>
        )}
        {chapter.driveUrl && (
          <a
            href={chapter.driveUrl}
            target="_blank"
            className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm hover:underline"
          >
            📂 Drive
          </a>
        )}
      </div>

      {/* Flashcards */}
      {chapter.flashcards && chapter.flashcards.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow rounded p-4">
          <h3 className="font-semibold mb-2">Flashcards</h3>
          <ul className="space-y-2">
            {chapter.flashcards.map((f) => (
              <li key={f.id} className="p-2 border rounded bg-gray-50 dark:bg-gray-700">
                <p><strong>Q:</strong> {f.front}</p>
                <p><strong>A:</strong> {f.back}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quiz */}
      {chapter.quiz && chapter.quiz.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow rounded p-4">
          <h3 className="font-semibold mb-2">Quiz</h3>
          <ul className="space-y-3">
            {chapter.quiz.map((q) => (
              <li key={q.id} className="p-2 border rounded bg-gray-50 dark:bg-gray-700">
                <p className="font-medium">{q.question}</p>
                <ul className="ml-4 list-disc">
                  {q.options.map((opt, i) => (
                    <li
                      key={i}
                      className={i === q.answerIndex ? "text-green-600" : ""}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navegação entre capítulos */}
      <div className="flex justify-between">
        {prevChapter ? (
          <button
            onClick={() => router.push(`/study/${project.id}/chapter/${prevChapter.id}`)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
          >
            ⬅ Voltar
          </button>
        ) : (
          <Link
            href={`/contributions/${project.id}`}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
          >
            ⬅ Voltar ao curso
          </Link>
        )}

        {nextChapter && (
          <button
            onClick={() => router.push(`/study/${project.id}/chapter/${nextChapter.id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Próximo ➡
          </button>
        )}
      </div>

      {/* Botão de editar (só creator) */}
      {project.role === "creator" && (
        <div className="pt-4">
          <Link
            href={`/contributions/${project.id}/manage`}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            ✏️ Editar este curso
          </Link>
        </div>
      )}
    </div>
  );
}
