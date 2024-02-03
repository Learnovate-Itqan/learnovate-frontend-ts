import { HiStar } from "react-icons/hi2";
import { IoPlayCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import { Tag } from "./Tag";

type CourseCardProps = {
  id: string;
  name: string;
  image?: string | undefined;
  rate: number;
  level: string;
  duration: number;
  price: number;
  track: string;
  description: string;
  className?: string;
};

export default function CourseCard({
  name,
  track,
  duration,
  level,
  rate,
  image,
  price,
  id,
  description,
  className,
}: CourseCardProps) {
  return (
    <div className={"text-black rounded-lg shadow-lg overflow-hidden border-2 grow min-w-64 " + className}>
      <div className=" bg-[#B7B9C3] h-56 relative">
        <img src={image} className=" object-cover h-full w-full" alt="" loading="lazy" />
        <Link
          to={`/course/${id}`}
          className=" absolute inset-0 z-10 bg-black/50 hover:opacity-100 flex justify-center items-center transition-all opacity-0 "
        >
          <IoPlayCircleSharp className="text-white" size={50} />
        </Link>
      </div>
      <div>
        <div className="bg-white p-6 grid gap-2">
          <Link to={`/track/${track}`} className=" text-royal-blue font-semibold w-fit hover:underline">
            {track}
          </Link>
          <Link to={`/course/${id}`} className="text-lg font-semibold w-fit">
            {name}
          </Link>
          <p className=" text-neutral-gray text-sm">{description}</p>
          <footer className="flex justify-between max-w-96 item-center">
            <Tag>
              {rate} <HiStar className="text-yellow-500" size={18} />{" "}
            </Tag>
            <Tag>{level}</Tag>
            <Tag>{duration} Min</Tag>
            <Tag>{price}$</Tag>
          </footer>
        </div>
      </div>
    </div>
  );
}
