"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/DB";
import { AIOutput, UserSubscription } from "@/utils/Schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import { HISTORY } from "../history/page";
import { Loader2Icon } from "lucide-react";
import { TotalUsageContext } from "../../(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "../../(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

interface PROPS {
  setShowSidebar: (value: boolean) => void;
}

function UsageTracker({ setShowSidebar }: PROPS) {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [maxWords, setMaxWords] = useState<number>(10000);
  const router = useRouter();

  useEffect(() => {
    user && getUserUsageData();
    user && getUserSubscription();
  }, [user]);

  useEffect(() => {
    user && getUserUsageData();
  }, [updateCreditUsage && user]);

  const getUserUsageData = async () => {
    setLoading(true);
    // @ts-ignore
    const result: HISTORY[] = await db
      .select()
      .from(AIOutput)
      // @ts-ignore
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));
    getTotalUsage(result);
    setLoading(false);
  };

  const getUserSubscription = async () => {
    const result = await db
      .select()
      .from(UserSubscription)
      .where(
        // @ts-ignore
        eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress)
      );
    if (result) {
      setUserSubscription(true);
      setMaxWords(100000);
    }
  };

  const getTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach((item) => {
      total += Number(item.aiResponse?.length);
    });
    setTotalUsage(total);
  };

  const clickHandler = () => {
    setShowSidebar(false);
    router.push("/dashboard/billing");
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white rounded-lg p-3 cursor-pointer">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full mt-3 rounded-full">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${(totalUsage / maxWords) * 100}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2 flex items-center gap-1">
          {loading ? (
            <Loader2Icon width={18} className="animate-spin" />
          ) : (
            totalUsage
          )}
          /{maxWords} credit used
        </h2>
      </div>
      <Button
        onClick={clickHandler}
        className="w-full my-3 text-white"
        variant="secondary"
      >
        Upgrade Plan
      </Button>
    </div>
  );
}

export default UsageTracker;
