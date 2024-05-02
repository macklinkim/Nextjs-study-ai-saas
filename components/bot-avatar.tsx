import { Avatar, AvatarImage } from "./ui/avatar";
interface BotProps {
  src?: string;
}
const BotAvatar = ({src}: BotProps) => {
  return (
    <Avatar className="w-12 h-12">
      <AvatarImage src={src||"/bot-avatar.png"} />
    </Avatar>
  );
}

export default BotAvatar;