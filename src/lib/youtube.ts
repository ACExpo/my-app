// src/lib/youtube.ts
export function normalizeYouTubeUrl(url: string): string {
  try {
    const u = new URL(url);

    // caso 1: link normal do YouTube (watch?v=ID)
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }

    // caso 2: link de compartilhamento curto (youtu.be/ID)
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }

    // caso 3: shorts (youtube.com/shorts/ID)
    if (u.pathname.startsWith("/shorts/")) {
      return `https://www.youtube.com/embed/${u.pathname.split("/")[2]}`;
    }

    // caso 4: já é embed → retorna como está
    if (u.pathname.startsWith("/embed/")) {
      return url;
    }

    // fallback → retorna original
    return url;
  } catch {
    return url;
  }
}
