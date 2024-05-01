"use client"

import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessagesSquare, Music, Settings, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const montserrat = Montserrat({ weight: '600', subsets: ["latin"] });
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-gray-300"
  },
  {
    label: "Conversation",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-violet-300"
  },
  {
    label: "Image Generator",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-300"
  },
  {
    label: "Video Generator",
    icon: VideoIcon,
    href: "/video",
    color: "text-green-300"
  },
  {
    label: "Music Generator",
    icon: Music,
    href: "/music",
    color: "text-sky-300"
  },
  {
    label: "Code Generator",
    icon: Code,
    href: "/code",
    color: "text-orange-300"
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-400"
  },
]
const SideBar = () => {
  //길어지는 className을 줄이기위해 pathname 사용
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-800 text-white" >
      <div className="px-3 py-2 flex-1">
        <Link href='/dashboard' className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/logo.png">
            </Image>
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>My Nextjs App</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((item, index) => (
            <Link href={item.href} key={index} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname=== item.href?"text-white bg-white/10":"text-zinc-400")}>
              <div className="flex items-center flex-1">
                <item.icon className={cn("w-6 h-6 mr-3", item.color)} />
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;