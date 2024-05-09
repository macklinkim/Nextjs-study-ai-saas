import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "@/components/mobile-sidebar"
import { checkSubscription } from "@/lib/subscription";
interface NavBarProps {
  apiLimitCount: number;
};
const NavBar = async ({apiLimitCount =0 }: NavBarProps) => {
  const isPro = (await checkSubscription())!;
  return (
    <div className="flex p-4 items-center overflow-auto">
      <MobileSidebar isPro = {isPro} apiLimitCount = {apiLimitCount} ></MobileSidebar>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
export default NavBar