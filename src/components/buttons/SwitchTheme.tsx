import { useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
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
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-white" />
      )}
    </span>
  );
};
