"use client";

import { cn } from "@/lib/utils";
import { Settings, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 w-full">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href} className="w-full">
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent" : "bg-trasparent"
            )}
          >
            <item.icon className="mr-2 w-4 h-4" />
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
