import { z } from "zod";

import { MeetingMember } from "@/components/meeting/MeetingMember";
import { userSchema } from "@/schemas/userSchema";

export function MeetingMembers({ users }: { users: z.infer<typeof userSchema>[] }) {
  return (
    <div className=" flex flex-col gap-3 grow m-2 mb-0  scrollbar">
      {users.map((user) => (
        <MeetingMember key={user.id} member={user as z.infer<typeof userSchema>} />
      ))}
    </div>
  );
}
