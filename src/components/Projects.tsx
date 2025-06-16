import Link from "next/link";
import { projects } from "@/data/Projects";
import { personalProjects } from "@/data/PersonalProjects";

type ItemsKey = "projects" | "personalProjects";
export default function Projects({ itemsKey }: { itemsKey: ItemsKey }) {
  const items = itemsKey === "projects" ? projects : personalProjects;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          target="_blank"
          className="group relative bg-gray-800 p-6 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-5 transition" />

          <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-300 mb-4">{item.desc}</p>
          <span className="inline-block text-sm font-medium text-green-400 underline opacity-0 group-hover:opacity-100 transition-opacity">
            View Project →
          </span>
        </Link>
      ))}
    </div>
  );
}
