import React from "react";
import { TbAdjustmentsFilled } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";

import { COURSES } from "@/assets/temp/Courses";
import CourseCard from "@/components/ui/CourseCard";
import { Paginate } from "@/components/ui/Paginate";
import { SearchBar } from "@/components/ui/SearchBar";

const Tracks = ["All", "Data Science", "Dev Ops", "Computer Science", "IOS", "Embedded Systems", "Android"];

export function AllCoursesSection() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPage = searchParams.get("page") || "1";
  const selectedTrack = searchParams.get("track") || "all";

  const handleTrackChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    searchParams.set("track", e.currentTarget.value);
    setSearchParams(searchParams, { replace: true });
  };

  const handlePageChange = (page: { selected: number }) => {
    searchParams.set("page", (page.selected + 1).toString());
    setSearchParams(searchParams, { replace: true });
  };
  return (
    <main className=" py-20">
      <header className="container flex justify-center items-start flex-col-reverse gap-4 lg:flex-row lg:justify-between">
        <div className="flex justify-start gap-3 flex-wrap">
          {Tracks.map((track, index) => (
            <button
              key={index}
              value={track.replace(" ", "-").toLowerCase()}
              className={` border-2 whitespace-nowrap border-royal-blue px-4 py-2 rounded-xl ${track.replace(" ", "-").toLowerCase() === selectedTrack ? "bg-royal-blue text-white" : "text-royal-blue"}`}
              onClick={handleTrackChange}
            >
              {track}
            </button>
          ))}
        </div>
        <div className="flex w-full lg:w-fit gap-2 max-h-12">
          <SearchBar className="bg-gray-200 text-gray-500 *:placeholder:text-gray-500/80 " />
          <button className="bg-royal-blue aspect-square flex justify-center items-center text-white px-2 py-1 rounded-lg">
            <TbAdjustmentsFilled size={28} className="rotate-90 aspect-square" />
          </button>
        </div>
      </header>
      <main className="px-1 xs:container grid grid-cols-auto-fit-22 xl:grid-cols-3 gap-5 py-10">
        {COURSES.map((course, index) => (
          <CourseCard
            key={index}
            id={`${index}`}
            name={course.name}
            track={course.track}
            duration={120}
            level={course.level}
            rate={course.rate}
            image={course.image}
            price={course.price}
            description={course.description}
          />
        ))}
      </main>
      <Paginate onPageChange={handlePageChange} initialPage={parseInt(selectedPage) - 1} pageCount={10} />
    </main>
  );
}
