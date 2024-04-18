import { z } from "zod";

import { UserAvatar } from "@/components/ui/UserAvatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mentorSchema } from "@/schemas/mentorSchema";
import { formatCurrency } from "@/utils/helpers";

type MentorTableProps = {
  mentors: z.infer<typeof mentorSchema>[];
};

export function MentorsTable({ mentors }: MentorTableProps) {
  return (
    <Table className="mt-2">
      <TableHeader>
        <TableRow className="*:text-dark-navy *:font-semibold">
          <TableHead>No</TableHead>
          <TableHead>Id Mentor</TableHead>
          <TableHead>Mentor Name</TableHead>
          <TableHead>Track</TableHead>
          <TableHead>Learner</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Price/hr</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1 > 9 ? index + 1 : "0" + (index + 1)}</TableCell>
            <TableCell>#{index + 1}</TableCell>
            <TableCell className="flex justify-start items-center gap-2">
              <UserAvatar
                fallbackClassName="text-xs text-white"
                name={"Khaled Ahmed"}
                imageUrl={""}
                className=" w-6 h-6"
              />
              {"Khaled Ahmed"}
            </TableCell>
            <TableCell>{"Data Science"}</TableCell>
            <TableCell>{1200}</TableCell>
            <TableCell>{4.5}</TableCell>
            <TableCell>{formatCurrency(60)}</TableCell>
          </TableRow>
        ))}
        {mentors.map((mentor, index) => (
          <TableRow key={mentor.id}>
            <TableCell className="font-medium">{index + 1 > 9 ? index + 1 : "0" + (index + 1)}</TableCell>
            <TableCell>#{mentor?.id}</TableCell>
            <TableCell className="flex justify-start items-center gap-2">
              <UserAvatar
                fallbackClassName="text-xs text-white"
                name={mentor?.user?.name}
                imageUrl={mentor?.user?.image}
                className=" w-6 h-6"
              />
              {mentor?.user?.name}
            </TableCell>
            <TableCell>{mentor?.track?.name}</TableCell>
            <TableCell>{mentor?.noStudents}</TableCell>
            <TableCell>{mentor?.rating}</TableCell>
            <TableCell>{formatCurrency(mentor?.pricePerHour)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
