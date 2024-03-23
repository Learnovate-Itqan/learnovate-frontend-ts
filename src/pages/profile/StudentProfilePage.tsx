import studentImageDefault from "@/assets/mentors/Muhammad-Ibrahim.webp";
import { SocialCard } from "@/components/ui/SocialCard";

import { StudentHeader } from "./components/StudentHeader";
import { StudentInfo } from "./components/StudentInfo";

export function StudentProfilePage() {
  return (
    <main>
      <StudentHeader name="mohamed Ebrahim" studentImage={studentImageDefault} id="2135464646645" />
      <main className="container pb-20">
        <section className="flex flex-col gap-5">
          <StudentInfo
            education="Bachelor's degree in Computer Science from XYZ University."
            dateOfBirth={new Date("2001-02-27")}
            location="Egypt"
          />
          
          <SocialCard
            mail="Learnovate@gmail.com"
            github="Github.com/learnovate"
            linkedin="Linkedin.com/learnovate"
            facebook="Facebook.com/learnovate"
          />
        </section>
      </main>
    </main>
  );
}
