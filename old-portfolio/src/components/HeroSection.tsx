import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="about"
      className="flex flex-col justify-center items-start min-h-[calc(100vh-4rem)] max-w-2xl mx-auto px-4 sm:px-0 mb-16"
    >
      <p className="text-green-400 uppercase tracking-widest mb-2 text-xs">
        Hello, my name is
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold mb-3">Eduardo Greb.</h1>
      <h2 className="text-2xl sm:text-4xl font-semibold text-gray-400 mb-2">
        I’m a Senior Full Stack Engineer.
      </h2>
      <h2 className="text-2xl sm:text-4xl font-semibold text-gray-400 mb-6">
        And a Senior Game Developer.
      </h2>
      <Link
        href="#experience"
        className="inline-block text-green-400 border border-green-400 px-5 py-2 rounded hover:bg-green-400 hover:bg-opacity-20 transition text-sm sm:text-base"
      >
        View Experience
      </Link>
    </section>
  );
}
