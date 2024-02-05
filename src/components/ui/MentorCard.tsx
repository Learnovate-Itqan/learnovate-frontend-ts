import { HiStar } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { Tag } from "./Tag";

type MentorCardProps = {
  name: string;
  image?: string | undefined;
  id: string;
  rating: number;
  title: string;
  className?: string;
};

export default function MentorCard({ name, id, rating, image, title, className }: MentorCardProps) {
  return (
    <div className={"relative rounded-lg shadow-lg overflow-hidden flex flex-col " + className}>
      <img src={image} alt={`${name} image`} title={`${name}`} className="bg-[#B7B9C3] w-full object-cover pb-0 grow" />
      <div className="absolute -left-1 -top-1 flex w-full justify-between p-4 text-sm">
        <Tag>
          <HiStar className="inline-block h-5 w-5 text-yellow-500" />
          <p>{rating}</p>
        </Tag>
      </div>
      <Link to={`/mentors/${id}`} className="bg-[#222C54] py-3  min-h-fit flex flex-col justify-center items-center">
        <h1 className="text-xl text-center font-semibold">{name || "fake Mentor"}</h1>
        <p className=" text-center whitespace-nowrap">{title || "fake title"}</p>
      </Link>
    </div>
  );
}
