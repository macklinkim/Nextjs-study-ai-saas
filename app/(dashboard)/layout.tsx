import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-700">
        <SideBar />
      </div>
      <main className="md:pl-72 h-full flex flex-col items-center justify-between">
        <div className="w-full ">
          <NavBar />
          {children}
        </div>
        <div className="w-full ">
          <Footer />
        </div>
      </main>
    </div>);
}

export default DashboardLayout;