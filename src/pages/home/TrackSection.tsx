import TrackCard from "@/components/ui/TrackCard";

type TTrack = {
  id: string;
  title: string;
  relatedTopics: string[];
};

export default function TrackSection({ tracks }: { tracks: TTrack[] }) {
  if (!tracks) return null;
  return (
    <section className="flex justify-center items-center min-h-dvh  text-center">
      <main className="m-8 md:w-3/4 lg:w-2/3 flex flex-col gap-6">
        <h1 className="text-4xl text-dark-navy font-semibold ">Start your journey with your track</h1>
        <p className="text-neutral-gray leading-6 ">
          Lorem ipsum dolor sit amet. Sit facere dignissimos et rerum ducimus non nihil consequatur est sapiente illo in
          ipsum repellendus et dolores velit. Vel Quis velit et fuga nostrum ut ipsum beatae ea tenetur soluta et illum
          ducimus! Id sint galisum et corrupti obcaecati qui quisquam quam hic sint aliquam nam Quis porro qui velit
          soluta et eius natus.
        </p>
        <div className="flex flex-wrap gap-4 justify-center items-center mx-7">
          {tracks.map((track) => (
            <TrackCard key={track.id} {...track} />
          ))}
        </div>
      </main>
    </section>
  );
}
