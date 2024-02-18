import { BsTwitterX } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { HiMail } from "react-icons/hi";

type SocialCardProps = {
  mail?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  className?: string;
  href?: {
    mail?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
};

export function SocialCard({
  mail,
  twitter,
  facebook,
  instagram,
  github,
  linkedin,
  className = "",
  href,
}: SocialCardProps) {
  return (
    <div className={`rounded-xl shadow-2xl p-5 border-[1px] border-gray-100 ${className}`}>
      <div className=" flex flex-col gap-4 *:flex *:justify-start *:items-center *:gap-2 *:cursor-pointer *:transition-colors *:duration-150">
        {mail && (
          <a href={href?.mail && `https://${mail}`} target="_blank" className=" hover:text-royal-blue ">
            <HiMail size={18} /> {mail}
          </a>
        )}
        {facebook && (
          <a href={href?.facebook && `https://${facebook}`} target="_blank" className=" hover:text-royal-blue ">
            <BsFacebook size={18} /> {facebook}
          </a>
        )}
        {twitter && (
          <a href={href?.twitter && `https://${twitter}`} target="_blank" className=" hover:text-royal-blue ">
            <BsTwitterX size={18} /> {twitter}
          </a>
        )}
        {instagram && (
          <a href={href?.instagram && `https://${instagram}`} target="_blank" className=" hover:text-royal-blue ">
            <BsInstagram size={18} /> {instagram}
          </a>
        )}
        {linkedin && (
          <a href={href?.linkedin && `https://${linkedin}`} target="_blank" className=" hover:text-royal-blue ">
            <BsLinkedin size={18} /> {linkedin}
          </a>
        )}
        {github && (
          <a href={href?.github && `https://${github}`} target="_blank" className=" hover:text-royal-blue ">
            <BsGithub size={18} /> {github}
          </a>
        )}
      </div>
    </div>
  );
}
