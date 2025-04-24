"use client";
import React, { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";

function Dashboard() {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <div className="h-full bg-slate-100">
      <SearchSection onSearchInput={(value: string) => setSearchInput(value)} />
      <TemplateListSection searchInput={searchInput} />
    </div>
  );
}

export default Dashboard;
