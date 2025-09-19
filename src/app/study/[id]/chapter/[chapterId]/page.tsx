// src/app/study/[id]/chapter/[chapterId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { PROJECTS, type Project } from "@/lib/projects";
import { loadProjects } from "@/lib/store";
import FlashcardList from "@/app/components/FlashcardList";
import QuizRunner from "@/app/components/QuizRunner";

export default function StudyChapterPage() {
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>();
  const map = new Map<string, Project>();
  [...PROJECTS, ...loadProjects()].forEach((p) => map.set(p.id, p));
  const project = map.get(id);
  const chapter = project?.chapters.find((c) => c.id === chapterId);

  if (!project || !chapter) return <p className="p-6 text-red-500">Capítulo não encontrado</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <h2 className="text-lg font-semibold">{chapter.title}</h2>

      {chapter.content && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="whitespace-pre-wrap">{chapter.content}</p>
        </div>
      )}

      {chapter.videoUrl && (
        <div className="bg-black rounded overflow-hidden">
          <iframe
            src={chapter.videoUrl}
            title={chapter.title}
            className="w-full h-[360px]"
            allowFullScreen
          />
        </div>
      )}

      {(chapter.githubUrl || chapter.driveUrl) && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
          <h3 className="font-semibold">Links</h3>
          {chapter.githubUrl && (
            <a className="text-blue-600 underline" href={chapter.githubUrl} target="_blank">GitHub</a>
          )}
          {chapter.driveUrl && (
            <a className="text-blue-600 underline block" href={chapter.driveUrl} target="_blank">Drive</a>
          )}
        </div>
      )}

      {chapter.flashcards && chapter.flashcards.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Flashcards</h3>
          <FlashcardList cards={chapter.flashcards} />
        </div>
      )}

      {chapter.quiz && chapter.quiz.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Quiz</h3>
          <QuizRunner quiz={chapter.quiz} />
        </div>
      )}
    </div>
  );
}
