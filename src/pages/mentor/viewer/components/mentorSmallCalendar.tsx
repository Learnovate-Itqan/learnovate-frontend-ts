import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { usePostData } from "@/hooks/useApi";
import { MentorAvailabilitySchema } from "@/schemas/mentorSchema";

import { CalendarCarousel } from "./calendarCarousel";

const MENTOR_ID = "dc7ab0d7-4d1a-4d14-8814-c159fe6027c8";
const STUDENT_ID = "344444443";
export const MentorSmallCalendar = ({ availability }: { availability: z.infer<typeof MentorAvailabilitySchema>[] }) => {
  const bookSession = usePostData(`/students/book-session/${MENTOR_ID}`);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<number[]>([]);
  const { mentorId } = useParams();
  const availabilityTimes: number[] = useMemo(() => {
    return availability
      ?.filter((time) => !time.isBooked)
      .map((time) => {
        return time.startTime;
      });
  }, [availability]);

  async function handleBookSession() {
    if (!date || selectedDate.length === 0) return;
    const toastId = toast.loading("Loading");
    const sessionData = {
      mentorID: mentorId || MENTOR_ID,
      studentID: STUDENT_ID,
      date: "2024-03-18",
      startTime: 15,
      endTime: 16,
    };
    const { data } = await bookSession.mutateAsync(sessionData);
    if (data.status === "Fail") toast.error(data.errors[0].msg);
    else if (data.status === "Success") toast.success("Session reserved successfully");

    toast.dismiss(toastId);
  }

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
            <CalendarCarousel
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              availability={availabilityTimes}
            />
          </div>
          <Button onClick={handleBookSession} className="w-full">
            Book a session
          </Button>
        </div>
      </div>
    </div>
  );
};
