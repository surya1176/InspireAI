"use client"
import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheckIcon, Loader2Icon } from "lucide-react";
import axios from "axios";
import { db } from "@/utils/DB";
import { UserSubscription } from "@/utils/Schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";

function Billing() {

  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  const handleSubscribe = () => {
    setLoading(true);
    axios.post('/api/create-subscription', {}).then((res) => {
      console.log(res.data);
      handlePayment(res.data.id);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  };

  const handlePayment = (subId: string) => {
    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id": subId,
      "name": "Inspire AI",
      "description": "Monthly Subscription",
      handler: async (response: any) => {
        console.log(response);
        if(response) {
          handleSaveSubscription(response?.razorpay_payment_id);
        }
        setLoading(false);
      }
    }
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSaveSubscription = async (paymentId: string) => {
    const result = await db.insert(UserSubscription).values({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      active: true,
      paymentId: paymentId,
      startDate: moment().format('YYYY-MM-DD')
    })
    console.log(result);
    if(result) {
      window.location.reload();
    }
  };

  return (
    <div className="dark:bg-darkPrimary h-screen bg-slate-100 px-4 py-8">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="max-w-5xl max-lg:max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 dark:text-white text-gray-800">
            Upgrade with Monthly Plan
          </h2>
          <p className="text-sm dark:text-gray-300 text-gray-500">
            Choose the monthly plan to access premium features
          </p>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 mx-auto gap-12 max-w-2xl max-sm:mx-auto mt-12">
          <div className="bg-white dark:bg-gray-700 shadow rounded-3xl p-6 hover:scale-105 transition-all duration-300">
            <h4 className="text-gray-800 dark:text-white text-lg mb-3">Free</h4>
            <h3 className="text-4xl font-semibold ">
              $0
              <sub className="text-gray-500 dark:text-gray-300 font-medium text-sm ml-1">
                / month
              </sub>
            </h3>

            <hr className="my-6 border-gray-300" />

            <div>
              <ul className="space-y-4">
                <li className="flex items-center text-sm dark:text-gray-300 text-gray-500">
                  <CircleCheckIcon className="w-5 h-5 mr-3 fill-purple-100 text-purple-600" />
                  10,000 Cedits/Month
                </li>
                <li className="flex items-center text-sm dark:text-gray-300 text-gray-500">
                  <CircleCheckIcon className="w-5 h-5 mr-3 fill-purple-100 text-purple-600" />
                  20 Content Templates
                </li>
                <li className="flex items-center text-sm dark:text-gray-300 text-gray-500">
                  <CircleCheckIcon className="w-5 h-5 mr-3 fill-purple-100 text-purple-600" />
                  Unlimited Download and Copy
                </li>
                <li className="flex items-center text-sm dark:text-gray-300 text-gray-500">
                  <CircleCheckIcon className="w-5 h-5 mr-3 fill-purple-100 text-purple-600" />
                  1 Month of History
                </li>
              </ul>

              <Button
                variant="outline"
                type="button"
                className="w-full mt-6 px-4 py-2 text-sm tracking-wide"
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 shadow rounded-3xl p-6 hover:scale-105 transition-all duration-300">
            <h4 className="text-gray-800 text-lg mb-3 dark:text-white">Monthly</h4>
            <h3 className="text-4xl font-semibold">
              $4.99
              <sub className="text-gray-500 dark:text-gray-300 font-medium text-sm ml-1">
                / month
              </sub>
            </h3>

            <hr className="my-6 border-gray-300" />

            <div>
              <ul className="space-y-4">
                <li className="flex items-center text-sm dark:text-gray-300 text-gray-500">
                  <CircleCheckIcon className="w-5 h-5 mr-3 fill-purple-100 text-purple-600" />
                  100,000 Credits/Month
                </li>
                <li className="flex items-center text-sm dark:text-gray-300 text-gray-500">
                  <CircleCheckIcon className="w-5 h-5 mr-3 fill-purple-100 text-purple-600" />
                  50+ Content Templates
                </li>
                <li className="flex items-center text-sm dark:text-gray-300 text-gray-500">
                  <CircleCheckIcon className="w-5 h-5 mr-3 fill-purple-100 text-purple-600" />
                  Unlimited Download and Copy
                </li>
                <li className="flex items-center text-sm dark:text-gray-300 text-gray-500">
                  <CircleCheckIcon className="w-5 h-5 mr-3 fill-purple-100 text-purple-600" />
                  1 Year of History
                </li>
                <li className="flex items-center text-sm dark:text-gray-300 text-gray-500">
                  <CircleCheckIcon className="w-5 h-5 mr-3 fill-purple-100 text-purple-600" />
                  Premium Resume Builder
                </li>
              </ul>
              <Button
                disabled={loading || userSubscription}
                onClick={() => handleSubscribe()}
                className="flex gap-2 items-center w-full mt-6 px-4 py-2 text-sm tracking-wide"
              >
                {loading && <Loader2Icon className="animate-spin" />}
                {userSubscription ? 'Active Plan' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
