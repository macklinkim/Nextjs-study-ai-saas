'use client'

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "@/components/sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
};
const MobileSidebar = ({apiLimitCount =0, isPro=false }: MobileSidebarProps) => {
  /* hydration 오류가 발생했을경우 처리 코드 추가 */
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        {/* 버튼 에러  In HTML, <button> cannot be a descendant of <button>, hydration error 발생지점, 수정은 button 아래 버튼 또 있을수 없다는데...*/}
        {/* 해결전 */}
        {/* <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button> */}

        {/* 해결 후 */}
        <Menu className="flex md:hidden"/>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <SideBar isPro = {isPro} apiLimitCount ={apiLimitCount}/>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;