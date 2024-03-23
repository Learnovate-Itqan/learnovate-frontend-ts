import { addDays, format, isSameDay, isToday, subDays } from "date-fns";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const SESSIONS = [
  {
    id: 1,
    date: new Date("2024-03-22"),
    startTime: 10,
    endTime: 11,
    student: {
      name: "Matthew Lane",
    },
  },
  {
    id: 2,
    date: new Date("2024-03-23"),
    startTime: 12,
    endTime: 13,
    student: {
      name: "Mildred Waters",
    },
  },
  {
    id: 3,
    date: new Date("2024-03-22"),
    startTime: 14,
    endTime: 15,
    student: {
      name: "David Ingram",
    },
  },
  {
    id: 4,
    date: new Date("2024-03-22"),
    startTime: 16,
    endTime: 17,
    student: {
      name: "Duane Cruz",
    },
  },
  {
    id: 5,
    date: new Date("2024-03-23"),
    startTime: 18,
    endTime: 19,
    student: {
      name: "Gene Cummings",
    },
  },
  {
    id: 6,
    date: new Date("2024-03-24"),
    startTime: 20,
    endTime: 21,
    student: {
      name: "Edgar Rogers",
    },
  },
];
export function BookedSessions() {
  const [currentDay, setCurrentDay] = useState(new Date());

  return (
    <section className=" shadow-custom container md:max-lg:px-2 py-5 rounded-lg">
      <header className="flex justify-between items-center">
        {!isToday(currentDay) && (
          <Button variant="link" className=" md:text-lg" onClick={() => setCurrentDay((prev) => subDays(prev, 1))}>
            <IoIosArrowForward className=" rotate-180" />
            Back
          </Button>
        )}
        <div className="flex flex-col items-center gap-1">
          <h2 className=" text-lg md:text-2xl font-semibold">
            {isToday(currentDay) ? "Today" : format(currentDay, "eeee")}
          </h2>
          <span className="text-zinc-400 text-xs sm:text-sm">{format(currentDay, "dd-MM-yyyy")}</span>
        </div>
        <Button variant="link" className="md:text-lg" onClick={() => setCurrentDay((prev) => addDays(prev, 1))}>
          Tomorrow
          <IoIosArrowForward />
        </Button>
      </header>
      <ScrollArea className=" h-72 pr-3">
        <div className="grid grid-cols-1 gap-4 mt-4">
          {SESSIONS.map((session) => {
            if (!isSameDay(session.date, currentDay)) return null;
            return (
              <div
                key={session.id}
                className="flex justify-between bg-zinc-100 px-3 py-3 rounded-lg items-baseline gap-4"
              >
                <div className="flex gap-1 flex-col">
                  <span className=" text-sm sm:text-base font-semibold">Meeting With {session.student.name}</span>
                  <span className=" text-xs sm:text-sm text-zinc-500">
                    {format(new Date().setHours(session.startTime), "hh:00 a")} -{" "}
                    {format(new Date().setHours(session.endTime), "hh:00 a")}
                  </span>
                </div>
                <Button variant="link" className="text-wrap flex items-center  text-royal-blue">
                  Go to meeting
                  <IoIosArrowForward className=" hidden md:block" />
                </Button>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
}
