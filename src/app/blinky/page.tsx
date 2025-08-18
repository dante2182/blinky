import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ShortLinksTable } from "@/components/shortlink/shortlinks-table";
import db from "@/lib/db";
import CreateLink from "@/components/shortlink/create-link";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* Create Short Link  */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <CreateLink />
          </div>
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

// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { ShortLinksTable } from "@/components/shortlink/shortlinks-table";
// import db from "@/lib/db";
// import CreateLink from "@/components/shortlink/create-link";

// const BlinkyPage = async () => {
//   const session = await auth();

//   if (!session) {
//     redirect("/sign-in");
//   }

//   // Obtener los ShortLinks del usuario desde la base de datos
//   const shortLinksFromDb = await db.shortLink.findMany({
//     where: {
//       userId: session.user?.id,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   // Serializar las fechas para que puedan ser pasadas a un Componente de Cliente
//   const shortLinks = shortLinksFromDb.map((link) => ({
//     ...link,
//     createdAt: link.createdAt.toISOString(),
//     updatedAt: link.updatedAt.toISOString(),
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br pt-28 px-6 sm:px-12 xl:px-32 2xl:px-72">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//             <h3 className="text-gray-300 text-sm font-medium">Total Links</h3>
//             <p className="text-3xl font-bold text-white mt-2">
//               {shortLinks.length}
//             </p>
//           </div>
//         </div>

//         {/* Create Short Link  */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-4">
//             <CreateLink />
//           </div>
//         </div>

//         {/* Short Links Table */}
//         <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//           <h2 className="text-2xl font-bold text-white mb-6">Your Links</h2>
//           <ShortLinksTable shortLinks={shortLinks} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlinkyPage;
