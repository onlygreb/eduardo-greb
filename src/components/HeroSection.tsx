import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="about"
      className="flex flex-col justify-center items-start h-screen max-w-2xl mx-auto mb-24"
    >
      <p className="text-green-400 uppercase tracking-widest mb-4 text-sm">
        Hello, my name is
      </p>
      <h1 className="text-5xl font-bold mb-4">Eduardo Greb.</h1>
      <h2 className="text-4xl font-semibold text-gray-400 mb-2">
        I’m a Senior Full Stack Engineer.
      </h2>
      <h2 className="text-4xl font-semibold text-gray-400 mb-6">
        And a Senior Game Developer.
      </h2>
      <Link
        href="#experience"
        className="inline-block text-green-400 border border-green-400 px-6 py-3 rounded hover:bg-green-400 hover:bg-opacity-20 transition"
      >
        View Experience
      </Link>
    </section>
  );
}
