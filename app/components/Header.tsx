"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/ui/completion", label: "Completion" },
  { href: "/ui/stream", label: "Streaming" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 hover:text-amber-600 dark:hover:text-amber-400"
        >
          AI-APPS
        </Link>
        <ul className="flex gap-1">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
