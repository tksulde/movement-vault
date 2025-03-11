"use client";

import { RiMoonClearLine, RiSunLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import { useId } from "react";

export default function ThemeToggle() {
  const id = useId();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col justify-center">
      <input
        type="checkbox"
        name="theme-toggle"
        id={id}
        className="peer sr-only"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle dark mode"
      />
      <label
        className="text-muted-foreground peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 relative inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-[color,box-shadow] outline-none peer-focus-visible:ring-[3px]"
        htmlFor={id}
        aria-hidden="true"
      >
        <RiSunLine className="dark:hidden" size={20} aria-hidden="true" />
        <RiMoonClearLine
          className="hidden dark:block"
          size={20}
          aria-hidden="true"
        />
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
}
