import { Button } from "@/components/ui/Button";
import MentorCard from "@/components/ui/MentorCard";

type Mentor = {
  name: string;
  image?: string | undefined;
  id: string;
  mentorID: string;
  noStudents: number;
  pricePerHour: number;
  rating: number;
  title: string;
  about: string;
  experience: string;
  skills: string[];
  resume: string;
  education: string;
  workExperience: string;
  linkedIn: string;
  gitHub: string;
  facebook: string;
  twitter: string;
  languages: string[];
  trackID: string;
};

export default function MentorSection({ mentors }: { mentors: Mentor[] }) {
  if (!mentors) {
    return null;
  }
  return (
    <section className=" flex flex-col gap-5 justify-evenly items-center bg-dark-navy py-8 min-h-dvh text-white">
      <aside className="flex flex-col justify-center gap-6 text-center items-center mx-12 md:mx-24 lg:mx-48">
        <h1 className="text-4xl font-semibold">Our top mentors</h1>
        <p className="text-neutral-gray leading-6">
          Lorem ipsum dolor sit amet. Sit facere dignissimos et rerum ducimus non nihil consequatur est sapiente illo in
          ipsum repellendus et dolores velit. Vel Quis velit et fuga nostrum ut ipsum beatae ea tenetur soluta et illum
          ducimus! Id sint galisum et corrupti obcaecati qui quisquam quam hic sint aliquam nam Quis porro qui velit
          soluta et eius natus.
        </p>
        <div className="min-w-11 hidden sm:block">
          <Button text="Discover More" type="button" />
        </div>
      </aside>
      <aside className="flex flex-col gap-10 justify-center  sm:mx-8 ">
        <main className="flex flex-wrap gap-10 justify-center">
          {mentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              className=""
              title={mentor.title}
              image={mentor.image}
              name={mentor.name}
              id={mentor.id}
              rating={mentor.rating}
            />
          ))}
        </main>
        <div className="min-w-11 mx-8 sm:hidden">
          <Button text="Discover More" type="button" />
        </div>
      </aside>
    </section>
  );
}
