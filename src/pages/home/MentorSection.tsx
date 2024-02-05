import { useNavigate } from "react-router-dom";
import { z } from "zod";

import mentorImage from "@/assets/home/mentors/metor01.webp";
import { Button } from "@/components/ui/Button";
import MentorCard from "@/components/ui/MentorCard";
import { mentorSchema } from "@/schemas/mentorSchema";

export default function MentorSection({ mentors }: { mentors: z.infer<typeof mentorSchema>[] }) {
  const navigate = useNavigate();

  if (!mentors) return null;

  return (
    <section className="flex flex-col gap-16 py-20 justify-evenly items-center bg-dark-navy text-white">
      <aside className="container flex flex-col justify-center gap-6 text-center items-center max-w-screen-xl ">
        <h1 className="text-4xl font-semibold">Our top mentors</h1>
        <p className=" text-gray-300 text-balance leading-6">
          Lorem ipsum dolor sit amet. Sit facere dignissimos et rerum ducimus non nihil consequatur est sapiente illo in
          ipsum repellendus et dolores velit. Vel Quis velit et fuga nostrum ut ipsum beatae ea tenetur soluta et illum
          ducimus! Id sint galisum et corrupti obcaecati qui quisquam quam hic sint aliquam nam Quis porro qui velit
          soluta et eius natus.
        </p>
        <div className="min-w-11 w-48 hidden sm:block">
          <Button text="Discover More" type="button" onClick={() => navigate("/mentors")} />
        </div>
      </aside>
      <aside className="container flex flex-col gap-10 justify-center ">
        <main className=" container grid grid-cols-auto-fit xl:grid-cols-5 gap-10 justify-center">
          {mentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              className=""
              title={mentor.title}
              image={mentor.user.image || mentorImage}
              name={mentor.user.name}
              id={mentor.id}
              rating={mentor.rating}
            />
          ))}
        </main>
        <div className="container min-w-11 sm:hidden">
          <Button text="Discover More" type="button" onClick={() => navigate("/mentors")} />
        </div>
      </aside>
    </section>
  );
}
