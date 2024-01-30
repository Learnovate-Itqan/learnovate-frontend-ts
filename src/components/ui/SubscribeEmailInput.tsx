import { FaArrowRight } from "react-icons/fa";

export function SubscribeEmailInput() {
  return (
    <div className="flex overflow-hidden rounded-md w-fit">
      <input type="text" placeholder="Email" className=" p-2 outline-none" />
      <button className="bg-royal-blue p-2">
        <FaArrowRight size={22} />
      </button>
    </div>
  );
}
