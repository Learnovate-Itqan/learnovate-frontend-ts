import { z } from "zod";

import ThumbnailImage from "@/assets/learnovate-thumbnail-course.png";
import CourseCard from "@/components/ui/CourseCard";
import { SocialCard } from "@/components/ui/SocialCard";
import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/useApi";
import { studentSchema } from "@/schemas/studentSchema";

import { BookedSessions } from "../mentor/me/components/BookedSessions";
import { StudentHeader } from "./components/StudentHeader";
import { StudentInfo } from "./components/StudentInfo";
import { TracksProgress } from "./components/TracksProgress";

const wishlist = [
  {
    id: "1",
    title: "React",
    rating: 4.5,
    description: "Learn how to build modern web applications using React",
    cLevel: "Beginner",
    trackName: "Frontend",
    trackID: "1",
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
    trackID: "1",
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
    trackID: "1",
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
    trackID: "1",
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
    return <SomethingWentWrong />;
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
                trackId={course.trackID}
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
                trackId={course.trackID}
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
