import { mentor } from "@/db/mentor";

import { MeStats } from "../components/meStats";
import { MentorInfo } from "../components/mentorInfo";
import { MeHeader } from "../components/mentorMeHeader";
import { SessionCalendar } from "../components/sessionCalendar";
import { SkillsBox } from "../components/skillsBox";

export const MentorMePage = () => {
  return (
    <>
      <MeHeader {...mentor} />
      <main className="w-full py-10 *:text-dark-navy">
        <div className="container">
          <SkillsBox skills={mentor.skills} />
          <div className="my-8 flex flex-col sm:flex-row gap-y-8 gap-x-4 justify-between">
            <MentorInfo {...mentor} />
            <MeStats />
          </div>
          <SessionCalendar />
        </div>
      </main>
    </>
  );
};
