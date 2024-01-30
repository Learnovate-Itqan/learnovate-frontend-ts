import { Footer } from "@/layouts/Footer";

import CourseSection from "./CourseSection";
import HeroSection from "./HeroSection";
import MentorSection from "./MentorSection";
import TrackSection from "./TrackSection";

export const HomePage = () => (
  <div className=" overflow-hidden">
    <HeroSection />
    <TrackSection />
    <MentorSection />
    <CourseSection />
    <Footer />
  </div>
);
