import { mentor } from "@/db/mentor";

import { MentorSmallCalendar } from "./components/mentorSmallCalendar";
import { ViewerHeader } from "./components/mentorViewHeader";
import { SkillsBox } from "./components/skillsBox";

export const MentorPage = () => {
  return (
    <>
      <ViewerHeader {...mentor} />
      <main className="w-full py-10">
        <div className="container">
          <SkillsBox skills={mentor.skills} />
          <div className="my-8">
            <MentorSmallCalendar />
          </div>
        </div>
      </main>
    </>
  );
};
