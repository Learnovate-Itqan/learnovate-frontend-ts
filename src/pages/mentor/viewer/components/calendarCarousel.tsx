import React from "react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type CalendarCarouselProps = {
  selectedDate: number[];
  setSelectedDate: React.Dispatch<React.SetStateAction<number[]>>;
  availability: number[];
};
export const CalendarCarousel = ({ selectedDate, setSelectedDate, availability }: CalendarCarouselProps) => {
  const handleSelection = (idx: number) =>
    setSelectedDate((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  return (
    <Carousel className="flex flex-col gap-2">
      <CarouselContent>
        {availability?.map((time, index) => (
          <CarouselItem key={index} className="basis-1/2 ">
            <Button
              variant={selectedDate.includes(time) ? "default" : "outline"}
              className="w-full border"
              onClick={() => handleSelection(time)}
            >
              {time > 12 ? `${time - 12}:00 PM` : `${time}:00 AM`}
            </Button>
          </CarouselItem>
        ))}
        {availability.length < 1 && <CarouselItem>No available dates</CarouselItem>}
      </CarouselContent>
      <div className="w-full flex justify-between *:translate-y-0">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
};
