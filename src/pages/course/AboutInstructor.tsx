import { Link } from "react-router-dom";

import mentorAvatar from "@/assets/home/Mentor.png";
import { UserAvatar } from "@/components/ui/UserAvatar";

type AboutInstructorProps = {
  mentor: {
    id: string;
    name: string;
    title: string;
    image: string;
    verified: boolean;
    rating: number;
    noCourses: number;
    noStudents: number;
    noReviews: number;
    noChapters: number;
    noStudentsEnrolled: number;
    noMentors: number;
    noTracks: number;
  };
};
export function AboutInstructor({ mentor }: AboutInstructorProps) {
  return (
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
  );
}
