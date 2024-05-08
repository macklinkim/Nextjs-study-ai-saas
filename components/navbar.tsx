import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "@/components/mobile-sidebar"
interface NavBarProps {
  apiLimitCount: number;
};
const NavBar = ({apiLimitCount =0 }: NavBarProps) => {
  return (
    <div className="flex p-4 items-center">
      <MobileSidebar apiLimitCount = {apiLimitCount} ></MobileSidebar>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
export default NavBar