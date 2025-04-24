"use client";

import { FileClock, Home, Settings, WalletCards, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import UsageTracker from "./UsageTracker";

interface MENU {
  title: string;
  icon: any;
  path: string;
}

interface PROPS {
  showSidebar: boolean;
  setShowSidebar: (value: any) => void;
}

function SideNav({ showSidebar, setShowSidebar }: PROPS) {
  const path = usePathname();

  const MenuList: MENU[] = [
    {
      title: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      title: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div
      className={`${
        showSidebar ? "ml-0" : "ml-[-340px]"
      } lg:ml-0 w-72 lg:w-64 transition-[margin-left] ease-in-out duration-500 h-screen fixed dark:bg-darkSecondary p-5 shadow-sm border bg-white z-10`}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex justify-center gap-1 items-center">
          <Image width={42} height={42} alt="logo" src={"/logo.png"} />
          <span className="font-bold text-xl">Inspire AI</span>
        </div>
        <X
          size={24}
          className="lg:hidden cursor-pointer hover:text-gray-700"
          onClick={() => setShowSidebar(false)}
        />
      </div>
      <hr className="my-5 border" />
      <div className="mt-3">
        {MenuList.map((menu, index) => (
          <Link key={index} href={menu.path} onClick={() => setShowSidebar(false)}>
            <div
              className={`flex items-center mb-3 p-3 gap-2 cursor-pointer hover:bg-primary hover:text-white rounded-lg ${
                path === menu.path && "bg-primary text-white"
              }`}
            >
              <menu.icon size={24} />
              <span className="text-lg">{menu.title}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-10 w-full left-0">
        <UsageTracker setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
}

export default SideNav;
