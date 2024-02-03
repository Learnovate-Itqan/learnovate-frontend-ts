import React from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { TRACKS } from "@/assets/temp/Tracks";
import { BurgerBtn } from "@/components/ui/BurgerButton";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { closeNav } from "@/redux/slices/navSlice";
import { RootState } from "@/redux/store";

import person from "../assets/home/Mentor.png";
import Logo from "../assets/white logo.svg";

export function SmallNavbar() {
  const isOpen = useSelector((state: RootState) => state.nav.isOpen);
  const dispatcher = useDispatch();
  const navRef = useOutsideClick(() => dispatcher(closeNav()));
  const [isAuth] = useState(true);
  return (
    <nav
      ref={navRef}
      className={`h-dvh absolute w-60 bg-royal-blue z-50 top-0 transition-all duration-300 p-6 flex flex-col justify-between gap-2 ${isOpen ? " right-0" : " -right-60"}`}
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
        <li className="relative">
          <TracksDropDownMenu />
        </li>
        <li>
          <Link className="hover:opacity-80 transition-opacity" to={"/"}>
            Mentors
          </Link>
        </li>
        <li>
          <Link className="hover:opacity-80 transition-opacity" to={"/"}>
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
          <button className="text-dark-navy border-2 w-full border-dark-navy px-3 py-1.5 rounded-md whitespace-nowrap hover:bg-dark-navy/20 transition-colors">
            Sign up
          </button>
          <button className="text-white bg-dark-navy/90 w-full px-4 py-2 rounded-md whitespace-nowrap hover:bg-dark-navy/90 transition-colors">
            Log in
          </button>
        </div>
      )}
    </nav>
  );
}

function TracksDropDownMenu() {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<(typeof TRACKS)[0] | null>(null);
  const dropDownRef = useOutsideClick(() => setIsOpened(false), false);

  const handleDropDownMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isOpened) setSelectedTrack(null);
    setIsOpened((prev) => !prev);
  };
  const handleTrackClick = (track: (typeof TRACKS)[0]) => {
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
        className={` absolute whitespace-nowrap top-0 right-full overflow-hidden transition-all duration-500 flex flex-row-reverse z-10 border-white border-[1px] rounded-md bg-royal-blue text-white  ${isOpened ? " max-w-screen-3xl  " : "hidden max-w-0"}`}
      >
        <div className="flex flex-col gap-2 items-end font-[500] p-4 ">
          {TRACKS.map((track, index) => (
            <button
              className={`flex items-center gap-1 hover:text-dark-navy/70 ${selectedTrack === track ? "text-dark-navy" : "text-white"}`}
              onClick={() => handleTrackClick(track)}
              key={index}
            >
              <span>
                <IoIosArrowDown size={14} className=" rotate-90" />
              </span>
              <span>{track.name}</span>
            </button>
          ))}
        </div>
        <div
          className={`text-sm transition-all duration-300 space-y-2 items-start whitespace-nowrap overflow-hidden ${selectedTrack ? " max-w-screen-3xl" : " max-w-0"}`}
        >
          <header className="bg-dark-navy/90 text-white w-full text-lg font-semibold p-4">
            <h1>{selectedTrack?.name}</h1>
          </header>
          <main className="px-4">
            <p className=" font-semibold text-base mb-4">Related Topics</p>
            <div className="flex flex-col">
              {selectedTrack?.relatedTopics.map((topic, index) => (
                <Link to={`/tracks/${selectedTrack.name}`} className="hover:text-dark-navy/70" key={index}>
                  {topic}
                </Link>
              ))}
            </div>
            <Link to={`/tracks/${selectedTrack?.name}`} className="text-royal-blue text-base mt-4 block">
              Explore the track
            </Link>
          </main>
        </div>
      </div>
    </>
  );
}
