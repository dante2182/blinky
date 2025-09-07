"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import DropMenu from "./drop-menu";

interface UserAvatarProps {
  userData: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserAvatar({ userData }: UserAvatarProps) {
  return (
    <DropMenu userData={userData}>
      <Avatar className="cursor-pointer w-9 h-9 rounded-full overflow-hidden">
        <AvatarImage src={userData.image || ""} />
      </Avatar>
    </DropMenu>
  );
}
