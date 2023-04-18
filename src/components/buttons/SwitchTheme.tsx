import { useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useLocalStorage } from "usehooks-ts";

export const SwitchTheme = () => {
  const [theme, setTheme] = useLocalStorage("theme", "darkmode");

  const toggleTheme = () => {
    setTheme(theme === "darkmode" ? "lightmode" : "darkmode");
  };

  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-full focus:outline-none"
      onClick={toggleTheme}
    >
      {theme === "lightmode" ? (
        <SunIcon className="h-6 w-6 text-yellow-500 hover:cursor-pointer" />
      ) : (
        <MoonIcon className="h-10 min-w-[40px] text-black rounded-full p-2 bg-white hover:cursor-pointer" />
      )}
    </span>
  );
};
