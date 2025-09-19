// src/lib/store.ts
import type { Project } from "./projects";

const KEY = "projects";

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Project[]) : [];
}

export function saveProjects(projects: Project[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(projects));
}

export function upsertProject(p: Project) {
  const all = loadProjects();
  const idx = all.findIndex((x) => x.id === p.id);
  if (idx >= 0) all[idx] = p;
  else all.push(p);
  saveProjects(all);
}

export function removeProject(id: string) {
  const all = loadProjects().filter((p) => p.id !== id);
  saveProjects(all);
}

export function getProject(id: string): Project | undefined {
  const mem = typeof window === "undefined" ? [] : [];
  const local = loadProjects();
  const all = [...mem, ...local]; // mem vazio aqui; páginas fazem merge com MOCK também
  return all.find((p) => p.id === id);
}
