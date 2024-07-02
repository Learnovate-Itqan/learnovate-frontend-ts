import { z } from "zod";

import { courseSchema } from "@/schemas/courseSchema";

import { AboutInstructor } from "./AboutInstructor";
import { CourseContents } from "./CourseContents";
import { CourseDescription } from "./CourseDescription";
import { CoursePlayer } from "./CoursePlayer";

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
  chapters: [
    {
      title: "lorem ipsum",
      link: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    },
    {
      title: "lorem ipsum",
      link: "https://www.youtube.com/lH7vAzmmB-M?si=EM0V30z2e5ymxRj1",
    },
    {
      title: "lorem ipsum",
      link: "https://www.youtube.com/MIIvpZLaVMo?si=gVsiW5gle_Yicf6C",
    },
    {
      title: "lorem ipsum",
      link: "https://www.youtube.com/fyP-T6DEHgA?si=pg4FWu_FbqeXNCAt",
    },
    {
      title: "lorem ipsum",
      link: "https://www.youtube.com/OL-tStCYoFM?si=3ZikLxiD6yvZtyBw",
    },
  ],
  mentor: {
    id: "1",
    user: {
      id: "1",
      name: "John Doe",
      image: "",
      email: "",
      authStatus: true,
    },
    title: "Senior Frontend Developer",
    rating: 4.5,
    noStudents: 100,
    trackID: "",
    mentorID: "",
    pricePerHour: 0,
    about: "",
    experience: 0,
    skills: [],
    resume: "",
    education: "",
    workExperience: "",
    linkedIn: "",
    gitHub: "",
    facebook: "",
    twitter: "",
    languages: [],
    location: "",
    timeZones: "",
    track: {
      id: "",
      title: "",
      name: "",
    },
    availability: [],
    sessions: [],
    visits: [],
    Visit: {},
  },
};

const courseChapters = [
  {
    id: "31",
    name: "lorem ipsum",
    duration: "4:33",
    cLink: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  },
  {
    id: "11",
    name: "lorem ipsum",
    duration: "4:33",
    cLink: "https://www.youtube.com/lH7vAzmmB-M?si=EM0V30z2e5ymxRj1",
  },
  {
    id: "17",
    name: "lorem ipsum",
    duration: "4:33",
    cLink: "https://www.youtube.com/MIIvpZLaVMo?si=gVsiW5gle_Yicf6C",
  },
  {
    id: "73",
    name: "lorem ipsum",
    duration: "4:33",
    cLink: "https://www.youtube.com/fyP-T6DEHgA?si=pg4FWu_FbqeXNCAt",
  },
  {
    id: "1",
    name: "lorem ipsum",
    duration: "4:33",
    cLink: "https://www.youtube.com/OL-tStCYoFM?si=3ZikLxiD6yvZtyBw",
  },
];
const mentor = {
  id: "1",
  name: "John Doe",
  title: "Senior Frontend Developer",
  image: "",
  verified: true,
  rating: 4.5,
  noCourses: 4910,
  noStudents: 100,
  noReviews: 1000,
  noChapters: 100,
  noStudentsEnrolled: 1000,
  noMentors: 10,
  noTracks: 10,
};

export function CourseVideo() {
  return (
    <div className="sm:container sm:space-y-5 pb-10 sm:py-10">
      <header className="hidden sm:block">
        <h1 className="text-3xl font-semibold text-dark-navy">{course.title}</h1>
        <p className="text-zinc-500">{mentor.name}</p>
      </header>

      <main className="grid grid-cols-[1fr_20rem] grid-rows-[auto_1fr] gap-6">
        <section className=" col-span-2 xl:col-span-1">
          <CoursePlayer courseChapters={courseChapters} />
        </section>
        <section className="px-4 sm:px-0 flex h-fit flex-col gap-5 row-span-2 col-span-2 xl:col-span-1">
          <header className="sm:hidden">
            <h1 className="text-xl sm:text-3xl font-semibold text-dark-navy">{course.title}</h1>
            <p className="text-zinc-500">{mentor.name}</p>
          </header>
          <CourseContents courseChapters={courseChapters} progress={course?.progress || 0} />
          <AboutInstructor mentor={mentor} />
        </section>
        <section className="px-4 sm:px-0 col-span-2 xl:col-span-1 ">
          <CourseDescription course={course} />
        </section>
      </main>
    </div>
  );
}
