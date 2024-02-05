import { FaArrowRight } from "react-icons/fa";

export function SubscribeEmailInput() {
  return (
    <div className="flex overflow-hidden rounded-md w-fit">
      <input type="text" placeholder="Email" className="text-dark-navy p-2 outline-none" />
      <button className="bg-royal-blue py-2 px-3">
        <FaArrowRight size={18} />
      </button>
    </div>
  );
}
