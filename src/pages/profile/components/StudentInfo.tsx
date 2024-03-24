import { differenceInCalendarYears, format } from "date-fns";

import { Skeleton } from "@/components/ui/skeleton";
import { COUNTRIES } from "@/db/Countries";

type StudentInfoProps = {
  education: string;
  dateOfBirth: Date;
  location: string;
};

export function StudentInfo({ education, dateOfBirth, location }: StudentInfoProps) {
  const countryImage =
    (location &&
      COUNTRIES.find((country) => country.name.toLocaleLowerCase() === location.toLocaleLowerCase())?.image) ||
    "";
  return (
    <section className="space-y-2.5 rounded-md container shadow-custom py-4">
      <div className="space-y-1">
        <h4 className="font-medium text-xl text-pretty">Education:</h4>
        {education ? (
          <p className="text-balance text-zinc-700 max-w-2xl">{education}</p>
        ) : (
          <Skeleton className="w-full max-w-2xl h-6 " />
        )}
      </div>
      <div className="space-y-1">
        <h4 className="font-medium text-xl text-pretty">Date of birth:</h4>
        {dateOfBirth ? (
          <p className="text-balance text-zinc-700 max-w-2xl">
            {format(dateOfBirth, "dd/MM/yyyy")} - {differenceInCalendarYears(new Date(), dateOfBirth)} years old
          </p>
        ) : (
          <Skeleton className="w-full max-w-2xl h-6 " />
        )}
      </div>
      <div className="space-y-1">
        <h4 className="font-medium text-xl text-pretty">Location:</h4>
        {location ? (
          <p className="text-balance flex items-center gap-2 text-zinc-700 max-w-2xl">
            <span>
              <img
                src={countryImage}
                alt={location}
                title={location}
                className="h-5"
                loading="lazy"
                onError={(e) => e.currentTarget.remove()}
              />
            </span>
            {location}
          </p>
        ) : (
          <Skeleton className="w-full max-w-2xl h-6 " />
        )}
      </div>
    </section>
  );
}
