import { useTheme } from "@/components/ThemeProvider";
import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";

function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Toggle theme dropdown"
      >
        {theme === "dark" ? <Moon /> : theme === "light" ? <Sun /> : <Monitor />}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border rounded shadow z-50">
          <button
            className="flex items-center w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => { setTheme("light"); setOpen(false); }}
          >
            <Sun className="mr-2" /> Light
          </button>
          <button
            className="flex items-center w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => { setTheme("dark"); setOpen(false); }}
          >
            <Moon className="mr-2" /> Dark
          </button>
          <button
            className="flex items-center w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => { setTheme("system"); setOpen(false); }}
          >
            <Monitor className="mr-2" /> System
          </button>
        </div>
      )}
    </div>
  );
}
export default ThemeDropdown