import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({ imageUrl, name }: { imageUrl: string; name: string }) {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} title={name} alt={name} />
      <AvatarFallback className=" bg-royal-blue text-lg">{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
