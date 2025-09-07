import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import CreateLink from "@/components/shortlink/create-link";
import { CardLinks } from "@/components/shortlink/card-link";

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
        {/* Create Short Link  */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Your Links</h2>
          <div className="flex items-center space-x-4">
            <CreateLink />
          </div>
        </div>

        {/* Short Links Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <CardLinks
            shortLinks={shortLinks.map((link) => ({
              ...link,
              createdAt: link.createdAt.toISOString(),
              updatedAt: link.updatedAt.toISOString(),
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default BlinkyPage;
