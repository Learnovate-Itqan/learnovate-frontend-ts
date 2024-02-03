import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

import { useOutsideClick } from "@/hooks/useOutsideClick";

export function SmallSearchBar() {
  const [isOpened, setIsOpened] = useState(false);
  const searchBarRef = useOutsideClick(() => setIsOpened(false));
  return (
    <div
      ref={searchBarRef}
      className={`flex gap-1 p-1 rounded-lg transition-color duration-300 ${isOpened ? "has-[:focus]:bg-white/5 has-[:focus]:ring-royal-blue has-[:focus]:ring-2" : ""}  `}
    >
      <button className="lg:hidden" onClick={() => setIsOpened((prev) => !prev)}>
        <label htmlFor="Search" className=" cursor-pointer">
          <IoMdSearch size={30} className="text-white" />
        </label>
      </button>
      <input
        type="text"
        id="Search"
        placeholder="Search"
        className={`bg-transparent text-white px-2 py-1 rounded-lg focus:outline-none ${isOpened ? "max-w-screen-xl " : "max-w-0"} `}
      />
    </div>
  );
}
