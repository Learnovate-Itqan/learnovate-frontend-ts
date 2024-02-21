import { IoMdPlayCircle } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

type CourseContentsProps = {
  courseChapters: {
    id: string;
    name: string;
    content: {
      id: string;
      name: string;
      duration: string;
      cLink: string;
    }[];
  }[];
  progress: number;
};

export function CourseContents({ courseChapters, progress }: CourseContentsProps) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentVideo = searchParam.get("video") || courseChapters[0].content[0].id;
  const handleVideoClick = (id: string) => {
    searchParam.set("lecture", id);
    setSearchParam(searchParam);
  };
  return (
    <div className="shadow-custom grow rounded-xl overflow-hidden">
      <header className="px-5 py-8 rounded-xl shadow-custom">
        <div className="w-full flex flex-col gap-2">
          <h2 className="ml-1 text-xl font-semibold">{Math.ceil((1 - progress) * 100)}% to complete</h2>
          <Progress className="h-2 rounded-full bg-zinc-300" value={progress * 100} />
        </div>
      </header>
      <main className="py-5 text-dark-navy">
        <ScrollArea className="h-64 xl:h-96">
          <Accordion type="single" collapsible defaultValue={courseChapters[0].name}>
            {courseChapters.map((chapter, index) => (
              <>
                <AccordionItem value={chapter.name} key={index} className=" border-b-0 px-5">
                  <AccordionTrigger className=" text-left flex justify-between items-center gap-4 hover:no-underline">
                    <span className="flex gap-4">
                      <span className=" text-sm flex justify-center items-center border-2 rounded-full w-6 aspect-square border-dark-navy font-semibold">
                        {index + 1}
                      </span>
                      {chapter.name}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className=" text-balance space-y-1 text-base">
                    {chapter.content.map((content, index) => (
                      <button
                        key={index}
                        className={`flex justify-between transition-colors duration-150 w-full text-sm items-center gap-4 px-1 ${currentVideo === content.id ? " text-royal-blue" : " hover:text-royal-blue/70"} `}
                        onClick={() => handleVideoClick(content.id)}
                      >
                        <aside className="flex items-center gap-4">
                          <IoMdPlayCircle />
                          <span>{content.name}</span>
                        </aside>
                        <span className="text-zinc-400">{content.duration}</span>
                      </button>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <hr className=" border-zinc-300" />
              </>
            ))}
          </Accordion>
        </ScrollArea>
      </main>
    </div>
  );
}
