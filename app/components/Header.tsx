"use client";

import { useTheme } from "../hooks/useTheme";
import { FiSun, FiMoon, FiBook } from "react-icons/fi";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-[#ffffff] dark:bg-[#1f2937] border-b border-[#e5e7eb] dark:border-[#374151]">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FiBook className="text-[#2563eb] dark:text-[#60a5fa] text-2xl" />
          <h1 className="text-xl md:text-2xl font-bold text-[#1f2937] dark:text-[#ffffff]">
            Course Progress Tracker
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-[9999px] hover:bg-[#f3f4f6] dark:hover:bg-[#374151]"
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <FiMoon className="text-[#374151] text-xl" />
          ) : (
            <FiSun className="text-[#fcd34d] text-xl" />
          )}
        </button>
      </div>
    </header>
  );
};
