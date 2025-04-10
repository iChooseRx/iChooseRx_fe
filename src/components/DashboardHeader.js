"use client";

import DocsDropdown from "@/components/DocsDropdown";
import MenuDropdown from "@/components/MenuDropdown";

export default function DashboardHeader() {
  return (
    <div className="relative z-10 w-full">
      <header className="h-20 flex justify-between items-center px-4 sm:px-10 bg-primary text-white w-full">
        <h1 className="text-2xl sm:text-4xl font-bold whitespace-nowrap">iChooseRx</h1>
        <div className="flex space-x-2 sm:space-x-4 items-center">
          <DocsDropdown />
          <MenuDropdown />
        </div>
      </header>
    </div>
  );
}
