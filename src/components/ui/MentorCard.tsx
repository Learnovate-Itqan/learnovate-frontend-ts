import { HiStar } from "react-icons/hi2";
import { Link } from "react-router-dom";

type MentorCardProps = {
  name: string;
  image?: string | undefined;
  id: number;
  rate: number;
  jobTitle: string;
  className?: string;
};

export default function MentorCard({ name, id, rate, image, jobTitle, className }: MentorCardProps) {
  return (
    <div className={"relative rounded-lg shadow-lg overflow-hidden w-52 h-72  flex flex-col " + className}>
      <img src={image} alt="" className="bg-[#B7B9C3] object-cover p-5 pb-0 grow" />
      <div className="absolute -left-1 -top-1 flex w-full justify-between p-4 text-sm">
        <span className="flex items-center justify-center gap-1 rounded-lg text-black bg-[#E5E7ED] px-2 py-1">
          <HiStar className="inline-block h-5 w-5 text-yellow-500" />
          <p>{rate}</p>
        </span>
      </div>
      <Link
        to={`/mentors/${id}`}
        className="bg-[#222C54] py-3 px-6 min-h-fit flex flex-col justify-center items-center"
      >
        <h1 className="text-xl font-semibold">{name}</h1>
        <p className="text-sm whitespace-nowrap">{jobTitle}</p>
      </Link>
    </div>
  );
}
