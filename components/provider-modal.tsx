"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessagesSquare,
  Music,
  Settings,
  VideoIcon,
  MessageSquareText,
  MessageSquareMore,
  Check,
  Zap
} from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/constants";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const ProviderModal = () => {
  const proModal = useProModal();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-y-3 justify-center items-center">
            <div className="flex items-center gap-x-2 font-bold">
              남은 횟수 충전
              <Badge className="text-sm" variant={"addCount"}>
                충전하기
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center space-y-2 text-zinc-800 font-medium grid grid-cols-2 self-start">
            {tools.map((tool, index) => (
              <Card key={index} className="p-4 border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                  </div>
                </div>
                <div className="break-keep">{tool.label}</div>
                <Check className="h-5 w-5 ml-3" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="addCount"
            className="w-full"
          >
            질문 횟수 추가
            <Zap className="w-4 h-4 ml-2 fill-white"></Zap>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProviderModal;