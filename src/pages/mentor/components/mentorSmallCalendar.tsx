import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

import { CalendarCarousel } from "./CalendarCarousel";

export const MentorSmallCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="border p-4 rounded-lg max-w-[18rem] shadow-lg space-y-4">
      <div className="w-fit">
        <h4 className="text-xl font-medium pb-2.5">Availability:</h4>
        <Calendar mode="single" selected={date} onSelect={setDate} className=" p-0 w-fit" showOutsideDays fixedWeeks />
      </div>
      <div className="space-y-3">
        <h4 className="text-xl font-medium pb-2.5">Schedule:</h4>
        <CalendarCarousel />
      </div>
    </div>
  );
};
