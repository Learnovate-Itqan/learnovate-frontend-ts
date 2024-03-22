import { eachDayOfInterval, format, isSameDay } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { mentor } from "@/db/mentor";

import { MentorInfo } from "../components/mentorInfo";
import { SkillsBox } from "../components/skillsBox";
import { AddedAvailableTime } from "./components/AddedAvailableTime";
import { AvailableTimeForm } from "./components/AvailableTimeForm";
import { MeStats } from "./components/meStats";
import { MeHeader } from "./components/mentorMeHeader";

type AvailableTimeType = {
  day: string;
  date: Date;
  times: {
    startTime: number;
    endTime: number;
    isBooked: boolean;
  };
};

export const MentorMePage = () => {
  const skills = mentor.skills.map((skill) => skill.name);
  const [days, setDays] = useState(() =>
    eachDayOfInterval({
      start: new Date(),
      end: new Date(new Date().setDate(new Date().getDate() + 7)),
    }).map((day) => {
      return { day: format(day, "EEEE"), date: format(day, "yyyy-MM-dd"), isOpen: false };
    })
  );

  const [availableTimes, setAvailableTimes] = useState<AvailableTimeType[]>([]);

  function handleAddTime({
    startTime,
    endTime,
    day,
    date,
  }: {
    startTime: number;
    endTime: number;
    day: string;
    date: Date;
  }) {
    if (days.find((d) => isSameDay(d.date, date) && d.isOpen)) return toast.error("This day is locked by you!");
    setAvailableTimes((prev) => [
      ...prev,
      {
        day: day,
        date: date,
        times: {
          startTime: startTime,
          endTime: endTime,
          isBooked: false,
        },
      },
    ]);
  }
  function handleDeleteTime({
    day,
    date,
    startTime,
    endTime,
  }: {
    startTime: number;
    endTime: number;
    day: string;
    date: Date;
  }) {
    setAvailableTimes((prev) => {
      return prev.filter((time) => {
        return (
          time.day === day &&
          isSameDay(date, time.date) &&
          time.times.startTime !== startTime &&
          time.times.endTime !== endTime
        );
      });
    });
  }
  return (
    <>
      <MeHeader {...mentor} />
      <main className="w-full py-10 *:text-dark-navy">
        <div className="container">
          <SkillsBox skills={skills} />
          <div className="my-8 flex flex-col sm:flex-row gap-y-8 gap-x-4 justify-between">
            <MentorInfo
              experience={mentor.workExperience}
              workExperience={mentor.workExperience}
              education={mentor.education}
              rating={mentor.rating}
              resume={mentor.resume}
              languages={mentor.languages}
              location={mentor.location}
              timeZones={mentor.timeZones}
            />
            <MeStats />
          </div>
          <div className="my-8 flex flex-col sm:flex-row gap-y-8 gap-x-4 justify-between">
            <div className=" shadow-custom rounded-lg basis-full">
              <ScrollArea className=" h-96 py-4 px-7 ">
                <Accordion type="single" collapsible className="px-1">
                  {days.map((day) => (
                    <AccordionItem value={day.date} className="hover:no-underline">
                      <AccordionTrigger
                        className={` text-xl text-left gap-4 font-semibold hover:no-underline focus:ring-royal-blue ${!day.isOpen ? "text-zinc-400" : "text-dark-navy"}`}
                      >
                        <div className="flex gap-4 justify-start items-center">
                          <Switch
                            checked={day.isOpen}
                            className=" focus-visible:ring-1 z-40 focus-visible:ring-royal-blue"
                            onCheckedChange={(checked) => {
                              setDays((prev) =>
                                prev.map((d) => (isSameDay(day.date, d.date) ? { ...d, isOpen: checked } : d))
                              );
                            }}
                          />
                          <span>{day.day}</span>
                          <span className=" text-sm text-zinc-400 font-normal place-self-end">{day.date}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-gray text-balance text-base px-1">
                        <AvailableTimeForm
                          onAddTime={(startTime, endTime) =>
                            handleAddTime({ startTime, endTime, day: day.day, date: new Date(day.date) })
                          }
                        />
                        {availableTimes.map(
                          (time) =>
                            isSameDay(day.date, time.date) && (
                              <AddedAvailableTime
                                times={time.times}
                                onDeleteTime={(startTime, endTime) =>
                                  handleDeleteTime({ startTime, endTime, date: time.date, day: day.day })
                                }
                              />
                            )
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </div>
            <ScrollArea className=" shadow-custom h-96 rounded-lg basis-full">asdasd</ScrollArea>
          </div>
        </div>
      </main>
    </>
  );
};
