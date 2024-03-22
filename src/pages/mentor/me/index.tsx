import { mentor } from "@/db/mentor";

import { MentorInfo } from "../components/mentorInfo";
import { SkillsBox } from "../components/skillsBox";
import { AvailabilityEditor } from "./components/AvailabilityEditor";
import { MeStats } from "./components/meStats";
import { MeHeader } from "./components/mentorMeHeader";
import { BookedSessions } from "./components/BookedSessions";

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
            <BookedSessions />
          </div>
        </div>
      </main>
    </>
  );
};
