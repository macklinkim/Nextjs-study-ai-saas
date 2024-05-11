"use client";
import { useEffect, useState } from "react";
import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

const FreeCounter = ({ apiLimitCount = 0, isPro=false }: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  if(isPro) return null;
  
  return (
    <div className="px-2">
      <Card className="bg-white/10 border-0 flex flex-col">
        <CardContent className="py-3">
          <div className="text-center text-sm text-white mb-2 space-y-2">
            <p>
              {`AI 질문 남은 횟수 ${apiLimitCount}/${MAX_FREE_COUNTS}`}
            </p>
            <Progress className="" value={apiLimitCount / MAX_FREE_COUNTS * 100} max={1}/>
          </div>
          <Button onClick={proModal.onOpen} className="w-full bg-gray-600 text-white font-bold" variant={"addCount"}>
            질문 횟수 +하기
            <Zap className="w-5 h-5 ml-2 fill-gray-300" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default FreeCounter;