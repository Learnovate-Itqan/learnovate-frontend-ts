import { IoCheckmark } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button";

type PricingCardProps = {
  name: string;
  description: string;
  recommended?: boolean;
  price: number;
  features: string[];
  className?: string;
};

export function PricingCard({ name, description, price, features, recommended, className }: PricingCardProps) {
  return (
    <div
      className={twMerge(
        " p-4 py-6 flex flex-col  gap-5 rounded-xl shadow-xl font-poppins grow bg-gray-200 w-96",
        className
      )}
    >
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold capitalize" title={name}>
          {name}
        </h1>
        {recommended && <span className="px-3 py-1 capitalize text-[12px] rounded-xl bg-royal-blue">Recommended</span>}
      </header>
      <p>{description}</p>
      <p>
        <span className="text-6xl font-semibold"> ${price}</span> /per month
      </p>
      <Button className="w-full">Try 7 days for free</Button>
      <h2 className="text-2xl font-[500] ">Features</h2>
      <ul className="grid gap-4">
        {features.map((feature, index) => (
          <li className="flex gap-2 items-center" key={index} title={feature}>
            <span
              className={`w-5 h-5 transition-colors duration-30 border-2 grid place-content-center text-white rounded-full bg-royal-blue border-royal-blue`}
            >
              <IoCheckmark size={15} className=" stroke-2" />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
