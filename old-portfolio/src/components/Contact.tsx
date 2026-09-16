import Link from "next/link";

export default function Contact() {
  return (
    <div className="space-y-2 text-lg text-gray-300">
      <p>
        Email:{" "}
        <Link
          href="mailto:dgrebch@gmail.com"
          className="text-green-400 underline"
        >
          dgrebch@gmail.com
        </Link>
      </p>
      <p>
        GitHub:{" "}
        <Link
          href="https://github.com/onlygreb"
          target="_blank"
          className="text-green-400 underline"
        >
          github.com/onlygreb
        </Link>
      </p>
      <p>
        LinkedIn:{" "}
        <Link
          href="https://www.linkedin.com/in/eduardogreb"
          target="_blank"
          className="text-green-400 underline"
        >
          linkedin.com/in/eduardogreb
        </Link>
      </p>
    </div>
  );
}
