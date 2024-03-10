import { z } from "zod";

import { userSchema } from "@/schemas/userSchema";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function MeetingMember({ member }: { member: z.infer<typeof userSchema> }) {
  return (
    <div className=" p-10 flex flex-col justify-center items-center gap-3 grow overflow-hidden bg-[#222C54] text-white rounded-md w-full">
      <Avatar className="w-24 h-24">
        <AvatarImage src={member.image} title={member.name} alt={member.name} />
        <AvatarFallback className=" bg-royal-blue text-lg">{member.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span>{member.name}</span>
    </div>
  );
}
