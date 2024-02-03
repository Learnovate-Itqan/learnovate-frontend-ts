type TrackCardProps = {
  title: string;
  image?: string | undefined;
};

export default function TrackCard({ title, image }: TrackCardProps) {
  return (
    <div className="relative min-w-fit py-3 px-10 overflow-hidden rounded-lg bg-dark-navy">
      <img className=" absolute inset-0 object-cover opacity-20" src={image} alt="" loading="lazy" />
      <h1 className="text-white text-xl font-semibold z-10 opacity-100">{title}</h1>
    </div>
  );
}
