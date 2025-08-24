import { GithubLogo, LinkedinLogo, XLogo } from "@/components/icons/logos";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { SignOut } from "@/components/auth/sign-out";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default async function Header() {
  const session = await auth();

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 backdrop-blur-3xl bg-black/30 z-50 lg:px-32 md:px-10 xl:px-72">
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
          className="text-white font-bold flex items-center space-x-3 transition-opacity hover:opacity-80 rtl:space-x-reverse"
        >
          Blinky
        </Link>
      </div>

      <div className="text-white flex space-x-2 items-center">
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

        {session ? (
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={session.user?.image || ""} />
            </Avatar>
            <SignOut />
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="cursor-pointer" variant="secondary">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
