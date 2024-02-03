import React from "react";
import { useState } from "react";
import { GoBell } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

import { TRACKS } from "@/assets/temp/Tracks";
import { BurgerBtn } from "@/components/ui/BurgerButton";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { SmallSearchBar } from "@/components/ui/SmallSearchBar";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import person from "../assets/home/Mentor.png";
import Logo from "../assets/logo-inline.webp";
import { SmallNavbar } from "./SmallNavbar";

export function Navbar() {
  const [isAuth] = useState(true);

  return (
    <nav className='bg-dark-navy w-full absolute px-5 lg:px-10 xl:px-20 py-5 flex justify-between items-center gap-1 z-50  after:content-[""] after:top-full after:left-0 after:absolute after:-z-1 after:w-full xl:after:h-[100%] after:h-[60%]  after:bg-gradient-to-b after:from-dark-navy after:via-dark-navy/50'>
      <SmallNavbar />
      <div className="min-w-36 max-w-48 ">
        <Link to={"/"}>
          <img src={Logo} />
        </Link>
      </div>
      <div className="grow hidden mx-5 lg:block">
        <ul className="flex space-x-5 text-white">
          <li>
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
      </div>
      {!isAuth ? (
        <div className="space-x-5 min-w-fit hidden lg:flex">
          <button className="text-white whitespace-nowrap hover:opacity-80 transition-opacity">Log in</button>
          <Button text="Sign up" type="button" />
        </div>
      ) : (
        <div className="text-white justify-center items-center gap-5 hidden lg:flex">
          <SearchBar />
          <button>
            <GoBell size={22} />
          </button>
          <Link to="/profile">
            <img src={person} className="w-10 min-w-8 aspect-square rounded-full" />
          </Link>
        </div>
      )}
      <div className="flex justify-center items-center gap-1 lg:hidden">
        <SmallSearchBar />
        <BurgerBtn />
      </div>
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
        <span>Tracks</span>
        <span>
          {" "}
          <IoIosArrowDown className={` transition-all ${isOpened && "rotate-180 text-royal-blue"}`} />{" "}
        </span>
      </button>
      <div
        ref={dropDownRef}
        className={` absolute top-full overflow-hidden transition-all duration-700 flex z-10 bg-white text-dark-navy rounded-lg shadow-lg  ${isOpened ? " max-h-screen" : " max-h-0"}`}
      >
        <div className="flex flex-col gap-2 items-start font-[500] p-4 ">
          {TRACKS.map((track, index) => (
            <button
              className="flex items-center gap-1 hover:text-dark-navy/70"
              onClick={() => handleTrackClick(track)}
              key={index}
            >
              <span>{track.name}</span>
              <span>
                <IoIosArrowDown size={14} className=" -rotate-90" />
              </span>
            </button>
          ))}
        </div>
        <div
          className={`text-sm transition-all duration-300 space-y-2 items-start whitespace-nowrap overflow-hidden ${selectedTrack ? " border-l-2 max-w-screen-3xl" : " max-w-0"}`}
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
