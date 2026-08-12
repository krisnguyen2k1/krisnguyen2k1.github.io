"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/site";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-border bg-canvas"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex min-h-16 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3 font-serif font-medium tracking-[-0.02em]">
          <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-button bg-accent-tint text-sm text-accent-press">
            KN
          </span>
          <span>Kris Nguyen</span>
        </Link>

        <button
          ref={menuButton}
          type="button"
          className="min-h-11 min-w-11 rounded-button border border-secondary px-3 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="site-navigation"
          aria-label="Primary navigation"
          className={`${
            open ? "flex" : "hidden"
          } absolute inset-x-0 top-16 flex-col border-b border-border bg-canvas px-3 pb-4 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center border-b px-2 text-sm font-medium md:border-b-2 md:px-3 ${
                  active
                    ? "border-accent-press text-primary"
                    : "border-transparent text-secondary hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
