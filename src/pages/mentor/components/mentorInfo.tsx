import { RatingStars } from "./stars";

type TMentorInfo = {
  workExperience: string;
  education: string;
  jobExperience: string;
  rating: number;
  resume: string;
  languages: string[];
  location: string;
  timeZones: string;
};

export const MentorInfo = ({
  workExperience,
  education,
  jobExperience,
  rating,
  resume,
  languages,
  location,
  timeZones,
}: TMentorInfo) => {
  return (
    <div className="space-y-2.5">
      <div className="space-y-2.5">
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Work experience:</h4>
          <p className="text-balance max-w-2xl">{workExperience}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Education:</h4>
          <p className="text-balance max-w-xl">{education}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Experience:</h4>
          <p className="text-balance max-w-xl">{jobExperience}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Rating:</h4>
          <div className="flex items-center gap-x-2">
            <RatingStars rating={rating} />
            <span>{rating}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2.5 grid grid-cols-2">
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Resume/cv:</h4>
          <a href={resume} target="_blank" rel="noreferrer">
            <p className="text-balance max-w-xl text-royal-blue hover:underline underline-offset-2">View</p>
          </a>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Languages:</h4>
          <p className="text-balance max-w-xl">{languages.join(", ")}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Location:</h4>
          <p className="text-balance max-w-xl">{location}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-xl text-pretty">Timezone:</h4>
          <p className="text-balance max-w-xl">{timeZones}</p>
        </div>
      </div>
    </div>
  );
};
