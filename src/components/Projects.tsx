// components/Projects.tsx

"use client"; // Required for using state and event handlers in Next.js App Router

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/Projects";
import { personalProjects } from "@/data/PersonalProjects";
import Reveal from "./Reveal";
import GameModal from "./GameModal";
import { Project } from "@/types";

type ItemsKey = "projects" | "personalProjects";

export default function Projects({ itemsKey }: { itemsKey: ItemsKey }) {
  const items = itemsKey === "projects" ? projects : personalProjects;
  const [modalGameUrl, setModalGameUrl] = useState<string | null>(null);

  const closeModal = () => {
    setModalGameUrl(null);
  };

  const renderCardContent = (item: Project) => (
    <>
      <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-5 transition-opacity" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-300 mb-4">{item.desc}</p>
        <span className="inline-block text-sm font-medium text-green-400 underline opacity-0 group-hover:opacity-100 transition-opacity">
          {item.action === "modal" ? "Click to Play" : "View Project →"}
        </span>
      </div>
    </>
  );

  return (
    <>
      <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => {
            const isModal = item.action === "modal" && item.gameUrl;

            if (isModal) {
              return (
                <div
                  key={item.title}
                  onClick={() => setModalGameUrl(item.gameUrl!)}
                  className="group relative bg-gray-800 p-6 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 cursor-pointer"
                >
                  {renderCardContent(item)}
                </div>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.url}
                target="_blank"
                className="group relative block bg-gray-800 p-6 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2"
              >
                {renderCardContent(item)}
              </Link>
            );
          })}
        </div>
      </Reveal>

      <GameModal
        isOpen={!!modalGameUrl}
        onClose={closeModal}
        gameUrl={modalGameUrl || ""}
      />
    </>
  );
}
