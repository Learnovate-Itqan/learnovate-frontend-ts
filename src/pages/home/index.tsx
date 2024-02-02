import { Footer } from "@/layouts/Footer";
import { Navbar } from "@/layouts/Navbar";

import CourseSection from "./CourseSection";
import HeroSection from "./HeroSection";
import MentorSection from "./MentorSection";
import TrackSection from "./TrackSection";

export const HomePage = () => (
  <div className=" overflow-hidden">
    <Navbar />
    <HeroSection />
    <TrackSection />
    <MentorSection />
    <CourseSection />
    <Footer />
  </div>
);
