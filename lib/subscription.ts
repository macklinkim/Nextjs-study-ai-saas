import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();
  if (!userId) return;

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    }
  })
  
  if (!userSubscription) return;
  
  const isValid = userSubscription.stripePriceId && 
  userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
  
  //boolean 값을 return
  return !!isValid;
}