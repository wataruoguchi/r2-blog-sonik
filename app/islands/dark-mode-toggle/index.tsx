import { useDarkMode } from "usehooks-ts";
import { DarkIcon } from "./dark.svg";
import { LightIcon } from "./light.svg";
import { useIsSsr } from "../../hooks/use-is-ssr";
import { useEffect } from "react";

// Named export does not work with Sonik
export default function DarkModeToggle() {
  const addDarkIfDarkMode = () => {
    // https://tailwindcss.com/docs/dark-mode
    document.documentElement.classList[isDarkMode ? "add" : "remove"]("dark");
  };

  const isSSR = useIsSsr();
  const { isDarkMode, toggle } = useDarkMode();
  useEffect(() => {
    addDarkIfDarkMode();
  });

  if (isSSR)
    return <button className="w-5 h-5" aria-label="placeholder"></button>;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [Icon, className] = isDarkMode
    ? [DarkIcon, "text-white"]
    : [LightIcon, "text-dark"];
  return (
    <button
      className={className}
      onClick={() => {
        addDarkIfDarkMode();
        toggle();
      }}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
