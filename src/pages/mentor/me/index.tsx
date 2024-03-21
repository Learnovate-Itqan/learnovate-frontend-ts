import { mentor } from "@/db/mentor";

import { MentorInfo } from "../components/mentorInfo";
import { SkillsBox } from "../components/skillsBox";
import { MeStats } from "./components/meStats";
import { MeHeader } from "./components/mentorMeHeader";

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
        </div>
      </main>
    </>
  );
};
