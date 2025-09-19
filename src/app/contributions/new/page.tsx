// src/app/contributions/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Chapter, Project } from "@/lib/projects";
import { loadProjects, saveProjects } from "@/lib/store";

export default function NewProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: `c${Date.now()}`, title: "Capítulo 1", content: "" },
  ]);

  const addChapter = () => {
    if (chapters.length >= 10) return alert("Máximo de 10 capítulos.");
    setChapters((chs) => [...chs, { id: `c${Date.now()}`, title: `Capítulo ${chs.length + 1}`, content: "" }]);
  };

  const updateChapter = (idx: number, patch: Partial<Chapter>) => {
    setChapters((chs) => {
      const next = [...chs];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const project: Project = {
      id: `p${Date.now()}`,
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: "creator",
      stats: {
        flashcards: chapters.reduce((a, c) => a + (c.flashcards?.length || 0), 0),
        quizzes: chapters.reduce((a, c) => a + (c.quiz?.length ? 1 : 0), 0),
        videos: chapters.reduce((a, c) => a + (c.videoUrl ? 1 : 0), 0),
        chapters: chapters.length,
      },
      analytics: {
        views: 0, clicks: 0, hours: 0, completionRate: 0, rating: 0, downloads: 0, activeUsers: 0,
      },
      chapters,
    };

    const all = loadProjects();
    saveProjects([...all, project]);

    alert("Projeto criado com sucesso ✅");
    router.push("/contributions");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Criar Novo Projeto</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Projeto */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags (vírgula)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-800"
              placeholder="javascript, web, frontend"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Capítulos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Capítulos</h2>
            <button type="button" onClick={addChapter} className="px-3 py-1 bg-blue-600 text-white rounded">
              + Adicionar Capítulo
            </button>
          </div>

          {chapters.map((ch, idx) => (
            <div key={ch.id} className="p-4 border rounded bg-white dark:bg-gray-800 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Título do Capítulo</label>
                  <input
                    value={ch.title}
                    onChange={(e) => updateChapter(idx, { title: e.target.value })}
                    className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">YouTube (embed)</label>
                  <input
                    placeholder="https://www.youtube.com/embed/xxxx"
                    value={ch.videoUrl || ""}
                    onChange={(e) => updateChapter(idx, { videoUrl: e.target.value })}
                    className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub (link)</label>
                  <input
                    placeholder="https://github.com/user/repo"
                    value={ch.githubUrl || ""}
                    onChange={(e) => updateChapter(idx, { githubUrl: e.target.value })}
                    className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Drive (link)</label>
                  <input
                    placeholder="https://drive.google.com/..."
                    value={ch.driveUrl || ""}
                    onChange={(e) => updateChapter(idx, { driveUrl: e.target.value })}
                    className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Texto do capítulo</label>
                <textarea
                  rows={3}
                  value={ch.content || ""}
                  onChange={(e) => updateChapter(idx, { content: e.target.value })}
                  className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700"
                />
              </div>

              <FlashcardEditor
                value={ch.flashcards || []}
                onChange={(cards) => updateChapter(idx, { flashcards: cards })}
              />

              <QuizEditor
                value={ch.quiz || []}
                onChange={(quiz) => updateChapter(idx, { quiz })}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Salvar Projeto
          </button>
        </div>
      </form>
    </div>
  );
}

function FlashcardEditor({
  value,
  onChange,
}: {
  value: { id: string; front: string; back: string }[];
  onChange: (v: { id: string; front: string; back: string }[]) => void;
}) {
  const add = () => onChange([...(value || []), { id: `f${Date.now()}`, front: "", back: "" }]);
  const update = (i: number, patch: Partial<{ front: string; back: string }>) => {
    const next = [...value];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="border rounded p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Flashcards</h3>
        <button type="button" onClick={add} className="px-2 py-1 text-sm bg-blue-600 text-white rounded">
          + Add
        </button>
      </div>
      {(value || []).length === 0 && <p className="text-xs text-gray-500">Nenhum flashcard.</p>}
      <div className="grid md:grid-cols-2 gap-3">
        {value.map((c, i) => (
          <div key={c.id} className="space-y-2 bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <input
              placeholder="Frente"
              value={c.front}
              onChange={(e) => update(i, { front: e.target.value })}
              className="w-full px-2 py-1 rounded border bg-white dark:bg-gray-800"
            />
            <input
              placeholder="Verso"
              value={c.back}
              onChange={(e) => update(i, { back: e.target.value })}
              className="w-full px-2 py-1 rounded border bg-white dark:bg-gray-800"
            />
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-600">
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizEditor({
  value,
  onChange,
}: {
  value: { id: string; question: string; options: string[]; answerIndex: number; revealOnClick?: boolean }[];
  onChange: (v: { id: string; question: string; options: string[]; answerIndex: number; revealOnClick?: boolean }[]) => void;
}) {
  const add = () =>
    onChange([
      ...value,
      { id: `q${Date.now()}`, question: "", options: ["", "", "", ""], answerIndex: 0, revealOnClick: false },
    ]);

  const update = (i: number, patch: Partial<(typeof value)[number]>) => {
    const next = [...value];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const updateOption = (qi: number, oi: number, text: string) => {
    const next = [...value];
    const opts = [...next[qi].options];
    opts[oi] = text;
    next[qi].options = opts;
    onChange(next);
  };

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="border rounded p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Quiz</h3>
        <button type="button" onClick={add} className="px-2 py-1 text-sm bg-blue-600 text-white rounded">
          + Add Pergunta
        </button>
      </div>

      {value.length === 0 && <p className="text-xs text-gray-500">Nenhuma pergunta.</p>}

      <div className="space-y-3">
        {value.map((q, i) => (
          <div key={q.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded space-y-2">
            <input
              placeholder={`Pergunta ${i + 1}`}
              value={q.question}
              onChange={(e) => update(i, { question: e.target.value })}
              className="w-full px-2 py-1 rounded border bg-white dark:bg-gray-800"
            />
            <div className="grid md:grid-cols-2 gap-2">
              {q.options.map((op, oi) => (
                <input
                  key={oi}
                  placeholder={`Opção ${oi + 1}`}
                  value={op}
                  onChange={(e) => updateOption(i, oi, e.target.value)}
                  className="w-full px-2 py-1 rounded border bg-white dark:bg-gray-800"
                />
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm">
              <label>
                Resposta correta:
                <select
                  className="ml-2 px-2 py-1 rounded border bg-white dark:bg-gray-800"
                  value={q.answerIndex}
                  onChange={(e) => update(i, { answerIndex: Number(e.target.value) })}
                >
                  {q.options.map((_, oi) => (
                    <option key={oi} value={oi}>{oi + 1}</option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={!!q.revealOnClick}
                  onChange={(e) => update(i, { revealOnClick: e.target.checked })}
                />
                Mostrar resposta ao clicar
              </label>
            </div>

            <button type="button" onClick={() => remove(i)} className="text-xs text-red-600">
              Remover pergunta
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
