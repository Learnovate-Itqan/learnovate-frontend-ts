import CourseSection from "./CourseSection";
import HeroSection from "./HeroSection";
import MentorSection from "./MentorSection";
import TrackSection from "./TrackSection";

export const HomePage = () => (
  <div className=" w-full relative overflow-x-hidden">
    <HeroSection />
    <TrackSection />
    <MentorSection />
    <CourseSection />
  </div>
);
