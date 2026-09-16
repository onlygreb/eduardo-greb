import { experiences } from "@/data/Experiences";
import { calculateDuration } from "@/utils/Date";
import type { Experience } from "@/types";

export default function ExperienceTimeline() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {experiences.map((exp: Experience) => {
        const duration = calculateDuration(
          exp.startMonth,
          exp.startYear,
          exp.endMonth,
          exp.endYear
        );
        return (
          <div
            key={`${exp.company}-${exp.startYear}`}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
            <p className="text-green-400 text-sm mb-2">
              {exp.company}, {exp.location}
            </p>
            <p className="text-gray-400 text-sm mb-4">
              {exp.startMonth} {exp.startYear} &ndash; {exp.endMonth}{" "}
              {exp.endYear} ({duration})
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
              {exp.activities.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="bg-gray-700 text-green-300 px-2 py-1 rounded text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
            {exp.relatedProject && (
              <a
                href={exp.relatedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-green-400 underline"
              >
                View {exp.relatedProject.name}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
