import { z } from "zod";

import CourseCard from "@/components/ui/CourseCard";
import { Keywords } from "@/components/ui/Keywords";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { WishListButton } from "@/components/ui/WishListButton";
import { Button } from "@/components/ui/button";
import { courseSchema } from "@/schemas/courseSchema";
import { formatCurrency } from "@/utils/helpers";

import courseImage from "../../assets/learnovate-thumbnail-course.png";
import { CourseContent } from "./components/CourseContent";
import { CourseDetails } from "./components/courseDetails";

const COURSE: z.infer<typeof courseSchema> = {
  id: "22",
  title: "Foundations of Python",
  publishTime: "2021-09-01T00:00:00.000Z",
  description:
    "Unlock the secrets to creating captivating digital experiences with our UI/UX Design Mastery track. In this comprehensive program, you'll delve into the art and science of User Interface (UI) and User Experience (UX) design.",
  keywords: "Python, Programming, Coding, Beginner, Intermediate, Advanced".split(",").map((keyword) => keyword.trim()),
  image: courseImage,
  progress: 0,
  estimatedTime: 10,
  noChapters: 10,
  noStudentsEnrolled: 1000,
  rating: 4.5,
  cLevel: "beginner",
  cLink: "https://learnovate.com/courses/python",
  trackID: "1",
  trackName: "Python",
  price: 50,
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
  publisher: {
    id: "1",
    name: "John Doe",
    image: "",
  },
};

const courseChapters = [
  {
    id: "1",
    name: "Introduction to Python",
    duration: "1hr 30mins",
    cLink: "https://learnovate.com/courses/python",
  },
  {
    id: "2",
    name: "Python Basics",
    duration: "2hrs 30mins",
    cLink: "https://learnovate.com/courses/python",
  },
  {
    id: "3",
    name: "Python Intermediate",
    duration: "1hr 30mins",
    cLink: "https://learnovate.com/courses/python",
  },
  {
    id: "4",
    name: "Python Advanced",
    duration: "2hrs 30mins",
    cLink: "https://learnovate.com/courses/python",
  },
  {
    id: "5",
    name: "Python Projects",
    duration: "1hr 30mins",
    cLink: "https://learnovate.com/courses/python",
  },
  {
    id: "6",
    name: "Python Certification",
    duration: "2hrs 30mins",
    cLink: "https://learnovate.com/courses/python",
  },
  {
    id: "7",
    name: "Python Projects",
    duration: "1hr 30mins",
    cLink: "https://learnovate.com/courses/python",
  },
  {
    id: "8",
    name: "Python Certification",
    duration: "2hrs 30mins",
    cLink: "https://learnovate.com/courses/python",
  },
  {
    id: "9",
    name: "Python Projects",
    duration: "1hr 30mins",
    cLink: "https://learnovate.com/courses/python",
  },
  {
    id: "10",
    name: "Python Certification",
    duration: "2hrs 30mins",
    cLink: "https://learnovate.com/courses/python",
  },
];

const relatedCourses: z.infer<typeof courseSchema>[] = [COURSE, COURSE, COURSE];
export function CourseInfo() {
  return (
    <main>
      <main className="grid lg:grid-cols-[1fr_28rem] lg:grid-rows-[minmax(min,1fr)_1fr]">
        <section className="bg-dark-navy text-white py-10 space-y-4 ">
          <div className="container space-y-2">
            <h1 className="text-4xl font-semibold hidden lg:block">{COURSE.title}</h1>
            <h2 className="text-2xl lg:hidden">Course Description :</h2>
            <p className="text-lg">{COURSE.description}</p>
          </div>
          <CourseDetails {...COURSE} />
          <div className="container pt-3 flex justify-start items-center gap-3">
            <UserAvatar imageUrl="" name=" Micheal Johnson" className=" h-10 w-10" />
            <span className="text-xl">Instructor: Micheal Johnson</span>
          </div>
        </section>
        <div className=" container py-10 lg:pt-10 lg:px-5 lg:bg-dark-navy relative row-start-1 lg:row-start-auto ">
          <header className=" lg:absolute lg:me-10 lg:p-5 grid gap-5  lg:shadow-custom rounded-xl bg-white">
            <div className=" lg:hidden">
              <h1 className="text-2xl font-semibold text-dark-navy">{COURSE.title}</h1>
              <p className="text-zinc-500 text-lg">{COURSE.trackName}</p>
            </div>
            <img src={COURSE.image} alt={COURSE.title} className=" lg:rounded-xl" loading="lazy" />
            <Keywords keywords={COURSE.keywords} />

            <h1 className="text-4xl text-dark-navy font-semibold">{formatCurrency(COURSE.price)}</h1>
            <div className="grid gap-2">
              <Button>Buy Now</Button>
              {/* <Button variant={"outline"} className="text-royal-blue border-royal-blue hover:text-royal-blue">
                Add to wishlist
              </Button> */}
              <WishListButton
                className=" justify-center border-[1px] border-royal-blue"
                courseId={COURSE.id}
                isWishListed={false}
              />
            </div>
          </header>
        </div>
        <section className="py-10 container grid gap-3">
          <h1 className="text-3xl font-semibold">Course Content :</h1>
          <CourseContent courseChapters={courseChapters} />
        </section>
      </main>
      <section className="container py-10">
        <h1 className="text-3xl font-semibold">Related courses:</h1>
        <div className=" grid grid-cols-auto-fit-19 gap-3">
          {relatedCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              name={course.title}
              description={course.description}
              image={course.image}
              rate={course.rating}
              level={course.cLevel}
              price={course.price}
              track={course.trackName}
              duration={course.estimatedTime}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
