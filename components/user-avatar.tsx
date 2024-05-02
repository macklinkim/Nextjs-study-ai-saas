import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = () => {
  /* npx shadcn-ui@latest add avatar 사용하여  아바타 컴포넌트 제작해보겠습니다.*/
  const { user } = useUser();
  let nickName = '익명';
  if (user?.firstName && user?.lastName) {
    nickName = user?.firstName?.charAt(0).toUpperCase() + user?.lastName?.charAt(0).toUpperCase()
  }
  return (
    <Avatar className="w-12 h-12">
      {/* @ts-ignore */}
      <AvatarImage src={user?.profileImageUrl} />
      <AvatarFallback delayMs={600}>
        {/* @ts-ignore */}
        {nickName}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;