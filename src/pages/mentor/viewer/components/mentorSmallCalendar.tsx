import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { CalendarCarousel } from "./calendarCarousel";

export const MentorSmallCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="border h-fit p-4 rounded-lg w-full sm:max-w-[18rem] flex-col lg:flex-row lg:max-w-fit gap-x-4 xl:gap-x-8 flex shadow-lg space-y-4 lg:space-y-0">
      <div className="w-full flex flex-col items-center sm:items-start">
        <h5 className="text-xl font-medium pb-2.5">Availability</h5>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={new Date()}
          toDate={new Date(new Date().setDate(new Date().getDate() + 14))}
          className="p-0 w-fit"
          showOutsideDays
          fixedWeeks
        />
      </div>
      <div className="w-full flex flex-col items-center sm:items-start">
        <div className="space-y-4 max-w-[16rem]">
          <div className="space-y-3">
            <h5 className="text-xl font-medium pb-2.5 text-center sm:text-start">Schedule</h5>
            <CalendarCarousel />
          </div>
          <Button className="w-full">Book a session</Button>
        </div>
      </div>
    </div>
  );
};
