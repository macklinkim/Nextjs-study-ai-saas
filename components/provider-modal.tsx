"use client";

import { useState } from "react";
import axios from "axios";
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
import toast from "react-hot-toast";
const ProviderModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      // const response = await axios.get("/api/stripe");
      // window.location.href = response.data.url;
    } catch (error:any) {
      toast.error("[api/stripe]", {...error});
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-y-3 justify-center items-center">
            <div className="flex items-center gap-x-2 font-bold">
              남은 횟수 충전
              <Badge className="text-sm text-white font-bold" variant={"addCount"}>
                충전하기
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-800 font-medium grid grid-cols-2 gap-1 ">
            {tools.map((tool, index) => (
              <Card key={index} className="p-4 border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <div className={cn("p-1 w-fit rounded-md", tool.bgColor)}>
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
            disabled = {loading}
            onClick={onSubscribe}
            size="lg"
            variant="addCount"
            className="w-full text-white font-bold"
          >
            질문 횟수 추가
            <Zap className="w-6 h-6 ml-2 fill-amber-200"></Zap>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProviderModal;