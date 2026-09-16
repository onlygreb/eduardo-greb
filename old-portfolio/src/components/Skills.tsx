import { TechsAndToolsEnum } from "@/utils/TechsAndToolsEnum";

const skillCategories: { title: string; items: TechsAndToolsEnum[] }[] = [
  {
    title: "Languages",
    items: [
      TechsAndToolsEnum.HTML,
      TechsAndToolsEnum.CSS,
      TechsAndToolsEnum.TypeScript,
      TechsAndToolsEnum.JavaScript,
      TechsAndToolsEnum.CSharp,
      TechsAndToolsEnum.CPlusPlus,
      TechsAndToolsEnum.Java,
      TechsAndToolsEnum.Kotlin,
      TechsAndToolsEnum.Swift,
      TechsAndToolsEnum.Dart,
      TechsAndToolsEnum.Python,
      TechsAndToolsEnum.Go,
      TechsAndToolsEnum.PHP,
      TechsAndToolsEnum.Lua,
      TechsAndToolsEnum.GDScript,
      TechsAndToolsEnum.Assembly,
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      TechsAndToolsEnum.React,
      TechsAndToolsEnum.ReactNative,
      TechsAndToolsEnum.Angular,
      TechsAndToolsEnum.Flutter,
      TechsAndToolsEnum.NodeJS,
      TechsAndToolsEnum.Express,
      TechsAndToolsEnum.DotNet,
      TechsAndToolsEnum.Laravel,
      TechsAndToolsEnum.Spring,
      TechsAndToolsEnum.Quarkus,
      TechsAndToolsEnum.GraphQL,
      TechsAndToolsEnum.TailwindCSS,
    ],
  },
  {
    title: "Game Engines",
    items: [
      TechsAndToolsEnum.Unity,
      TechsAndToolsEnum.Unreal,
      TechsAndToolsEnum.Godot,
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      TechsAndToolsEnum.Docker,
      TechsAndToolsEnum.AWS,
      TechsAndToolsEnum.Azure,
      TechsAndToolsEnum.GCP,
      TechsAndToolsEnum.CICD,
      TechsAndToolsEnum.Kafka,
      TechsAndToolsEnum.RabbitMQ,
      TechsAndToolsEnum.GithubActions,
    ],
  },
  {
    title: "Databases",
    items: [
      TechsAndToolsEnum.SQL,
      TechsAndToolsEnum.MySQL,
      TechsAndToolsEnum.PostgreSQL,
      TechsAndToolsEnum.OracleSQL,
      TechsAndToolsEnum.MongoDB,
    ],
  },
];

export default function Skills() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {skillCategories.map((cat) => (
        <div key={cat.title} className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h4 className="font-semibold mb-2 text-green-400">{cat.title}</h4>
          <ul className="list-disc list-inside text-gray-300">
            {cat.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
