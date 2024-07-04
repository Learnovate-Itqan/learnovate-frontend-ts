import { z } from "zod";

import CourseCard from "@/components/ui/CourseCard";
import { SocialCard } from "@/components/ui/SocialCard";
import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/useApi";
import { useWishlist } from "@/hooks/useWishlist";
import { LoadingPage } from "@/layouts/LoadingPage";
import { studentSchema } from "@/schemas/studentSchema";

import { BookedSessions } from "../mentor/me/components/BookedSessions";
import { StudentHeader } from "./components/StudentHeader";
import { StudentInfo } from "./components/StudentInfo";
import { TracksProgress } from "./components/TracksProgress";

export function StudentProfilePage() {
  const { data: response, isLoading } = useGetData("students/profile");
  const { wishlist, isLoading: isLoadingWishlist } = useWishlist();
  const { status, data } = response?.data || {};
  const { student }: { student: z.infer<typeof studentSchema> } = data || {};

  if (isLoading) return <LoadingPage />;
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
            dob={student.user.dob}
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
            {isLoadingWishlist ? (
              <Spinner />
            ) : (
              wishlist
                ?.slice(0, 3)
                .map((course) => (
                  <CourseCard
                    key={course.course.id}
                    className=" min-w-72"
                    name={course.course.title}
                    rate={course.course.rating}
                    description={course.course.description}
                    level={course.course.cLevel}
                    id={course.course.id}
                    track={course.course.trackName}
                    duration={course.course.estimatedTime || 0}
                    image={course.course.image}
                    price={course.course.price}
                    trackId={course.course.trackID}
                  />
                ))
            )}
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
            {isLoadingWishlist ? (
              <Spinner />
            ) : (
              wishlist
                ?.slice(0, 3)
                .map((course) => (
                  <CourseCard
                    key={course.course.id}
                    className=" min-w-72"
                    name={course.course.title}
                    rate={course.course.rating}
                    description={course.course.description}
                    level={course.course.cLevel}
                    id={course.course.id}
                    track={course.course.trackName}
                    duration={course.course.estimatedTime || 0}
                    image={course.course.image}
                    price={course.course.price}
                    trackId={course.course.trackID}
                  />
                ))
            )}
          </main>
        </section>
      </main>
    </main>
  );
}
