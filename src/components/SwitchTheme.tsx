import { useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useLocalStorage } from "usehooks-ts";

export const SwitchTheme = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full focus:outline-none"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-700" />
      )}
    </button>
  );
};
