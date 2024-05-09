"use client"

import { useEffect, useState } from "react";
import ProviderModal from "@/components/provider-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <ProviderModal></ProviderModal>
    </div>
  );
}