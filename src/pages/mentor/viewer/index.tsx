import { z } from "zod";

// import { mentor } from "@/db/mentor";
import { useGetData } from "@/hooks/useApi";
import { mentorSchema } from "@/schemas/mentorSchema";

import { MentorInfo } from "../components/mentorInfo";
import { SkillsBox } from "../components/skillsBox";
import { MentorSmallCalendar } from "./components/mentorSmallCalendar";
import { ViewerHeader } from "./components/mentorViewHeader";

const MENTOR_ID = "dc7ab0d7-4d1a-4d14-8814-c159fe6027c8";

export const MentorViewerPage = () => {
  const mentorData = useGetData(`students/view-mentor/${MENTOR_ID}`);
  const { mentor }: { mentor: z.infer<typeof mentorSchema> } = mentorData.data?.data ?? {}; // Add nullish coalescing operator
  if (!mentor) return;
  return (
    <>
      <ViewerHeader
        name={mentor?.user?.name || "name name"}
        description={mentor?.about || "about about "}
        jobTitle={mentor.title || "title "}
        image={mentor?.user?.image}
        price={mentor.pricePerHour || 128}
      />
      <main className="w-full py-10 *:text-dark-navy">
        <div className="container">
          <SkillsBox skills={mentor.skills} />
          <div className="my-8 flex flex-col sm:flex-row gap-y-8 gap-x-4 justify-between">
            <MentorInfo {...mentor} />
            <MentorSmallCalendar availability={mentor.availability} />
          </div>
        </div>
      </main>
    </>
  );
};
