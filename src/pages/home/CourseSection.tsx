import { z } from "zod";

import { Button } from "@/components/ui/Button";
import CourseCard from "@/components/ui/CourseCard";
import { courseSchema } from "@/schemas/courseSchema";

import mentor from "../../assets/home/Mentor.png";

export default function CourseSection({ courses }: { courses: z.infer<typeof courseSchema>[] }) {
  if (!courses) return null;
  return (
    <>
      <section className="mx-5 sm:mx-10 md:mx-20 mt-16">
        <header className="flex flex-col gap-4 sm:flex-row justify-between items-center">
          <h1 className="text-dark-navy text-3xl font-semibold">Start With our Courses</h1>
          <div className="hidden sm:block">
            <Button text="Discover All" type="button" />
          </div>
        </header>
        <main className="flex flex-wrap gap-5 my-10">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              className="w-96"
              name={course.title}
              rate={course.rating}
              description={course.description}
              level={course.cLevel}
              id={course.id}
              track={course.trackID}
              duration={course.estimatedTime}
              image={course.image}
              price={23}
            />
          ))}
        </main>
        <div className="sm:hidden">
          <Button text="Discover All" type="button" />
        </div>
      </section>
      <section className="flex flex-col md:flex-row gap-5 justify-evenly md:my-44 my-24 mx-5 items-center">
        <aside className="md:max-w-96 max-w-72">
          <img src={mentor} alt="" className="" />
        </aside>
        <aside className=" max-w-96 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-dark-navy">
            Be a <span className="text-royal-blue">Mentor</span>
          </h1>
          <p className="leading-6 text-neutral-gray ">
            Lorem ipsum dolor sit amet. Sit facere dignissimos et rerum ducimus non nihil consequatur est sapiente illo
            in ipsum repellendus et dolores velit. Vel Quis velit et fuga nostrum ut ipsum beatae ea tenetur soluta et
            illum ducimus!{" "}
          </p>
          <div className="inline">
            <Button text="Discover All" type="button" />
          </div>
        </aside>
      </section>
    </>
  );
}
