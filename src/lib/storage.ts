// src/lib/storage.ts

// Carregar progresso salvo no localStorage
export function getProgress(setId: string): number[] {
  if (typeof window === "undefined") return []; // se estiver no server
  const raw = localStorage.getItem(`progress:${setId}`);
  return raw ? JSON.parse(raw) : [];
}

// Salvar progresso no localStorage
export function setProgress(setId: string, progress: number[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`progress:${setId}`, JSON.stringify(progress));
}
