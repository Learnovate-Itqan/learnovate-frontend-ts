import { TbMessage } from "react-icons/tb";

import mentorViewer from "@/assets/mentors/mentorViewer.webp";
import { Button } from "@/components/ui/button";

type TViewerHeader = {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  price: number;
};

export const ViewerHeader = ({ name, jobTitle, description, image, price }: TViewerHeader) => {
  return (
    <header className="w-full">
      <div className="w-full relative">
        <div className="absolute inset-0 -z-20">
          <img src={mentorViewer} alt={name} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="z-0 text-white py-20 lg:pb-0 lg:pt-20">
          <div className="container h-full flex flex-col-reverse sm:flex-row sm:items-center lg:items-end justify-between">
            <div className="h-full flex flex-col justify-center lg:mb-20 sm:gap-2">
              <h1 className="font-semibold text-royal-blue text-3xl xs:text-4xl sm:text-5xl text-pretty">{name}</h1>
              <h2 className="font-medium text-xl text-pretty">{jobTitle}</h2>
              <p className="max-w-lg text-balance mt-2">{description}</p>
              <div className="flex flex-col xs:flex-row sm:flex-col mt-4 gap-y-2 gap-x-4">
                <div className="flex gap-x-4">
                  <Button type="button" className="rounded-full px-6">
                    <TbMessage className="mr-2" />
                    <span>Message</span>
                  </Button>
                  <Button
                    type="button"
                    className="flex flex-col bg-transparent hover:bg-white/10 items-center justify-center gap-1 border border-royal-blue rounded-full w-10 h-10"
                  >
                    <div className="w-1 h-1 rounded-full bg-royal-blue"></div>
                    <div className="w-1 h-1 rounded-full bg-royal-blue"></div>
                    <div className="w-1 h-1 rounded-full bg-royal-blue"></div>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-gray-300 whitespace-nowrap">
                  <span>{`Price: ${price}$ / hour`}</span>
                </div>
              </div>
            </div>
            <div className="flex w-fit items-end rounded-full overflow-hidden border-b-2 border-b-royal-blue lg:border-b-0 lg:overflow-visible">
              <img
                src={image}
                alt={`${name} - ${description}`}
                title={name}
                className="w-52 h-52 sm:w-auto sm:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
