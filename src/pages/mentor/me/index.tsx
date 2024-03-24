import { mentor } from "@/db/mentor";

import { MentorInfo } from "../components/mentorInfo";
import { SkillsBox } from "../components/skillsBox";
import { AvailabilityEditor } from "./components/AvailabilityEditor";
import { BookedSessions } from "./components/BookedSessions";
import { MeStats } from "./components/meStats";
import { MeHeader } from "./components/mentorMeHeader";

const SESSIONS = [
  {
    id: 1,
    date: new Date("2024-03-22"),
    startTime: 10,
    endTime: 11,
    student: {
      name: "Matthew Lane",
    },
    mentor: {
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
    mentor: {
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
    mentor: {
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
    mentor: {
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
    mentor: {
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
    mentor: {
      name: "Edgar Rogers",
    },
  },
];
export const MentorMePage = () => {
  const skills = mentor.skills.map((skill) => skill.name);

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
          <div className="my-8 flex flex-col md:flex-row gap-y-8 gap-x-4 justify-between">
            <AvailabilityEditor />
            <BookedSessions sessions={SESSIONS} userRole="mentor" />
          </div>
        </div>
      </main>
    </>
  );
};
