import { format } from "date-fns";
import { z } from "zod";

import { UserAvatar } from "@/components/ui/UserAvatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { courseSchema } from "@/schemas/courseSchema";
import { formatCurrency } from "@/utils/helpers";

import { LevelTag } from "./LevelTag";

type MentorTableProps = {
  courses: z.infer<typeof courseSchema>[];
};

export function CoursesTable({ courses }: MentorTableProps) {
  return (
    <Table className="mt-2">
      <TableHeader>
        <TableRow className="*:text-dark-navy *:font-semibold">
          <TableHead>No</TableHead>
          <TableHead>Course Name</TableHead>
          <TableHead>Publisher</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Published Date</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1 > 9 ? index + 1 : "0" + (index + 1)}</TableCell>
            <TableCell>Python Foundation and..</TableCell>
            <TableCell className="flex justify-start items-center gap-2">
              <UserAvatar
                fallbackClassName="text-xs text-white"
                name={"Khaled Ahmed"}
                imageUrl={""}
                className=" w-6 h-6"
              />
              {"Khaled Ahmed"}
            </TableCell>
            <TableCell>
              <LevelTag level="intermediate" />
            </TableCell>
            <TableCell>{format(new Date(), "dd-MM-yyyy")}</TableCell>
            <TableCell>{4.5}</TableCell>
            <TableCell>{formatCurrency(60)}</TableCell>
          </TableRow>
        ))}
        {courses?.map((course, index) => (
          <TableRow key={course.id}>
            <TableCell className="font-medium">{index + 1 > 9 ? index + 1 : "0" + (index + 1)}</TableCell>
            <TableCell>#{course?.id}</TableCell>
            <TableCell className="flex justify-start items-center gap-2">
              <UserAvatar
                fallbackClassName="text-xs text-white"
                name={course?.publisher?.name}
                imageUrl={course?.publisher?.image}
                className=" w-6 h-6"
              />
              {course?.publisher?.name}
            </TableCell>
            <TableCell>
              <LevelTag level={course?.cLevel} />
            </TableCell>
            <TableCell>{format(course?.publishTime, "dd-MM-yyyy")}</TableCell>
            <TableCell>{course?.rating}</TableCell>
            <TableCell>{formatCurrency(course?.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
