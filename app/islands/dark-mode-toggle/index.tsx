import { useDarkMode, useIsClient } from "usehooks-ts";
import { DarkIcon } from "./dark.svg";
import { LightIcon } from "./light.svg";
import { useEffect } from "react";

// Named export does not work with Sonik
export default function DarkModeToggle() {
  const addDarkIfDarkMode = () => {
    // https://tailwindcss.com/docs/dark-mode
    document.documentElement.classList[isDarkMode ? "add" : "remove"]("dark");
  };

  const isClient = useIsClient();
  const { isDarkMode, toggle } = useDarkMode();
  useEffect(() => {
    addDarkIfDarkMode();
  });

  if (!isClient)
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
