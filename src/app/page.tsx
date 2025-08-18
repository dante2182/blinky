import { GithubLogo, LinkLogo } from "@/components/icons/logos";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex items-center justify-center min-h-screen text-center px-6 max-w-4xl mx-auto">
      <div>
        <div className="mb-8 flex justify-center">
          <div className="animate-pulse">
            <Image src={"/logo.png"} alt="/logo.png" width={150} height={150} />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Enhance Your
          <span className="block bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            Link Management
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed max-w-3xl mx-auto">
          Blinky is an open-source platform that allows you to create, manage,
          and share short links with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/sign-in">
            <button className="group px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25 flex items-center space-x-2 min-w-[200px] justify-center">
              <LinkLogo />
              <span>Create a Link</span>
            </button>
          </Link>

          <Link href="https://github.com/samfint/blinky">
            <button className="group px-8 py-4 bg-transparent hover:bg-gray-800/50 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-600 hover:border-gray-500 flex items-center space-x-2 min-w-[200px] justify-center">
              <GithubLogo />
              <span>Star on GitHub</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
