import { GithubLogo, LinkedinLogo, XLogo } from "@/components/ui/icons/logos";
import { Button } from "./ui/button";

export default function navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <div>
        <a href="/">Blinky</a>
      </div>
      <div className="flex space-x-2 items-center">
        <a
          href=""
          className="inline-flex items-center hover:bg-gray-800  px-2 py-2 rounded-md"
        >
          <GithubLogo />
        </a>
        <a
          href=""
          className="inline-flex items-center hover:bg-gray-800  px-2 py-2 rounded-md"
        >
          <LinkedinLogo />
        </a>
        <a
          href=""
          className="inline-flex items-center hover:bg-gray-800  px-2 py-2 rounded-md"
        >
          <XLogo />
        </a>
        <a href="/sign-in">
          <Button className="cursor-pointer">Get Started</Button>
        </a>
      </div>
    </nav>
  );
}
