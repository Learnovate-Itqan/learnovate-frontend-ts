import { GrNext, GrPrevious } from "react-icons/gr";
import { TbAdjustmentsFilled } from "react-icons/tb";
import ReactPaginate from "react-paginate";

import { COURSES } from "@/assets/temp/Courses";
import CourseCard from "@/components/ui/CourseCard";
import { SearchBar } from "@/components/ui/SearchBar";

import headerImage from "../../assets/books-coursesPage.jpg";

export function CoursesPage() {
  return (
    <>
      <header className="relative flex justify-start items-center min-h-96 bg-gradient-to-br from-dark-navy via-dark-navy/90 text-white py-20">
        <div
          style={{ backgroundImage: `url(${headerImage})` }}
          className=" absolute inset-0 -z-10 bg-no-repeat bg-right bg-dark-navy bg-cover"
        />
        <main className="container flex flex-col justify-center items-start z-20">
          <h1 className="text-5xl font-bold">Courses</h1>
          <p className="text-lg mt-4">Learn about the technological courses provided to you by Learnovate</p>
        </main>
      </header>
      <main className=" py-20">
        <header className="container flex justify-center items-center flex-col-reverse gap-4 lg:flex-row lg:justify-between">
          <div className="flex justify-start gap-3 flex-wrap">
            <button className="text-royal-blue border-2 whitespace-nowrap border-royal-blue px-4 py-2 rounded-xl">
              all
            </button>
            <button className="text-royal-blue border-2 whitespace-nowrap border-royal-blue px-4 py-2 rounded-xl">
              Data Science
            </button>
            <button className="text-royal-blue border-2 whitespace-nowrap border-royal-blue px-4 py-2 rounded-xl">
              Dev Ops
            </button>
            <button className="text-royal-blue border-2 whitespace-nowrap border-royal-blue px-4 py-2 rounded-xl">
              Computer Science
            </button>
            <button className="text-royal-blue border-2 border-royal-blue px-4 py-2 rounded-xl">IOS</button>
            <button className="text-royal-blue border-2 border-royal-blue px-4 py-2 rounded-xl">
              Embedded Systems
            </button>
          </div>
          <div className="flex gap-2 max-h-12">
            <SearchBar className="bg-gray-200 text-gray-500 *:placeholder:text-gray-500/80 " />
            <button className="bg-royal-blue aspect-square flex justify-center items-center text-white px-2 py-1 rounded-lg">
              <TbAdjustmentsFilled size={28} className="rotate-90 aspect-square" />
            </button>
          </div>
        </header>
        <main className="px-1 xs:container grid grid-cols-auto-fit-18 xl:grid-cols-3 gap-5 py-10">
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
          {COURSES.slice(0, 3).map((course, index) => (
            <CourseCard
              key={index}
              id={`${index + 10}`}
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
        <ReactPaginate
          onPageChange={() => null}
          pageCount={10}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          nextLabel={<GrNext className=" text-lg" />}
          previousLabel={<GrPrevious className=" text-lg" />}
          containerClassName="flex gap-2 justify-center items-center font-semibold *:border-2  *:rounded-lg *:w-10 *:h-10 *:flex *:justify-center *:items-center"
          pageClassName="text-neutral-gray border-neutral-gray"
          pageLinkClassName="w-full h-full flex justify-center items-center "
          previousClassName=" border-dark-navy text-dark-navy "
          previousLinkClassName="w-full h-full flex justify-center items-center"
          nextClassName=" border-dark-navy text-dark-navy "
          nextLinkClassName=" w-full h-full flex justify-center items-center"
          breakLabel="..."
          breakClassName=" text-neutral-gray border-neutral-gray"
          breakLinkClassName="border-neutral-gray"
          activeClassName="bg-dark-navy border-dark-navy border-0 text-white"
          activeLinkClassName=" border-dark-navy border-0"
          renderOnZeroPageCount={null}
        />
      </main>
    </>
  );
}
