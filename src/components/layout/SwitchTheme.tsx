import { useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
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
      className="flex h-7 w-7 items-center justify-center rounded-full focus:outline-none"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <SunIcon className="h-10 min-w-[40px] text-yellow-500 rounded-full p-2 bg-black" />
      ) : (
        <MoonIcon className="h-10 min-w-[40px] text-black rounded-full p-2 bg-white" />
      )}
    </button>
  );
};
