import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import { Paginate } from "@/components/ui/Paginate";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/useApi";

import { CoursesTable } from "../components/CoursesTable";

export function DashboardCourses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debounceSearch = useDebouncedCallback((value) => {
    searchParams.set("search", value);
    setSearchParams(searchParams);
  }, 500);

  // fetch Courses
  const { data: response } = useGetData(`dashboard/courses?${searchParams.toString()}`);
  const { data } = response || {};
  const { courses } = data || {};
  return (
    <main>
      <section className=" shadow-custom rounded-xl py-6 mb-10">
        <header className="flex justify-between items-center px-6 mb-5">
          <h1 className=" text-2xl font-semibold ">Courses</h1>
          <div className="flex gap-2 justify-end items-center">
            <SearchBar
              value={search}
              onChange={(value) => {
                setSearch(value);
                debounceSearch(value);
              }}
              className="min-w-48 bg-gray-100"
            />
            <Button size={"sm"} className="flex gap-2 py-0">
              <FaPlus /> Add
            </Button>
          </div>
        </header>
        <CoursesTable courses={courses} />
      </section>
      <Paginate pageCount={3} />
    </main>
  );
}
