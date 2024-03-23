import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiTwitterXLine } from "react-icons/ri";

export const SocialCard = () => {
  return (
    <div className="shadow-custom flex flex-col gap-y-4 justify-center p-6 rounded-md *:text-dark-navy text-xl">
      <a href="mailto:Learnovate@gmail.com" className="flex items-center gap-2 w-fit">
        <MdEmail className="text-2xl" />
        <span>Learnovate@gmail.com</span>
      </a>
      <a href="https://LinkedIn.com/learnovate" className="flex items-center gap-2 w-fit">
        <FaLinkedin className="text-2xl" />
        <span>LinkedIn.com/learnovate</span>
      </a>
      <a href="https://RiTwitterXLine" className="flex items-center gap-2 w-fit">
        <RiTwitterXLine className="text-2xl" />
        <span>www.x.com</span>
      </a>
      <a href="https://Github.com/learnovate" className="flex items-center gap-2 w-fit">
        <FaGithub className="text-2xl" />
        <span>Github.com/learnovate</span>
      </a>
    </div>
  );
};
