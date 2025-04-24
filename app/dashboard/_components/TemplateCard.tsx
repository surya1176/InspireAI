import React, { useContext } from "react";
import { TEMPLATE } from "./TemplateListSection";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { UserSubscriptionContext } from "../../(context)/UserSubscriptionContext";

function TemplateCard(item: TEMPLATE) {
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  return (
    <Link href={!userSubscription && item.premium ? '/dashboard' : `/dashboard/content/${item.slug}`} key={item.slug}>
      <div className="sm:p-5 p-4 shadow-md rounded-md border dark:bg-gray-700 bg-white flex flex-col gap-2 cursor-pointer hover:scale-105 transition-all">
        <div className="flex gap-2 items-start justify-between">
          <Image src={item.icon} alt={item.name} width={50} height={50} />
          {item.premium && (
            <div className="bg-gradient-to-br from-purple-500 via-purple-700 to-blue-500 p-2 rounded-full">
              <Lock size={18} className="text-secondary" />
            </div>
          )}
        </div>
        <h2 className="font-medium text-lg">{item.name}</h2>
        <p className="text-gray-500 dark:text-gray-300 line-clamp-3">{item.description}</p>
      </div>
    </Link>
  );
}

export default TemplateCard;
