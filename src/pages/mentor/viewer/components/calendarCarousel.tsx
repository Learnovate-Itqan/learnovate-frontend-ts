import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const CalendarCarousel = () => {
  const [selectedDate, setSelectedDate] = useState<number[]>([]);

  const handleSelection = (idx: number) =>
    setSelectedDate((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  return (
    <Carousel className="flex flex-col gap-2">
      <CarouselContent>
        {Array.from({ length: 12 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
            <Button
              variant={selectedDate.includes(index) ? "default" : "outline"}
              className="w-full"
              onClick={() => handleSelection(index)}
            >
              {`${9 + index}:00`}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="w-full flex justify-between *:translate-y-0">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
};
