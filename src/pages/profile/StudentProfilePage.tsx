import studentImageDefault from "@/assets/mentors/Muhammad-Ibrahim.webp";
import { SocialCard } from "@/components/ui/SocialCard";

import { StudentHeader } from "./components/StudentHeader";
import { StudentInfo } from "./components/StudentInfo";
import { TracksProgress } from "./components/TracksProgress";

const tracks = [
  {
    id: "1",
    title: "Frontend",
    progress: 50,
  },
  {
    id: "2",
    title: "Backend",
    progress: 30,
  },
  {
    id: "3",
    title: "DevOps",
    progress: 70,
  },
  {
    id: "4",
    title: "UI/UX",
    progress: 90,
  },
];

export function StudentProfilePage() {
  return (
    <main>
      <StudentHeader name="mohamed Ebrahim" studentImage={studentImageDefault} id="2135464646645" />
      <main className="container pb-20">
        <section className="flex grow flex-col gap-5 lg:flex-row">
          <StudentInfo
            education="Bachelor's degree in Computer Science from XYZ University."
            dateOfBirth={new Date("2001-02-27")}
            location="Egypt"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:max-w-xl">
            <TracksProgress tracks={tracks} />
            <SocialCard
              mail="Learnovate@gmail.com"
              github="Github.com/learnovate"
              linkedin="Linkedin.com/learnovate"
              facebook="Facebook.com/learnovate"
            />
          </div>
        </section>
      </main>
    </main>
  );
}
