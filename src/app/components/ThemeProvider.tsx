"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    applyTheme(saved ?? "system");
  }, []);

  const applyTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);

    document.documentElement.classList.remove("light", "dark");

    if (t === "light") document.documentElement.classList.add("light");
    if (t === "dark") document.documentElement.classList.add("dark");
    // se for system → não aplica classe, deixa o navegador decidir
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  return ctx;
}
