import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function ThemeSwitcher(): React.JSX.Element {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <section
      className="flex justify-center items-center cursor-pointer dark:text-white text-black"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icon
        width={25}
        icon={`${
          theme === "dark"
            ? "material-symbols:light-mode"
            : "material-symbols:dark-mode-outline-rounded"
        }`}
      />
    </section>
  );
}
