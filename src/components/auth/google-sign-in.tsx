// src/components/google-sign-in.tsx
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "@/components/icons/logos";

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="w-full">
        <GoogleLogo />
        Continue with Google
      </Button>
    </form>
  );
};

export { GoogleSignIn };
