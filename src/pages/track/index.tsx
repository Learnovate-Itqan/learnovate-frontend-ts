import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import mentorImage from "@/assets/home/Mentor.png";
import courseImage from "@/assets/learnovate-thumbnail-course.png";
import CourseCard from "@/components/ui/CourseCard";
import MentorCard from "@/components/ui/MentorCard";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/useApi";
import { trackSchema } from "@/schemas/trackSchema";

import { PageSkelton } from "./PageSkelton";
import { TrackHeader } from "./TrackHeader";

const MENTOR_NUMBER = 5;
const TRACK = {
  name: "UI/UX",
  subtitle: "Elevate Your Skills in Crafting Intuitive and Engaging User Experiences.",
  description:
    " Unlock the secrets to creating captivating digital experiences with our UI/UX Design Mastery track. In this comprehensive program, you'll delve into the art and science of User Interface (UI) and UserExperience (UX) design, equipping yourself with the skills to shape the future of digital interactions.",
  rating: 4.5,
  noStudentsEnrolled: 500,
  progress: 0.65,
  estimatedTime: "3 weeks of study, 1-2 hours/week",
  relatedTopics: [
    "python",
    "pandas",
    "machine learning",
    "deep learning",
    "Data Science",
    "data engineer",
    "data engineer",
    "data engineer",
    "data engineer",
    "data engineer",
  ],
  relatedCourses: [],
  relatedMentors: [],
};

export function Track() {
  const navigate = useNavigate();
  const { id } = useParams();

  // fetch Track Data
  const { data: response } = useGetData(`/track/${id}`);
  const { data, status } = response || {};
  const { track }: { track: z.infer<typeof trackSchema> } = data || {};

  if (status === "failed" && !TRACK) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 ">
        <h1 className="text-3xl font-semibold ">Something went wrong</h1>
        <p className="text-xl text-dark-navy font-semibold"> please try again</p>
        <Button className="max-w-48 w-48 text-base mt-5" type="button" onClick={() => navigate("/")}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <>
      <TrackHeader track={(track as z.infer<typeof trackSchema>) || TRACK} />
      {!track && !TRACK ? (
        <PageSkelton />
      ) : (
        <main className="container ">
          <header className="flex flex-col gap-10 py-10">
            <div className="flex md:gap-4 gap-2 flex-wrap">
              {TRACK.relatedTopics.map((topic, index) => (
                <Tag
                  title={topic}
                  key={index}
                  className="bg-white capitalize border-royal-blue text-royal-blue border-[1px] font-[400]"
                >
                  {topic}
                </Tag>
              ))}
            </div>
            <section className="flex flex-col lg:flex-row gap-6 justify-between">
              <aside className="flex flex-col gap-2">
                <h4 className="font-semibold text-lg">Description:</h4>
                <p className="max-w-[900px] leading-5">{TRACK.description}</p>
              </aside>
              <aside className="flex flex-col mr-6 gap-2">
                <h4 className="font-semibold text-lg">Estimated time:</h4>
                <p className="max-w-[850px] leading-5">{TRACK.estimatedTime}</p>
                <Button className="max-w-60" type="button">
                  Show Roadmap
                </Button>
              </aside>
            </section>
          </header>
          <main className="mb-16 grid gap-10">
            <section className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold">Ordered Courses:</h3>
              <div className="grid grid-cols-auto-fit-19 gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CourseCard
                    key={index}
                    name="Python for Data Science"
                    description="Learn Python for Data Science and Machine Learning"
                    rate={4.5}
                    track="UI/UX"
                    duration={50}
                    level="intermediate"
                    image={courseImage}
                    price={20}
                    id={`${index}`}
                  />
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold">Related Mentors:</h3>
              <div
                className={`flex justify-start 2xl:${MENTOR_NUMBER > 4 ? "justify-between" : "justify-start"} flex-wrap gap-2 sm:gap-3 last:items-end last:grow`}
              >
                {Array.from({ length: MENTOR_NUMBER }).map((_, index) => (
                  <MentorCard
                    className="xxs:w-[150px] xxs:h-[200px] xs:w-[180px] xs:h-[220px] sm:w-[250px] sm:h-[300px]"
                    key={index}
                    name="Khalid Ahmed"
                    title="UI/UX Designer"
                    rating={4.5}
                    image={mentorImage}
                    id={`${index}`}
                  />
                ))}
              </div>
            </section>
          </main>
        </main>
      )}
    </>
  );
}
