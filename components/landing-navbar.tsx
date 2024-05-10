"use client"
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
//client side에서 쓸 수 있는 auth임 역할은 같다.
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({ weight: '600', subsets: ["latin"] });
const LandingNavbar = () => {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <nav className="flex items-center justify-between p-8 bg-transparent">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
        />
        <span className={cn("text-2xl font-bold text-white", montserrat.className)}>
          My Nextjs App
        </span>
      </Link>
      <div className="flex items-center justify-center gap-x-2">
        <Link href={isLoaded && isSignedIn ? "/dashboard" : "/sign-up"} className="flex justify-center items-center gap-x-3 text-white font-semibold">
          {isLoaded && isSignedIn ? "Dashboard" : "Sign In"}
          <Button variant="outline" className="rounded-full text-gray-700 hover:font-bold" >AI 협업 시작하기</Button>
        </Link>
      </div>
    </nav>
  );
}

export default LandingNavbar;