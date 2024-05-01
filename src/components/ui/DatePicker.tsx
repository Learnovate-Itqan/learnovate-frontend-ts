import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Calendar } from "./calendar";
import { FormControl } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type DatePickerProps = {
  selected: Date | undefined;
  onSelect: SelectSingleEventHandler;
};
export function DatePicker({ selected, onSelect }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <div
            className={cn(
              " cursor-pointer flex text-left bg-transparent rounded-lg border-[0.1rem] border-zinc-400 py-1.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white",
              !selected && "text-muted-foreground"
            )}
          >
            {selected ? format(selected, "dd / MM / yyyy") : <span className="text-zinc-400">DD/MM/YYYY</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </div>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
