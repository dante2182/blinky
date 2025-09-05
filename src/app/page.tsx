import { GithubLogo, LinkLogo } from "@/components/icons/logos";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex items-center justify-center min-h-screen text-center px-6 max-w-5xl mx-auto bg-gray-900/30 backdrop-blur-sm rounded-3xl shadow-2xl">
      <div className="py-12">
        <div className="mb-12 flex justify-center">
          <div className="animate-pulse hover:animate-none transition-all duration-500">
            <Image
              src={"/logo.png"}
              alt="/logo.png"
              width={180}
              height={180}
              className="drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
          Enhance Your
          <span className="block bg-gradient-to-r from-blue-200 via-gray-200 to-purple-200 bg-clip-text text-transparent">
            Link Management
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto">
          Blinky is an open-source platform that allows you to create, manage,
          and share short links with <span className="text-blue-200">ease</span>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/sign-in">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-3 min-w-[220px] justify-center">
              <LinkLogo />
              <span>Create a Link</span>
            </button>
          </Link>

          <Link href="https://github.com/dante2182/blinky">
            <button className="group px-8 py-4 bg-gray-800/30 hover:bg-gray-700/40 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-700 hover:border-gray-500 flex items-center space-x-3 min-w-[220px] justify-center backdrop-blur-sm">
              <GithubLogo />
              <span>Star on GitHub</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
