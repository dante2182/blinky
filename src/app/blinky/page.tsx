import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignOut } from "@/components/sign-out";
import { CreateShortLinkForm } from "@/components/create-shortlink-form";
import { ShortLinksTable } from "@/components/shortlinks-table";
import db from "@/lib/db";

const BlinkyPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  // Obtener los ShortLinks del usuario
  const shortLinks = await db.shortLink.findMany({
    where: {
      userId: session.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br pt-32 px-6 sm:px-12 xl:px-32 2xl:px-72">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {session.user?.name || session.user?.email}! 👋
            </h1>
            <p className="text-gray-300">Create and manage your short links</p>
          </div>
          <SignOut />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-gray-300 text-sm font-medium">Total Links</h3>
            <p className="text-3xl font-bold text-white mt-2">
              {shortLinks.length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-gray-300 text-sm font-medium">Active Links</h3>
            <p className="text-3xl font-bold text-green-400 mt-2">
              {shortLinks.length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-gray-300 text-sm font-medium">Total Clicks</h3>
            <p className="text-3xl font-bold text-blue-400 mt-2">0</p>
          </div>
        </div>

        {/* Create Short Link Form */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">
            Create New Short Link
          </h2>
          <CreateShortLinkForm />
        </div>

        {/* Short Links Table */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Your Links</h2>
          <ShortLinksTable shortLinks={shortLinks} />
        </div>
      </div>
    </div>
  );
};

export default BlinkyPage;
