import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrashLogo } from "@/components/icons/logos";

const SettingsPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });

  return (
    <div className="h-full max-w-6xl mx-auto pt-24 pb-32 space-y-6 px-6">
      <div className="p-6 rounded-lg border border-neutral-700 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">General</h1>
          <p className="text-gray-600">View your personal information</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Your Name
            </Label>
            <Input
              id="name"
              disabled
              type="text"
              placeholder="Name"
              value={user?.name || ""}
              className="w-full focus:ring-2 focus:ring-offset-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Your Email
            </Label>
            <Input
              id="email"
              disabled
              type="email"
              placeholder="Email"
              value={user?.email || ""}
              className="w-full focus:ring-2 focus:ring-offset-2"
            />
            <p className="text-xs text-neutral-500 mt-1">
              ⚠️ This email address is managed by your OAuth provider. You
              cannot change it.
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 rounded-lg border border-neutral-700 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Account</h1>
        <p className="text-neutral-400 mb-6">Update your Account Settings</p>
        <div className="space-y-2 flex justify-between items-center">
          <p className="text-neutral-400">Delete your Account:</p>
          <button className="bg-red-700 px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2">
            <TrashLogo />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
