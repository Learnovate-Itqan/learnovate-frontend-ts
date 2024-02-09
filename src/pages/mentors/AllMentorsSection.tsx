import { TbAdjustmentsFilled } from "react-icons/tb";

import MentorCard from "@/components/ui/MentorCard";
import Modal from "@/components/ui/Modal";
import { Paginate } from "@/components/ui/Paginate";
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
      <main className="container py-20">
        <section className="flex flex-col lg:flex-row justify-center gap-10 ">
          <aside className=" flex lg:flex-col  gap-2 lg:max-w-80 lg:min-w-80">
            <SearchBar
              className="bg-gray-200 text-gray-500 *:placeholder:text-gray-500/80 "
              onChange={() => null}
              value=""
            />
            <Modal>
              <Modal.Open opens="filter">
                <button className="bg-royal-blue aspect-square flex justify-center items-center text-white px-2 py-1 rounded-lg lg:hidden">
                  <TbAdjustmentsFilled size={28} className="rotate-90 aspect-square" />
                </button>
              </Modal.Open>

              <Modal.Window name="filter">
                <FilterMentorsFrom />
              </Modal.Window>
            </Modal>
            <div className="grow hidden lg:block">
              <FilterMentorsFrom />
            </div>
          </aside>
          <aside className="flex flex-wrap justify-center lg:justify-start gap-4 grow text-white ">
            {Array.from({ length: 20 }).map((_, index) => (
              <MentorCard
                key={index}
                className="w-[250px] h-[300px] place-self-center"
                name={Mentor.name}
                rating={Mentor.rate}
                image={Mentor.image}
                title={Mentor.jobTitle}
                id={"Mentor.id"}
              />
            ))}
          </aside>
        </section>
        <div className="mt-10">
          <Paginate pageCount={10} initialPage={1} onPageChange={() => null} />
        </div>
      </main>
    </div>
  );
}
