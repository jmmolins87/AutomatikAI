"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "theme-preference";

type Theme = "light" | "dark" | "system";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem(THEME_KEY) as Theme) || "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (t: Theme) => {
      if (t === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", isDark);
      } else {
        root.classList.toggle("dark", t === "dark");
      }
    };
    applyTheme(theme);
    if (theme !== "system") {
      localStorage.setItem(THEME_KEY, theme);
    } else {
      localStorage.removeItem(THEME_KEY);
    }
    // Listen to system changes if system selected
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        root.classList.toggle("dark", e.matches);
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  return (
    <div className="flex gap-2 items-center">
      <button
        className={`px-3 py-1 rounded ${theme === "light" ? "bg-primary text-white" : "bg-muted"}`}
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
      >
        Light
      </button>
      <button
        className={`px-3 py-1 rounded ${theme === "dark" ? "bg-primary text-white" : "bg-muted"}`}
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
      >
        Dark
      </button>
      <button
        className={`px-3 py-1 rounded ${theme === "system" ? "bg-primary text-white" : "bg-muted"}`}
        onClick={() => setTheme("system")}
        aria-pressed={theme === "system"}
      >
        Auto
      </button>
    </div>
  );
}
