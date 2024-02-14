import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { z } from "zod";

import { trackSchema } from "@/schemas/trackSchema";

export function useTracksName() {
  const queryClient = useQueryClient();
  const tracksQuery = queryClient.getQueryData(["tracks"]) as z.infer<typeof trackSchema>[] | null;
  const [tracks, setTracks] = useState<string[]>([]);
  useEffect(() => {
    if (tracksQuery) {
      setTracks(tracksQuery.map((track) => track.name));
    }
  }, [tracksQuery]);
  return tracks;
}
