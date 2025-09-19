// src/app/contributions/[id]/manage/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PROJECTS, type Project, type Chapter } from "@/lib/projects";
import { loadProjects, saveProjects } from "@/lib/store";
import { normalizeYouTubeUrl } from "@/lib/youtube";

export default function ManageProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const initial = useMemo(() => {
    const map = new Map<string, Project>();
    [...PROJECTS, ...loadProjects()].forEach((p) => map.set(p.id, p));
    return map.get(id!);
  }, [id]);

  const [project, setProject] = useState<Project | null>(
    initial ? JSON.parse(JSON.stringify(initial)) : null
  );

  if (!project)
    return <p className="p-6 text-red-500">Projeto não encontrado ❌</p>;

  const set = (patch: Partial<Project>) =>
    setProject((p) =>
      p ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p
    );

  const save = () => {
    const stats = {
      flashcards: project.chapters.reduce(
        (a, c) => a + (c.flashcards?.length || 0),
        0
      ),
      quizzes: project.chapters.reduce(
        (a, c) => a + (c.quiz?.length ? 1 : 0),
        0
      ),
      videos: project.chapters.reduce((a, c) => a + (c.videoUrl ? 1 : 0), 0),
      chapters: project.chapters.length,
    };
    const final: Project = { ...project, stats };

    const local = loadProjects().filter((p) => p.id !== final.id);
    saveProjects([...local, final]);

    alert("Projeto salvo ✅");
    router.push(`/contributions/${final.id}`);
  };

  const addChapter = () => {
    if (project.chapters.length >= 10)
      return alert("Máximo 10 capítulos");
    set({
      chapters: [
        ...project.chapters,
        { id: `c${Date.now()}`, title: "Novo capítulo" },
      ],
    });
  };

  const updateChapter = (i: number, patch: Partial<Chapter>) => {
    const chs = [...project.chapters];
    chs[i] = { ...chs[i], ...patch };
    set({ chapters: chs });
  };

  const removeChapter = (i: number) => {
    const chs = project.chapters.filter((_, idx) => idx !== i);
    set({ chapters: chs });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gerenciar: {project.title}</h1>

      {/* Dados do projeto */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-3">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              value={project.title}
              onChange={(e) => set({ title: e.target.value })}
              className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tags (vírgula)
            </label>
            <input
              value={project.tags.join(", ")}
              onChange={(e) =>
                set({
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
              className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              rows={3}
              value={project.description}
              onChange={(e) => set({ description: e.target.value })}
              className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Capítulos */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Capítulos</h2>
          <button
            onClick={addChapter}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            + Adicionar
          </button>
        </div>

        {project.chapters.length === 0 && (
          <p className="text-sm text-gray-500">Nenhum capítulo ainda.</p>
        )}

        {project.chapters.map((ch, i) => (
          <div
            key={ch.id}
            className="p-4 rounded border space-y-3 bg-gray-50 dark:bg-gray-700"
          >
            <div className="flex items-center justify-between">
              <input
                value={ch.title || ""}
                onChange={(e) => updateChapter(i, { title: e.target.value })}
                className="w-full mr-3 px-3 py-2 rounded border bg-white dark:bg-gray-800"
                placeholder="Título do capítulo"
              />
              <button
                onClick={() => removeChapter(i)}
                className="text-sm text-red-600"
              >
                Remover
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Link do YouTube (qualquer formato)"
                value={ch.videoUrl || ""}
                onChange={(e) =>
                  updateChapter(i, { videoUrl: normalizeYouTubeUrl(e.target.value) })
                }
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800"
              />
              <input
                placeholder="GitHub URL"
                value={ch.githubUrl || ""}
                onChange={(e) => updateChapter(i, { githubUrl: e.target.value })}
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800"
              />
              <input
                placeholder="Drive URL"
                value={ch.driveUrl || ""}
                onChange={(e) => updateChapter(i, { driveUrl: e.target.value })}
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800"
              />
              <textarea
                placeholder="Texto do capítulo"
                value={ch.content || ""}
                onChange={(e) => updateChapter(i, { content: e.target.value })}
                rows={3}
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800"
              />
            </div>

            <InlineFlashcardsEditor
              value={ch.flashcards || []}
              onChange={(cards) => updateChapter(i, { flashcards: cards })}
            />

            <InlineQuizEditor
              value={ch.quiz || []}
              onChange={(quiz) => updateChapter(i, { quiz })}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => router.push(`/contributions/${project.id}`)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={save}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

/* --------------------
   Flashcards Editor
-------------------- */
function InlineFlashcardsEditor({
  value,
  onChange,
}: {
  value: NonNullable<Project["chapters"][number]["flashcards"]>;
  onChange: (
    v: NonNullable<Project["chapters"][number]["flashcards"]>
  ) => void;
}) {
  const add = () =>
    onChange([
      ...(value || []),
      { id: `f${Date.now()}`, front: "", back: "" },
    ]);
  const update = (
    i: number,
    patch: Partial<{ front: string; back: string }>
  ) => {
    const next = [...value];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="border rounded p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Flashcards</h3>
        <button
          onClick={add}
          className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
        >
          + Add
        </button>
      </div>
      {value.length === 0 && (
        <p className="text-xs text-gray-200">Nenhum flashcard</p>
      )}
      <div className="grid md:grid-cols-2 gap-2">
        {value.map((c, i) => (
          <div
            key={c.id}
            className="bg-white dark:bg-gray-800 p-3 rounded space-y-2"
          >
            <input
              placeholder="Frente"
              value={c.front}
              onChange={(e) => update(i, { front: e.target.value })}
              className="w-full px-2 py-1 rounded border bg-white dark:bg-gray-900"
            />
            <input
              placeholder="Verso"
              value={c.back}
              onChange={(e) => update(i, { back: e.target.value })}
              className="w-full px-2 py-1 rounded border bg-white dark:bg-gray-900"
            />
            <button
              onClick={() => remove(i)}
              className="text-xs text-red-600"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------
   Quiz Editor
-------------------- */
function InlineQuizEditor({
  value,
  onChange,
}: {
  value: NonNullable<Project["chapters"][number]["quiz"]>;
  onChange: (v: NonNullable<Project["chapters"][number]["quiz"]>) => void;
}) {
  const add = () =>
    onChange([
      ...value,
      {
        id: `q${Date.now()}`,
        question: "",
        options: ["", "", "", ""],
        answerIndex: 0,
        revealOnClick: false,
      },
    ]);
  const update = (i: number, patch: Partial<typeof value[number]>) => {
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
        <button
          onClick={add}
          className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
        >
          + Add Pergunta
        </button>
      </div>

      {value.length === 0 && (
        <p className="text-xs text-gray-200">Nenhuma pergunta</p>
      )}

      <div className="space-y-2">
        {value.map((q, i) => (
          <div
            key={q.id}
            className="bg-white dark:bg-gray-800 p-3 rounded space-y-2"
          >
            <input
              placeholder={`Pergunta ${i + 1}`}
              value={q.question}
              onChange={(e) => update(i, { question: e.target.value })}
              className="w-full px-2 py-1 rounded border bg-white dark:bg-gray-900"
            />

            <div className="grid md:grid-cols-2 gap-2">
              {q.options.map((op, oi) => (
                <input
                  key={oi}
                  placeholder={`Opção ${oi + 1}`}
                  value={op}
                  onChange={(e) => updateOption(i, oi, e.target.value)}
                  className="w-full px-2 py-1 rounded border bg-white dark:bg-gray-900"
                />
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm">
              <label>
                Resposta:
                <select
                  className="ml-2 px-2 py-1 rounded border bg-white dark:bg-gray-900"
                  value={q.answerIndex}
                  onChange={(e) =>
                    update(i, { answerIndex: Number(e.target.value) })
                  }
                >
                  {q.options.map((_, oi) => (
                    <option key={oi} value={oi}>
                      {oi + 1}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={!!q.revealOnClick}
                  onChange={(e) =>
                    update(i, { revealOnClick: e.target.checked })
                  }
                />
                Mostrar resposta ao clicar
              </label>
            </div>

            <button
              onClick={() => remove(i)}
              className="text-xs text-red-600"
            >
              Remover pergunta
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
