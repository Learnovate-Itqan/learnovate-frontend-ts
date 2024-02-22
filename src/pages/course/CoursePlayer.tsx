import { useSearchParams } from "react-router-dom";

import videoPoster from "@/assets/videoPoster.jpg";
import { Player } from "@/components/ui/player/player";

type CoursePlayerProps = {
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
};
export function CoursePlayer({ courseChapters }: CoursePlayerProps) {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("lecture") || "6410";
  const currentVideo = courseChapters.flatMap((chapter) => chapter.content).find((content) => content.id === videoId);
  return (
    <Player
      src={currentVideo?.cLink || ""}
      title={currentVideo?.name}
      poster={{ src: videoPoster, alt: "poster" }}
      className="rounded-xl"
    />
  );
}
