import { mentor } from "@/db/mentor";

import { MentorInfo } from "./components/mentorInfo";
import { MentorSmallCalendar } from "./components/mentorSmallCalendar";
import { ViewerHeader } from "./components/mentorViewHeader";
import { SkillsBox } from "./components/skillsBox";

export const MentorPage = () => {
  return (
    <>
      <ViewerHeader {...mentor} />
      <main className="w-full py-10 *:text-dark-navy">
        <div className="container">
          <SkillsBox skills={mentor.skills} />
          <div className="my-8 flex flex-col sm:flex-row gap-y-8 gap-x-4 justify-between">
            <MentorInfo {...mentor} />
            <MentorSmallCalendar />
          </div>
        </div>
      </main>
    </>
  );
};
