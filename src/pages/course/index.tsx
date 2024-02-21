import { AiFillSignal } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { HiMiniRectangleStack, HiStar } from "react-icons/hi2";
import { IoMdPlayCircle } from "react-icons/io";
import { IoCalendarNumber } from "react-icons/io5";
import { MdWatchLater } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { Link } from "react-router-dom";
import { z } from "zod";

import mentorAvatar from "@/assets/home/Mentor.png";
import { Tag } from "@/components/ui/Tag";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Player } from "@/components/ui/player/player";
import { Progress } from "@/components/ui/progress";
import { courseSchema } from "@/schemas/courseSchema";

const course: z.infer<typeof courseSchema> = {
  id: "1",
  title: "Responsive Web Design",
  description:
    "Unlock the secrets to creating captivating digital experiences with our UI/UX Design Mastery track. In this comprehensive program, you'll delve into the art and science of User Interface (UI) and User Experience (UX) design, equipping yourself with the skills to shape the future of digital interactions.",
  image: "",
  keywords: ["React", "JavaScript", "Frontend", "Frontend", "Frontend", "Frontend", "Frontend"],
  publishTime: "2022-01-01",
  progress: 0.2,
  estimatedTime: 120,
  noChapters: 10,
  noStudentsEnrolled: 100,
  rating: 4.5,
  cLevel: "Beginner",
  cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
  trackID: "1",
  trackName: "Frontend",
  price: 0,
};

const courseChapters = [
  {
    id: "1",
    name: "lorem ipsum1",
    content: [
      {
        id: "10",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
      {
        id: "12",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
      {
        id: "15",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
    ],
  },
  {
    id: "1",
    name: "lorem ipsum2",
    content: [
      {
        id: "10",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
      {
        id: "12",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
      {
        id: "15",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
    ],
  },
  {
    id: "1",
    name: "lorem ipsum3",
    content: [
      {
        id: "10",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
      {
        id: "12",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
      {
        id: "15",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
    ],
  },
  {
    id: "1",
    name: "lorem ipsum4",
    content: [
      {
        id: "10",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
      {
        id: "12",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
      {
        id: "15",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
    ],
  },
  {
    id: "1",
    name: "lorem ipsum5",
    content: [
      {
        id: "10",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
      {
        id: "12",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
      {
        id: "15",
        name: "lorem ipsum",
        duration: "4:33",
        cLink: "https://www.youtube.com/watch?v=UEIHZBjzOuI",
      },
    ],
  },
];

const mentor = {
  id: "1",
  name: "John Doe",
  title: "Senior Frontend Developer",
  image: "",
  verified: true,
  rating: 4.5,
  noCourses: 10,
  noStudents: 100,
  noReviews: 1000,
  noChapters: 100,
  noStudentsEnrolled: 1000,
  noMentors: 10,
  noTracks: 10,
};

export function Course() {
  return (
    <div className="px-4 sm:container space-y-5 py-10">
      <header>
        <h1 className="text-3xl font-semibold text-dark-navy">{course.title}</h1>
        <p className="text-zinc-500">{mentor.name}</p>
      </header>
      <div className="">
        <main className=" grid grid-cols-[1fr_20rem] grid-rows-[1fr] gap-6">
          <section className=" col-span-2 xl:col-span-1">
            <Player src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8" className="rounded-xl" />
          </section>
          <section className=" flex h-fit flex-col gap-5 row-span-2 col-span-2 xl:col-span-1">
            <div className="shadow-custom grow rounded-xl overflow-hidden">
              <header className="px-5 py-8 rounded-xl shadow-custom">
                <div className="w-full flex flex-col gap-2">
                  <h2 className="ml-1 text-xl font-semibold">{Math.ceil((1 - course?.progress) * 100)}% to complete</h2>
                  <Progress className="h-2 rounded-full bg-zinc-300" value={course?.progress * 100} />
                </div>
              </header>
              <main className="py-5 mb-5 text-dark-navy">
                <Accordion type="single" collapsible defaultValue={courseChapters[0].name}>
                  {courseChapters.map((chapter, index) => (
                    <>
                      <AccordionItem value={chapter.name} key={index} className=" border-b-0 px-5">
                        <AccordionTrigger className=" text-left flex justify-between items-center gap-4 hover:no-underline">
                          <span className="flex gap-4">
                            <span className=" text-sm flex justify-center items-center border-2 rounded-full w-6 aspect-square border-dark-navy font-semibold">
                              {index + 1}
                            </span>
                            {chapter.name}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className=" text-balance text-base">
                          {chapter.content.map((content, index) => (
                            <div key={index} className="flex justify-between text-sm items-center gap-4 px-1">
                              <aside className="flex items-center gap-4">
                                <IoMdPlayCircle />
                                <span>{content.name}</span>
                              </aside>
                              <span className="text-zinc-400">{content.duration}</span>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                      <hr className=" border-zinc-300" />
                    </>
                  ))}
                </Accordion>
              </main>
            </div>
            <div className="px-5 grid gap-3 py-5 text-dark-navy shadow-custom rounded-xl">
              <h2 className="text-xl font-[500]">About Instructor</h2>
              <section className="flex gap-3">
                <UserAvatar className="w-16 h-16" imageUrl={mentorAvatar} name={"mentor"} />
                <div className="grow">
                  <Link to={`mentor/${mentor.id}`} className="text-2xl text-royal-blue font-[500]">
                    {mentor.name}
                  </Link>
                  <p className="text-zinc-400">{mentor.title}</p>
                </div>
              </section>
              <p className="text-balance">
                A passionate and creative front-end developer with a keen eye for design and user experience.
              </p>
            </div>
          </section>
          <section className="py-5 flex flex-col col-span-2 xl:col-span-1 gap-8">
            <header className="flex gap-2 sm:gap-4 flex-wrap ">
              <Tag className="select-none ">
                <HiStar className="text-yellow-500" size={18} />
                {course?.rating.toFixed(1)}
              </Tag>
              <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
                <TbTargetArrow className="text-royal-blue" /> {course?.trackName}
              </Tag>
              <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
                <IoCalendarNumber className="text-royal-blue" /> {new Date(course?.publishTime).toLocaleDateString()}
              </Tag>
              <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
                <MdWatchLater className="text-royal-blue" /> {course?.estimatedTime} hrs
              </Tag>
              <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
                <HiMiniRectangleStack className="text-royal-blue" /> {course?.noChapters} chapters
              </Tag>
              <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
                <AiFillSignal className="text-royal-blue" /> {course?.cLevel}
              </Tag>
              <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
                <FaUser className="text-royal-blue" /> {course?.noStudentsEnrolled}+ learners
              </Tag>
            </header>
            <main className="grid gap-2">
              <h3 className="text-xl font-medium">Description :</h3>
              <p className=" font-normal text-balance">{course?.description}</p>
            </main>
            <footer className="flex flex-wrap gap-2 sm:gap-4">
              {course?.keywords.map((topic, index) => (
                <Tag
                  title={topic}
                  key={index}
                  className="bg-white capitalize border-royal-blue text-royal-blue border-[1px] font-[400]"
                >
                  {topic}
                </Tag>
              ))}
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}
