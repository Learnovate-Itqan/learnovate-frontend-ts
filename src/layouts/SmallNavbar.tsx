import React from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { BurgerBtn } from "@/components/ui/BurgerButton";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { closeNav } from "@/redux/slices/navSlice";
import { RootState } from "@/redux/store";

import person from "../assets/home/Mentor.png";
import Logo from "../assets/white logo.svg";

export function SmallNavbar({ isAuth, tracks }: { isAuth: boolean; tracks: TTrack[] }) {
  const isOpen = useSelector((state: RootState) => state.nav.isOpen);
  const dispatcher = useDispatch();
  const navRef = useOutsideClick(() => dispatcher(closeNav()));
  const navigate = useNavigate();
  return (
    <nav
      ref={navRef}
      className={`xl:hidden h-dvh absolute w-60 bg-royal-blue z-50 top-0 transition-all duration-300 p-6 flex flex-col justify-between gap-2 ${isOpen ? " right-0" : " -right-60"}`}
    >
      <header>
        <div className="flex justify-between">
          <div className="w-12 ">
            <Link to={"/"}>
              <img src={Logo} />
            </Link>
          </div>
          <BurgerBtn />
        </div>
      </header>

      <ul className="flex flex-col justify-evenly items-end grow text-xl font-semibold text-white">
        <li className="relative">{tracks && <TracksDropDownMenu tracks={tracks} />}</li>
        <li>
          <Link className="hover:opacity-80 transition-opacity" to={"/"}>
            Mentors
          </Link>
        </li>
        <li>
          <Link className="hover:opacity-80 transition-opacity" to={"/courses"}>
            Courses
          </Link>
        </li>
        <li>
          <Link className="hover:opacity-80 transition-opacity" to={"/about"}>
            About
          </Link>
        </li>
        <li>
          <Link className="hover:opacity-80 transition-opacity" to={"/contact"}>
            Contact
          </Link>
        </li>
      </ul>
      {isAuth ? (
        <div className="flex justify-between items-center">
          <Link to="/profile">
            <img src={person} className="w-12 aspect-square rounded-full object-contain bg-dark-navy" />
          </Link>
          <button
            title="log out"
            className=" border-2 border-dark-navy hover:bg-dark-navy/30 transition-colors rounded-md py-2 px-1"
          >
            <LuLogOut className="text-dark-navy" size={30} />
          </button>
        </div>
      ) : (
        <div className="gap-2 min-w-fit flex flex-col justify-center font-semibold items-center w-full">
          <button
            className="text-dark-navy border-2 w-full border-dark-navy px-3 py-1.5 rounded-md whitespace-nowrap hover:bg-dark-navy/20 transition-colors"
            onClick={() => navigate("/auth/register")}
          >
            Sign up
          </button>
          <button
            className="text-white bg-dark-navy/90 w-full px-4 py-2 rounded-md whitespace-nowrap hover:bg-dark-navy/90 transition-colors"
            onClick={() => navigate("/auth/login")}
          >
            Log in
          </button>
        </div>
      )}
    </nav>
  );
}

type TTrack = {
  id: string;
  name: string;
  relatedTopics: string[];
};

function TracksDropDownMenu({ tracks }: { tracks: TTrack[] }) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TTrack | null>(null);
  const dropDownRef = useOutsideClick(() => {
    setIsOpened(false);
    setSelectedTrack(null);
  }, false);

  const handleDropDownMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isOpened) setSelectedTrack(null);
    setIsOpened((prev) => !prev);
  };
  const handleTrackClick = (track: TTrack) => {
    if (selectedTrack === track) setSelectedTrack(null);
    else setSelectedTrack(track);
  };
  return (
    <>
      <button className="flex gap-1 items-center hover:opacity-80 transition-opacity" onClick={handleDropDownMenuClick}>
        <IoIosArrowDown className={` transition-all ${isOpened ? "-rotate-90 text-dark-navy" : "rotate-90"}`} />
        <span>Tracks</span>
      </button>
      <div
        ref={dropDownRef}
        className={` absolute whitespace-nowrap top-0 right-full overflow-hidden transition-all duration-500 flex flex-col z-10 border-white border-[1px] rounded-md bg-royal-blue text-white  ${isOpened ? " max-w-screen-3xl  " : "hidden max-w-0"}`}
      >
        <div className="flex flex-col gap-2 items-end font-[500] p-4 ">
          {tracks.map((track) => (
            <button
              className={`flex items-center gap-1  ${selectedTrack === track ? "text-dark-navy" : "text-white hover:text-dark-navy/70 "}`}
              onClick={() => handleTrackClick(track)}
              key={track.id}
            >
              <span>
                <IoIosArrowDown
                  size={14}
                  className={`transition-all ${selectedTrack === track ? "text-dark-navy rotate-180" : "text-white"}`}
                />
              </span>
              <span>{track.name}</span>
            </button>
          ))}
        </div>
        <div
          className={`text-sm flex flex-col  transition-all duration-300 space-y-2 items-start whitespace-nowrap overflow-hidden ${selectedTrack ? " max-h-screen" : " max-h-0"}`}
        >
          <header className="bg-dark-navy/90 text-white w-full text-lg font-semibold p-4">
            <h1>{selectedTrack?.name}</h1>
          </header>
          <main className="px-4 flex flex-col pb-2 justify-between grow">
            <p className=" font-semibold text-base mb-4">Related Topics</p>
            <div className="flex flex-col grow">
              {selectedTrack?.relatedTopics.map((topic, index) => (
                <Link
                  to={`/tracks/${selectedTrack.name}`}
                  className="hover:text-dark-navy/70 whitespace-nowrap"
                  key={index}
                >
                  {topic}
                </Link>
              ))}
            </div>
            <Link to={`/tracks/${selectedTrack?.name}`} className="text-dark-navy text-base mt-4 block">
              Explore the track
            </Link>
          </main>
        </div>
      </div>
    </>
  );
}
