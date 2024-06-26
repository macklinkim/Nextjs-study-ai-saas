"use client"
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { tools } from "@/constants";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

type Props = {

}

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