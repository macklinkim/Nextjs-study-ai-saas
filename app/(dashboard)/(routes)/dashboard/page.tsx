"use client"
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, MessagesSquare, Music, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {

}
const tools = [
  {
    label: "Conversation",
    icon: MessagesSquare,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    href: "/conversation"
  },
  {
    label: "Music Generator",
    icon: Music,
    href: "/music",
    color: "text-sky-300",
    bgColor: "bg-sky-300/10"
  },
  {
    label: "Code Generator",
    icon: Code,
    href: "/code",
    color: "text-orange-300",
    bgColor: "bg-orange-300/10"
  },
  {
    label: "Video Generator",
    icon: VideoIcon,
    href: "/video",
    color: "text-green-300",
    bgColor: "bg-green-300/10"
  },
  {
    label: "Image Generator",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-300",
    bgColor: "bg-pink-300/10"
  },
]
const DashboardPage = ({ }: Props) => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          My test Project with NextJS, AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          AI랑 채팅도 좀 해보세요. AI의 힘을 느껴보시길!
        </p>

      </div>
      <div className="px4 md:px-20 lg:px-32 space-y-4" >
        {/* npx shadcn-ui@latest add card, shadcn ui써서 작성 */}
        {tools.map((tool) => (
          <Card key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            onClick={() => router.push(tool.href)}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="h-5 w-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
export default DashboardPage