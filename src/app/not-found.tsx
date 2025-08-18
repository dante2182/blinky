import { HomeLogo } from "@/components/icons/logos";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-screen text-center px-6">
      <div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          404 - Page Not Found
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
          Oops! The page you are looking for could not be found.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25"
          >
            <HomeLogo />
            <span className="ml-2">Go back to Home</span>
          </Link>
          <Link
            href="https://github.com/samfint/blinky/issues/new"
            target="_blank"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25"
          >
            <span className="mr-2">Create a Issue</span>
            <ExternalLink />
          </Link>
        </div>
      </div>
    </section>
  );
}
