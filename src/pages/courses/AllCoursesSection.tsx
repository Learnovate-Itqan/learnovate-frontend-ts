import React from "react";
import { TbAdjustmentsFilled } from "react-icons/tb";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import courseImage from "@/assets/learnovate-thumbnail-course.png";
import { Button } from "@/components/ui/Button";
import CourseCard from "@/components/ui/CourseCard";
import Modal from "@/components/ui/Modal";
import { Paginate } from "@/components/ui/Paginate";
import { SearchBar } from "@/components/ui/SearchBar";
import { Spinner } from "@/components/ui/Spinner";
import { useGetData } from "@/hooks/useApi";
import { courseSchema } from "@/schemas/courseSchema";

import { FilterCoursesForm } from "./FilterCoursesForm";

const Tracks = ["All", "Data Science", "Web Development", "Computer Science", "IOS", "Embedded Systems", "Android"];
const COURSES_PER_PAGE = 9;
export function AllCoursesSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: response } = useGetData(`courses${window.location.search}`);
  const { data } = response || {};
  const { courses, totalCourses, status } = data || {};
  const selectedTrack = searchParams.get("track") || "all";

  const handleTrackChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === "all") {
      searchParams.delete("track");
      setSearchParams(searchParams, { replace: true });
      return;
    }
    if (e.currentTarget.value.toLowerCase() === selectedTrack) {
      searchParams.delete("track");
      setSearchParams(searchParams, { replace: true });
      return;
    }
    searchParams.set("track", e.currentTarget.value);
    setSearchParams(searchParams, { replace: true });
  };

  const handleDeletingAllFilters = () => {
    navigate("/courses", { replace: true });
  };

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 ">
        <h1 className="text-3xl font-semibold ">Something went wrong</h1>
        <p className="text-xl text-dark-navy font-semibold"> please try again</p>
        <Button className="max-w-48 mt-5" text="Try Again" type="button" onClick={() => navigate("/")} />
      </div>
    );
  }

  return (
    <main className=" py-20">
      <header className="px-1 xs:container flex justify-center items-start flex-col-reverse gap-4 lg:flex-row lg:justify-between">
        <div className="flex justify-start gap-3 flex-wrap">
          {Tracks.map((track, index) => (
            <button
              key={index}
              value={track.toLowerCase()}
              className={` border-2 whitespace-nowrap transition-colors border-royal-blue px-4 py-2 rounded-xl ${track.toLowerCase() === selectedTrack.toLowerCase() ? "bg-royal-blue text-white" : "text-royal-blue"}`}
              onClick={handleTrackChange}
            >
              {track}
            </button>
          ))}
        </div>
        <div className="flex w-full grow lg:max-w-96  gap-2 max-h-12">
          <SearchBar
            className="bg-gray-200 text-gray-500 *:placeholder:text-gray-500/80 "
            onChange={() => null}
            value=""
          />

          <Modal>
            <Modal.Open opens="filter">
              <button className="bg-royal-blue aspect-square flex justify-center items-center text-white px-2 py-1 rounded-lg">
                <TbAdjustmentsFilled size={28} className="rotate-90 aspect-square" />
              </button>
            </Modal.Open>

            <Modal.Window name="filter">
              <FilterCoursesForm />
            </Modal.Window>
          </Modal>
        </div>
      </header>
      {!courses ? (
        <div className="py-20 flex justify-center items-center">
          <Spinner className="w-36 h-36 stroke-royal-blue" />
        </div>
      ) : courses.length === 0 ? (
        <div className="container py-20 w-full flex justify-center items-center">
          <section className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-center">No courses available</h1>
            <Button text="Clear Filters" type="button" onClick={handleDeletingAllFilters} />
          </section>
        </div>
      ) : (
        <main className="px-1 xs:container grid grid-cols-auto-fit-22 xl:grid-cols-3 gap-5 py-10">
          {courses?.map((course: z.infer<typeof courseSchema>) => (
            <CourseCard
              key={course.id}
              id={course.id}
              name={course.title}
              track={"Data Science"}
              duration={course.estimatedTime}
              level={course.cLevel}
              rate={course.rating}
              image={course.image || courseImage}
              price={course.price}
              description={course.description}
            />
          ))}
        </main>
      )}
      <Paginate pageCount={Math.ceil(totalCourses / COURSES_PER_PAGE)} />
    </main>
  );
}
