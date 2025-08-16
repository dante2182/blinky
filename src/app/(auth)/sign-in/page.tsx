// src/app/(auth)/sign-in/page.tsx
import { GithubSignIn } from "@/components/github-sign-in";
import { GoogleSignIn } from "@/components/google-sign-in";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/blinky");

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto space-y-6 border-4 bg-gray-100 py-8 px-6 rounded-3xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-center mb-2">
            Welcome to Blinky
          </h1>
          <p className="text-gray-600 text-sm">
            Sign in to start creating your short links
          </p>
        </div>

        <div className="space-y-3">
          <GithubSignIn />
          <GoogleSignIn />
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-gray-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-gray-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
