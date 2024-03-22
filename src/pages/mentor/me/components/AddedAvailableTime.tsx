import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { IoTrash } from "react-icons/io5";

export function AddedAvailableTime({
  times,
  onDeleteTime,
}: {
  times: { startTime: number; endTime: number; isBooked: boolean };
  onDeleteTime: (startTime: number, endTime: number) => void;
}) {
  return (
    <div className="flex items-center justify-center h-14 gap-4">
      <Select
        disabled
        value={
          times.startTime || times.startTime === 0
            ? format(new Date().setHours(times.startTime + 1), "hh:00 a")
            : undefined
        }
      >
        <SelectTrigger>
          <SelectValue>{format(new Date().setHours(times.startTime), "hh:00 a")}</SelectValue>
        </SelectTrigger>
      </Select>
      <span> to </span>
      <Select
        disabled
        value={
          times.endTime || times.endTime === 0 ? format(new Date().setHours(times.endTime + 1), "hh:00 a") : undefined
        }
      >
        <SelectTrigger>
          <SelectValue>{format(new Date().setHours(times.endTime), "hh:00 a")}</SelectValue>
        </SelectTrigger>
      </Select>
      <Button
        variant="ghost"
        className="text-red-500 hover:bg-transparent hover:text-red-600  rounded-lg px-4 py-2"
        onClick={() => onDeleteTime(times.startTime, times.endTime)}
      >
        <IoTrash className="text-2xl" />
      </Button>
    </div>
  );
}
