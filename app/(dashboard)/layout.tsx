import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = (await getApiLimitCount())!;
  const isPro = (await checkSubscription())!;
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[1] bg-gray-700 overflow-auto overscroll-none">
        <SideBar isPro = {isPro} apiLimitCount = {apiLimitCount} />
      </div>
      <main className="w-full md:fixed md:pl-72 h-full flex flex-col items-center justify-between overflow-auto overscroll-none">
        <div className="w-full">
          <NavBar apiLimitCount = {apiLimitCount}/>
          {children}
        </div>
        <div className="w-full ">
          <Footer />
        </div>
      </main>
    </div>);
}

export default DashboardLayout;