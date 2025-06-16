import Link from "next/link";

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
  return (
    <nav className="container mx-auto flex justify-end items-center px-8 py-4 space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-gray-300 hover:text-green-400 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
