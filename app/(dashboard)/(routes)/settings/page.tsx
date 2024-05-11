import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingPage = async () => {
  const isPro = (await checkSubscription())!;
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your account settings."
        icon={Settings}
        iconColor="text-violet-400"
        bgColor="bg-violet-400/10"
      />
      <div className="w-fit px-2 lg:px-6 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "정기 구독자입니다." : "무료 사용자입니다."}
        </div>
        {/* <SubscriptionButton isPro={isPro}></SubscriptionButton> */}
      </div>
    </div>
  );
}

export default SettingPage;