"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { TotalUsageContextProvider } from "../(context)/TotalUsageContext";
import { UserSubscriptionContextProvider } from "../(context)/UserSubscriptionContext";
import { UpdateCreditUsageProvider } from "../(context)/UpdateCreditUsageContext";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  return (
    <TotalUsageContextProvider>
      <UserSubscriptionContextProvider>
        <UpdateCreditUsageProvider>
          <div className="h-full dark:bg-darkPrimary bg-slate-100">
            <div>
              <SideNav
                showSidebar={showSideBar}
                setShowSidebar={setShowSideBar}
              />
            </div>
            <div className="lg:ml-64">
              <Header setShowSidebar={setShowSideBar} />
              {children}
            </div>
          </div>
        </UpdateCreditUsageProvider>
      </UserSubscriptionContextProvider>
    </TotalUsageContextProvider>
  );
}

export default DashboardLayout;
