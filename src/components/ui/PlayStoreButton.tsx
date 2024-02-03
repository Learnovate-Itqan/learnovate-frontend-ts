import { FaGooglePlay } from "react-icons/fa";

export function PlayStoreButton() {
  return (
    <button className="bg-transparent p-2 border-[1px] min-w-40 border-white rounded-lg flex justify-center items-center gap-4">
      <FaGooglePlay size={25} />
      <div className="text-left">
        <p className="text-xs">GET IT ON</p>
        <h1 className="font-semibold">Google Play</h1>
      </div>
    </button>
  );
}
