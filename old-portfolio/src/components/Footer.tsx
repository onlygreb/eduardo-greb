import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="bg-gray-900 text-gray-400 py-10 border-t border-gray-800"
      id="contact"
    >
      <div className="container mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-lg font-semibold text-white">Contact Me</span>

        <Link
          href="mailto:dgrebch@gmail.com"
          className="flex items-center space-x-3 hover:text-green-400 transition-colors"
        >
          <EnvelopeIcon className="h-6 w-6" />
          <span className="text-sm font-medium">dgrebch@gmail.com</span>
        </Link>

        <div className="flex space-x-6">
          <Link
            href="https://github.com/onlygreb"
            target="_blank"
            aria-label="GitHub"
            className="hover:text-green-400 transition-colors"
          >
            <FaGithub className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/eduardogreb"
            target="_blank"
            aria-label="LinkedIn"
            className="hover:text-green-400 transition-colors"
          >
            <FaLinkedin className="h-6 w-6" />
          </Link>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Eduardo Greb. All rights reserved.
      </div>
    </footer>
  );
}
