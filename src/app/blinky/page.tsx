import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignOut } from "@/components/sign-out";

const BlinkyPage = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium">{session.user?.email}</p>
        {/* <img src={session.user?.image} /> */}
      </div>

      <SignOut />
    </div>
  );
};

export default BlinkyPage;
