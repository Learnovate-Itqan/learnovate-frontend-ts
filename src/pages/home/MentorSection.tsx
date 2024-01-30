import { MENTORS } from "@/assets/temp/Mentors";
import { Button } from "@/components/ui/Button";
import MentorCard from "@/components/ui/MentorCard";

export default function MentorSection() {
  return (
    <section className=" flex flex-col justify-evenly items-center bg-dark-navy h-dvh text-white">
      <aside className="flex flex-col justify-center gap-6 text-center items-center mx-48">
        <h1 className="text-4xl font-semibold">Our top mentors</h1>
        <p className="text-neutral-gray leading-6">
          Lorem ipsum dolor sit amet. Sit facere dignissimos et rerum ducimus non nihil consequatur est sapiente illo in
          ipsum repellendus et dolores velit. Vel Quis velit et fuga nostrum ut ipsum beatae ea tenetur soluta et illum
          ducimus! Id sint galisum et corrupti obcaecati qui quisquam quam hic sint aliquam nam Quis porro qui velit
          soluta et eius natus.
        </p>
        <div className="lg:w-2/12">
          <Button text="Discover More" type="button" />
        </div>
      </aside>
      <aside className="flex gap-10 mx-36">
        {MENTORS.map((mentor) => (
          <MentorCard key={mentor.name} className="" {...mentor} />
        ))}
      </aside>
    </section>
  );
}
