"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Laptop2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown";

const THEME_KEY = "theme-preference";
type Theme = "light" | "dark" | "system";

export function ThemeDropdown() {
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
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        root.classList.toggle("dark", e.matches);
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  const icon =
    theme === "light" ? <Sun className="w-5 h-5" /> :
    theme === "dark" ? <Moon className="w-5 h-5" /> :
    <Laptop2 className="w-5 h-5" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center gap-2 px-2 py-1 rounded hover:bg-accent border border-border shadow-sm"
          aria-label="Theme selector"
        >
          {icon}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-[56px] border border-border rounded-lg shadow-lg bg-background p-1 flex flex-col items-center">
        <DropdownMenuItem onClick={() => setTheme("light")}
          className={`flex justify-center items-center w-10 h-10 rounded-md transition-colors cursor-pointer group ${theme === "light" ? "bg-accent" : "hover:bg-muted"}`}
        >
          <Sun className="w-5 h-5 group-hover:scale-125 transition-transform duration-200" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}
          className={`flex justify-center items-center w-10 h-10 rounded-md transition-colors cursor-pointer group ${theme === "dark" ? "bg-accent" : "hover:bg-muted"}`}
        >
          <Moon className="w-5 h-5 group-hover:scale-125 transition-transform duration-200" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}
          className={`flex justify-center items-center w-10 h-10 rounded-md transition-colors cursor-pointer group ${theme === "system" ? "bg-accent" : "hover:bg-muted"}`}
        >
          <Laptop2 className="w-5 h-5 group-hover:scale-125 transition-transform duration-200" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
