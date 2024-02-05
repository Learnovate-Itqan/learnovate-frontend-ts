import { IoMdSearch } from "react-icons/io";

type TSearchBarProps = {
  className?: string;
};

export function SearchBar({ className }: TSearchBarProps) {
  return (
    <div
      className={
        "flex items-center px-4 py-1  text-white bg-white/10 rounded-lg transition-color duration-300 has-[:focus]:bg-white/5 has-[:focus]:ring-royal-blue has-[:focus]:ring-2 " +
        className
      }
    >
      <IoMdSearch size={20} />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent text-white px-2 py-1 rounded-lg focus:outline-none"
      />
    </div>
  );
}
