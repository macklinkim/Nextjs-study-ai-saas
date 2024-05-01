import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "@/components/mobile-sidebar"
const NavBar = () => {
  return (
    <div className="flex p-4 items-center">
      <MobileSidebar ></MobileSidebar>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
export default NavBar