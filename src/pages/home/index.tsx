import { Footer } from "@/layouts/Footer";
import { Navbar } from "@/layouts/Navbar";

import CourseSection from "./CourseSection";
import HeroSection from "./HeroSection";
import MentorSection from "./MentorSection";
import TrackSection from "./TrackSection";

export const HomePage = () => (
  <div className=" w-full relative overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <TrackSection />
    <MentorSection />
    <CourseSection />
    <Footer />
  </div>
);
