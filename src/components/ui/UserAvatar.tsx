import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({ imageUrl, name, className = "" }: { imageUrl: string; name: string; className?: string }) {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} title={name} alt={name} />
      <AvatarFallback className=" bg-royal-blue text-lg">{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
