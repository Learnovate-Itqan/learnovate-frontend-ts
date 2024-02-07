import MentorCard from "@/components/ui/MentorCard";
import { SearchBar } from "@/components/ui/SearchBar";

import mentor02 from "../../assets/home/mentors/metor02.webp";
import { FilterMentorsFrom } from "./FilterMentorsForm";

const Mentor = {
  id: 1,
  name: "John Doe",
  image: mentor02,
  jobTitle: "Front-End Developer",
  rate: 4.5,
};
export default function AllMentorsSection() {
  return (
    <div>
      <main className="container flex justify-center gap-10 py-20">
        <aside className=" flex flex-col gap-2 max-w-80 grow">
          <SearchBar className="bg-gray-200 text-gray-500 *:placeholder:text-gray-500/80 " />
          <div className="grow">
            <FilterMentorsFrom />
          </div>
        </aside>
        <aside className="w-fit flex justify-end flex-wrap text-white gap-2">
          {Array.from({ length: 20 }).map((_, index) => (
            <MentorCard
              key={index}
              className="w-[250px] h-[300px]"
              name={Mentor.name}
              rating={Mentor.rate}
              image={Mentor.image}
              title={Mentor.jobTitle}
              id={"Mentor.id"}
            />
          ))}
        </aside>
      </main>
    </div>
  );
}
