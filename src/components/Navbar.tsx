"use client";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar(): React.JSX.Element {
  return (
    <nav className="py-4 px-6 themed-bg">
      <section className="flex justify-center">
        <ThemeSwitcher />
      </section>
    </nav>
  );
}
