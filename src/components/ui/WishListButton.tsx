import { useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { usePatchData } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";

type WishListButtonProps = {
  className?: string;
  courseId: string;
  isWishListed: boolean;
};
export function WishListButton({ className = "", courseId, isWishListed }: WishListButtonProps) {
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.authStatus);
  const [optimisticWish, setOptimisticWish] = useState(isWishListed);
  const addToWishList = usePatchData(`/courses/${courseId}/wishlist`);
  async function handleWishList() {
    if (!authStatus) {
      toast.error("Please login to add to wishlist");
      navigate("/auth/login");
      return;
    }
    setOptimisticWish((prev) => !prev);
    const { status } = await addToWishList.mutateAsync({ wishList: !optimisticWish });
    if (status === "failed") {
      setOptimisticWish((prev) => !prev);
    }
  }
  return (
    <button
      className={cn(
        " bg-white p-2 rounded-lg flex items-center gap-2  z-20 text-royal-blue font-[500] hover:bg-gray-100 transition-colors duration-200",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        handleWishList();
      }}
    >
      {optimisticWish ? (
        <>
          <FaHeart size={20} /> <span>Remove from wishlist</span>
        </>
      ) : (
        <>
          <FaRegHeart size={20} /> <span>Add to wishlist</span>
        </>
      )}
    </button>
  );
}
