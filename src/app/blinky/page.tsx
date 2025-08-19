import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import CreateLink from "@/components/shortlink/create-link";
import { CardLinks } from "@/components/shortlink/card-link";
import { ActiveLogo, ClickLogo, UrlLogo } from "@/components/icons/logos";

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
    <div className="min-h-screen bg-gradient-to-br pt-28 px-6 sm:px-12 xl:px-32 2xl:px-72">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-sky-600 p-6 rounded-lg flex items-center justify-between transition-all duration-200 hover:scale-[1.02]">
            <div>
              <h1 className="text-2xl font-bold text-white">Total Links</h1>
              <h1 className="text-2xl font-bold text-white">
                {shortLinks.length}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white w-12 h-12 rounded-lg flex items-center justify-center bg-[#3393e2]">
                <UrlLogo />
              </div>
            </div>
          </div>
          <div className="border border-emerald-600 p-6 rounded-lg flex items-center justify-between transition-all duration-200 hover:scale-[1.02]">
            <div>
              <h1 className="text-2xl font-bold text-white">Active Links</h1>
              <h1 className="text-2xl font-bold text-white">
                {shortLinks.length}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white w-12 h-12 rounded-lg flex items-center justify-center bg-[#09656b]">
                <ActiveLogo />
              </div>
            </div>
          </div>
          <div className="border border-yellow-600 p-6 rounded-lg flex items-center justify-between transition-all duration-200 hover:scale-[1.02]">
            <div>
              <h1 className="text-2xl font-bold text-white">Clicks</h1>
              <h1 className="text-2xl font-bold text-white">
                {shortLinks.length}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white w-12 h-12 rounded-lg flex items-center justify-center bg-yellow-600">
                <ClickLogo />
              </div>
            </div>
          </div>
          <div className="border border-indigo-600 p-6 rounded-lg flex items-center justify-between transition-all duration-200 hover:scale-[1.02]">
            <div>
              <h1 className="text-2xl font-bold text-white">This Month</h1>
              <h1 className="text-2xl font-bold text-white">
                {shortLinks.length}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white w-12 h-12 rounded-lg flex items-center justify-center bg-indigo-600">
                <ClickLogo />
              </div>
            </div>
          </div>
        </div>

        {/* Create Short Link  */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white ">Your Links</h2>
          <div className="flex items-center space-x-4">
            <CreateLink />
          </div>
        </div>

        {/* Short Links Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <CardLinks shortLinks={shortLinks.map(link => ({
            ...link,
            createdAt: link.createdAt.toISOString(),
            updatedAt: link.updatedAt.toISOString()
          }))} />
        </div>
      </div>
    </div>
  );
};

export default BlinkyPage;
