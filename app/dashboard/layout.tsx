import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import React from "react";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] ">
        <aside className="hidden w-[200px] md:flex ">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
