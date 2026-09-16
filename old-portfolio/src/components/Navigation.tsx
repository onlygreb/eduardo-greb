"use client";
import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#highlights", label: "Highlights" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#personal-projects", label: "Personal Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  return (
    <nav className="container mx-auto px-4 sm:px-8 py-4 relative">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-white">Eduardo Greb</div>

        <button
          className="sm:hidden text-gray-300"
          onClick={toggle}
          aria-label="Toggle menu"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        <ul className="hidden sm:flex sm:items-center sm:space-x-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-green-400"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <ul className="flex flex-col mt-4 space-y-2 sm:hidden">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className="block text-sm font-medium text-gray-300 hover:text-green-400 py-2 px-1"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
