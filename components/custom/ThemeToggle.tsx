"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className="relative w-16 h-8 flex items-center dark:bg-gray-700 bg-primary cursor-pointer rounded-full p-1"
      onClick={handleToggle}
    >
      <SunIcon size={18} className="text-secondary" />
      <div
        className="absolute bg-white dark:bg-darkSecondary w-6 h-6 rounded-full shadow-md transform transition-transform duration-500"
        style={darkMode ? { right: "2px" } : { left: "2px" }}
      />
      <MoonIcon size={18} className="text-white ml-auto" />
    </div>
  );
};

export default ThemeToggle;
