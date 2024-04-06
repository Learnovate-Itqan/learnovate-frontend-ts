import { z } from "zod";

import ThumbnailImage from "@/assets/learnovate-thumbnail-course.png";
import CourseCard from "@/components/ui/CourseCard";
import { SocialCard } from "@/components/ui/SocialCard";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/useApi";
import { studentSchema } from "@/schemas/studentSchema";

import { BookedSessions } from "../mentor/me/components/BookedSessions";
import { StudentHeader } from "./components/StudentHeader";
import { StudentInfo } from "./components/StudentInfo";
import { TracksProgress } from "./components/TracksProgress";

// const tracks = [
//   {
//     id: "1",
//     title: "Frontend",
//     progress: 50,
//   },
//   {
//     id: "2",
//     title: "Backend",
//     progress: 30,
//   },
//   {
//     id: "3",
//     title: "DevOps",
//     progress: 70,
//   },
//   {
//     id: "4",
//     title: "UI/UX",
//     progress: 90,
//   },
// ];
// const SESSIONS = [
//   {
//     id: 1,
//     date: new Date("2024-03-22"),
//     startTime: 10,
//     endTime: 11,
//     student: {
//       name: "Matthew Lane",
//     },
//     mentor: {
//       name: "Matthew Lane",
//     },
//   },
//   {
//     id: 2,
//     date: new Date("2024-03-23"),
//     startTime: 12,
//     endTime: 13,
//     student: {
//       name: "Mildred Waters",
//     },
//     mentor: {
//       name: "Mildred Waters",
//     },
//   },
//   {
//     id: 3,
//     date: new Date("2024-03-22"),
//     startTime: 14,
//     endTime: 15,
//     student: {
//       name: "David Ingram",
//     },
//     mentor: {
//       name: "David Ingram",
//     },
//   },
//   {
//     id: 4,
//     date: new Date("2024-03-22"),
//     startTime: 16,
//     endTime: 17,
//     student: {
//       name: "Duane Cruz",
//     },
//     mentor: {
//       name: "Duane Cruz",
//     },
//   },
//   {
//     id: 5,
//     date: new Date("2024-03-23"),
//     startTime: 18,
//     endTime: 19,
//     student: {
//       name: "Gene Cummings",
//     },
//     mentor: {
//       name: "Gene Cummings",
//     },
//   },
//   {
//     id: 6,
//     date: new Date("2024-03-24"),
//     startTime: 20,
//     endTime: 21,
//     student: {
//       name: "Edgar Rogers",
//     },
//     mentor: {
//       name: "Edgar Rogers",
//     },
//   },
// ];
const wishlist = [
  {
    id: "1",
    title: "React",
    rating: 4.5,
    description: "Learn how to build modern web applications using React",
    cLevel: "Beginner",
    trackName: "Frontend",
    estimatedTime: 10,
    image: ThumbnailImage,
    price: 10,
  },
  {
    id: "2",
    title: "Node.js",
    rating: 4.5,
    description: "Learn how to build scalable backend applications using Node.js",
    cLevel: "Intermediate",
    trackName: "Backend",
    estimatedTime: 20,
    image: ThumbnailImage,
    price: 20,
  },
  {
    id: "3",
    title: "Docker",
    rating: 4.5,
    description: "Learn how to build scalable backend applications using Node.js",
    cLevel: "Intermediate",
    trackName: "DevOps",
    estimatedTime: 20,
    image: ThumbnailImage,
    price: 20,
  },
  {
    id: "4",
    title: "Figma",
    rating: 4.5,
    description: "Learn how to build scalable backend applications using Node.js",
    cLevel: "Intermediate",
    trackName: "UI/UX",
    estimatedTime: 20,
    image: ThumbnailImage,
    price: 20,
  },
];

export function StudentProfilePage() {
  const { data: response } = useGetData("students/profile");
  const { status, data } = response?.data || {};
  const { student }: { student: z.infer<typeof studentSchema> } = data || {};
  if (!status) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <Spinner className=" w-32 h-32 stroke-zinc-500" />
      </div>
    );
  }
  if (!(status === "Success")) {
    return (
      <div className="w-full flex flex-col gap-3 justify-center items-center h-screen">
        <h1 className="text-4xl font-semibold text-zinc-700 ">Something went wrong</h1>
        <p className="text-2xl font-semibold  text-zinc-600">Please try again later...</p>
      </div>
    );
  }
  return (
    <main>
      <StudentHeader name={student.user.name} studentImage={student.user.image} id={student.id} />
      <main className="container pb-20">
        <section className="flex basis-1/2 flex-col gap-5 py-10 lg:flex-row">
          <StudentInfo
            bio={student.user.bio}
            dateOfBirth={student.user.dateOfBirth}
            country={student.user.country}
            city={student.user.city}
          />
          <div className=" grid gap-5 sm:grid-cols-2 lg:flex basis-1/2  lg:max-w-xl">
            <TracksProgress tracks={student.tracks} />
            <SocialCard
              className="min-w-fit "
              mail={student.user.email}
              github={student.gitHub}
              linkedin={student.linkedIn}
              facebook={student.facebook}
              href={{
                mail: student.user.email,
                github: student.gitHub,
                linkedin: student.linkedIn,
                facebook: student.facebook,
              }}
            />
          </div>
        </section>
        <section className="py-10">
          <BookedSessions sessions={student.sessions || []} userRole="student" className="h-48" />
        </section>
        <section className="py-10">
          <div className="flex justify-between items-baseline">
            <h1 className="text-3xl 3xl:text-4xl font-semibold">My Wishlist:</h1>
            {wishlist.length > 3 && (
              <Button className="text-lg md:text-xl 3xl:text-2xl" variant="link">
                see more
              </Button>
            )}
          </div>
          <main className="grid grid-cols-auto-fit-19 xl:grid-cols-3 gap-5 mt-10 md:max-lg:last:*:col-span-2">
            {wishlist.slice(0, 3).map((course) => (
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
        </section>
        <section className="py-10">
          <div className="flex justify-between items-baseline">
            <h1 className="text-3xl 3xl:text-4xl font-semibold">My Courses:</h1>
            {wishlist.length > 3 && (
              <Button className="text-lg md:text-xl 3xl:text-2xl" variant="link">
                see more
              </Button>
            )}
          </div>
          <main className="grid grid-cols-auto-fit-19 xl:grid-cols-3 gap-5 mt-10 md:max-lg:last:*:col-span-2">
            {wishlist.slice(0, 3).map((course) => (
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
        </section>
      </main>
    </main>
  );
}
