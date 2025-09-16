import { GithubLogo, LinkedinLogo, XLogo } from "@/components/icons/logos";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import Image from "next/image";
import UserAvatar from "../auth/user-avatar";
import { ModeToggle } from "../modeToggle";

export default async function Header() {
  const session = await auth();

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-3xl z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="logo.png"
            className="rounded-sm transition hover:scale-110 duration-500"
            width={40}
            height={40}
          />
          <Link
            href="/"
            className="font-bold flex items-center space-x-3 transition-opacity hover:opacity-80 rtl:space-x-reverse"
          >
            Blinky
          </Link>

          <div className="w-full max-w-sm animate-rotate-border rounded-lg bg-conic/[from_var(--border-angle)] from-80% via-neutral-950 dark:via-neutral-200 via-90% to-neutral-950 dark:to-neutral-100 to-100% p-px">
            <div className="rounded-lg bg-gray-200 dark:bg-neutral-900 px-4 py-1 text-center text-xs">
              <span className="font-bold">Beta</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 items-center">
          <a
            href="https://github.com/dante2182"
            className="inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 w-9"
          >
            <GithubLogo />
          </a>
          <a
            href="https://www.linkedin.com/in/dante-rodriguez-chambi/"
            className="inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 w-9"
          >
            <LinkedinLogo />
          </a>
          <a
            href="https://x.com/dani218002"
            className="inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 w-9"
          >
            <XLogo />
          </a>
          <ModeToggle />
          {session ? (
            <div className="flex items-center space-x-2">
              <UserAvatar
                userData={{
                  name: session.user?.name,
                  email: session.user?.email,
                  image: session.user?.image,
                }}
              />
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="cursor-pointer" variant="secondary">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
