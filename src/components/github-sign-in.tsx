import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { GithubLogo } from "./ui/icons/logos";

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button className="w-full">
        <GithubLogo />
        Continue with Github
      </Button>
    </form>
  );
};

export { GithubSignIn };
