import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      
      <div className="flex flex-col items-center justify-center">
        <p>GPT4, dalle3와 함께 AI 체험을 해보세요!</p>
        <Link href="/sign-in">
          <Button>
            Login
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button>
            Register
          </Button>
        </Link>
      </div>
    </div>);
}

export default LandingPage;