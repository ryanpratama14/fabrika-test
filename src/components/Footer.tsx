import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="px-normal py-4 flex justify-center themed-bg">
      <p className="text-center md:text-base text-sm">
        Hi! This site was created as a technical test for the Junior React
        Develoepr position at Фабрика Приложений Company.
        <br />
        Ryan Pratama / Пратама Риан
        <br />
        <Link
          href="https://t.me/ryanpratama14"
          target="_blank"
          className="underline"
        >
          tg: @ryanpratama14
        </Link>
      </p>
    </footer>
  );
}
