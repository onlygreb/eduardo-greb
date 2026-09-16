import { highlights } from "@/data/Highlights";

export default function Highlights() {
  return (
    <ul className="list-disc list-inside space-y-3 text-lg text-gray-300">
      {highlights.map((h, i) => (
        <li key={i}>
          <b>{h.title} </b>
          {h.text}
        </li>
      ))}
    </ul>
  );
}
