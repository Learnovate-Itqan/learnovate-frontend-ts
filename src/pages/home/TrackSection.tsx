import { TRACKS } from "@/assets/temp/Tracks";
import TrackCard from "@/components/ui/TrackCard";

export default function TrackSection() {
  return (
    <section className="flex justify-center items-center h-dvh  text-center">
      <main className="w-2/3 flex flex-col gap-6">
        <h1 className="text-4xl text-dark-navy font-semibold ">Start your journey with your track</h1>
        <p className="text-neutral-gray leading-6 ">
          Lorem ipsum dolor sit amet. Sit facere dignissimos et rerum ducimus non nihil consequatur est sapiente illo in
          ipsum repellendus et dolores velit. Vel Quis velit et fuga nostrum ut ipsum beatae ea tenetur soluta et illum
          ducimus! Id sint galisum et corrupti obcaecati qui quisquam quam hic sint aliquam nam Quis porro qui velit
          soluta et eius natus.
        </p>
        <div className="flex flex-wrap gap-4  justify-center items-center mx-7">
          {TRACKS.map((track) => (
            <TrackCard key={track.name} {...track} />
          ))}
        </div>
      </main>
    </section>
  );
}
