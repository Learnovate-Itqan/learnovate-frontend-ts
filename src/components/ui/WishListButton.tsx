import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { usePatchData } from "@/hooks/useApi";
import { cn } from "@/lib/utils";

type WishListButtonProps = {
  className?: string;
  courseId: string;
  isWishListed: boolean;
};
export function WishListButton({ className = "", courseId, isWishListed }: WishListButtonProps) {
  const [optimisticWish, setOptimisticWish] = useState(isWishListed);
  const addToWishList = usePatchData(`/courses/${courseId}/wishlist`);
  async function handleWishList() {
    setOptimisticWish((prev) => !prev);
    const { status } = await addToWishList.mutateAsync({ wishList: !optimisticWish });
    if (status === "failed") {
      setOptimisticWish((prev) => !prev);
    }
  }
  return (
    <button
      className={cn(" bg-white p-2 rounded-lg flex items-center gap-2  z-20 text-royal-blue font-[500]", className)}
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
