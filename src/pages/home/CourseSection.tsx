import ContentLoader from "react-content-loader";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/Button_";
import CourseCard from "@/components/ui/CourseCard";
import { courseSchema } from "@/schemas/courseSchema";

import mentor from "../../assets/home/Mentor.png";

export default function CourseSection({ courses }: { courses: z.infer<typeof courseSchema>[] }) {
  const navigate = useNavigate();

  if (!courses)
    return (
      <>
        <div className="flex justify-center items-center container  py-20">
          <ContentLoader
            title="Courses"
            width={"100%"}
            height={800}
            viewBox="-50 0 1400 1000"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="500" y="0" rx="2" ry="2" width="400" height="10" />
            <rect x="14" y="25" rx="2" ry="2" width="1250" height="11" />
            <rect x="10" y="57" rx="2" ry="2" width="400" height="450" />
            <rect x="450" y="57" rx="2" ry="2" width="400" height="450" />
            <rect x="900" y="57" rx="2" ry="2" width="400" height="450" />
            <rect x="10" y="550" rx="2" ry="2" width="400" height="450" />
            <rect x="450" y="550" rx="2" ry="2" width="400" height="450" />
            <rect x="900" y="550" rx="2" ry="2" width="400" height="450" />
          </ContentLoader>
        </div>
        <BeMentor />
      </>
    );
  return (
    <>
      <section className="container py-20">
        <header className="flex flex-col gap-4 sm:flex-row justify-between items-center">
          <h1 className="text-dark-navy text-2xl sm:text-3xl font-semibold">Start With our Courses</h1>
          <Button className="hidden max-w-36 sm:block" text="Discover All" type="button" />
        </header>
        <main className="grid grid-cols-auto-fit-19 xl:grid-cols-3 gap-5 my-10">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              className=" min-w-72"
              name={course.title}
              rate={course.rating}
              description={course.description}
              level={course.cLevel}
              id={course.id}
              track={course.trackName}
              duration={course.estimatedTime || 0}
              image={course.image}
              price={course.price}
            />
          ))}
        </main>
        <div className="sm:hidden">
          <Button text="Discover All" type="button" onClick={() => navigate("/courses")} />
        </div>
      </section>
      <BeMentor />
    </>
  );
}

function BeMentor() {
  return (
    <section className="container mb-20 flex flex-col md:flex-row gap-5 justify-evenly items-center">
      <aside className="md:max-w-96 max-w-72">
        <img src={mentor} alt="" className="" />
      </aside>
      <aside className=" max-w-96 flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-dark-navy">
          Be a <span className="text-royal-blue">Mentor</span>
        </h1>
        <p className="leading-6  text-neutral-gray ">
          Lorem ipsum dolor sit amet. Sit facere dignissimos et rerum ducimus non nihil consequatur est sapiente illo in
          ipsum repellendus et dolores velit. Vel Quis velit et fuga nostrum ut ipsum beatae ea tenetur soluta et illum
          ducimus!{" "}
        </p>
        <div className="inline">
          <Button text="Discover All" type="button" />
        </div>
      </aside>
    </section>
  );
}
