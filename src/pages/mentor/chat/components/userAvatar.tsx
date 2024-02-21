import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TUserAvatar = {
  className: string;
  image?: string;
  name: string;
};

export const UserAvatar = ({ className, name, image }: TUserAvatar) => (
  <Avatar className={className}>
    <AvatarImage src={image} alt={name} title={name} />
    <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
  </Avatar>
);
