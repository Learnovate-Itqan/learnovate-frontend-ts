import { z } from "zod";

import { Spinner } from "@/components/ui/Spinner";
import { useGetData } from "@/hooks/useApi";
import { mentorSchema } from "@/schemas/mentorSchema";

import { MentorInfo } from "../components/mentorInfo";
import { SkillsBox } from "../components/skillsBox";
import { MentorSmallCalendar } from "./components/mentorSmallCalendar";
import { ViewerHeader } from "./components/mentorViewHeader";

const MENTOR_ID = "dc7ab0d7-4d1a-4d14-8814-c159fe6027c8";

export const MentorViewerPage = () => {
  const mentorData = useGetData(`students/view-mentor-ba/${MENTOR_ID}`);
  const { mentor }: { mentor: z.infer<typeof mentorSchema>; showJoinButton: boolean } =
    mentorData.data?.data?.data?.mentor ?? {}; // Add nullish coalescing operator
  return (
    <main className="min-h-dvh flex flex-col">
      {!mentor ? (
        <div className="flex justify-center items-center grow ">
          <Spinner className="w-32 h-32 stroke-gray-500" />
        </div>
      ) : (
        <>
          <ViewerHeader
            name={mentor?.user?.name || "name"}
            description={mentor?.about || "about "}
            jobTitle={mentor.title || "title "}
            image={mentor?.user?.image}
            price={mentor.pricePerHour || 128}
          />
          <main className="w-full py-10 *:text-dark-navy">
            <div className="container">
              <SkillsBox skills={mentor.skills} />
              <div className="my-8 flex flex-col sm:flex-row gap-y-8 gap-x-4 justify-between">
                <MentorInfo
                  {...mentor}
                  workExperience={`${mentor.experience} ${mentor.experience === 1 ? "year" : "years"}`}
                  location="Egypt"
                  timeZones="UTC+2"
                />
                <MentorSmallCalendar availability={mentor.availability} />
              </div>
            </div>
          </main>
        </>
      )}
    </main>
  );
};
