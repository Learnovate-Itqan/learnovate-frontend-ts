import { FaApple } from "react-icons/fa";

export function AppStoreButton() {
  return (
    <button className="bg-transparent p-2  border-[1px] min-w-28 border-white rounded-lg flex justify-center items-center gap-4">
      <FaApple size={35} />
      <div className="text-left">
        <p className="text-[10px]">Download on the</p>
        <h1 className="font-semibold">App Store</h1>
      </div>
    </button>
  );
}
