"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";
const LandingAi = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold pt-28 text-center space-y-3 ">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl space-y-4 font-extrabold">
        <h1>AI와 대화해보세요!</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-pink-600  my-4">
          <TypewriterComponent options={{
            strings: [
              "ChatGPT-[3.5], [4]",
              "Meta-Llama3",
              "Dalle3",
              "Replicate-AI-Tools",
              "사진, 음악, 영상 제작",
            ],
            autoStart: true,
            loop: true,
          }} />
        </div>
      </div>
      <div className="text-sm sm:text-md font-extrabold text-gray-400">
        최신 AI를 직접 경험할 기회를 놓치지마세요.
      </div>
      <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
        <Button variant="addCount" className="rounded-full hover:font-bold md:text-md my-6" >무료 체험 시작</Button>
      </Link>
    </div>
  );
}

export default LandingAi;