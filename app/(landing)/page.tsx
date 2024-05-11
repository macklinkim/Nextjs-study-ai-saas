import LandingAi from "@/components/landing-ai";
import LandingContent from "@/components/landing-content";
import LandingCowork from "@/components/landing-cowork";
import LandingNavbar from "@/components/landing-navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar/>
      {/* <LandingAi/>
      <LandingContent/>
      <LandingCowork/> */}
    </div>
    );
}

export default LandingPage;