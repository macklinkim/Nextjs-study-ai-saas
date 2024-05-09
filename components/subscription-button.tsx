"use client"

import { useState } from "react";
import axios from "axios";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button"
interface SubscriptionButtonProps {
  isPro: boolean;
}
const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      const response = await axios.get("/api/stripe");
    } catch (error) {
      console.log("[api/stripe]", error);
      
    }
  }
  return (
    <Button onClick={handleClick} variant={isPro ? "default" : "addCount"} className="w-full" disabled={loading}>
      {isPro ? "결재 방식 관리하기" : "신규 구독하기"}
      {!isPro && <Zap className="h-7 w-7 ml-2 fill-white">구독하기</Zap>}
    </Button>
  );
}

export default SubscriptionButton;