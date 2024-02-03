import { useGetData } from "@/hooks/useApi";

import CourseSection from "./CourseSection";
import HeroSection from "./HeroSection";
import MentorSection from "./MentorSection";
import TrackSection from "./TrackSection";

export const HomePage = () => {
  const { data } = useGetData("/home");
  const { courses, mentors, tracks } = data?.data || {};
  console.log(courses);
  console.log(data);
  return (
    <div className=" w-full relative overflow-x-hidden">
      <HeroSection />
      <TrackSection tracks={tracks} />
      <MentorSection mentors={mentors} />
      <CourseSection courses={courses} />
    </div>
  );
};
