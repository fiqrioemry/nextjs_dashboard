"use client";
import { menuType } from "@/lib/definition";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import React from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

const sideBarMenu: menuType[] = [
  {
    name: "dashboard",
    path: "/dashboard",
  },
  {
    name: "product",
    path: "/dashboard/product",
  },
  {
    name: "transaction",
    path: "/dashboard/transaction",
  },
  {
    name: "sales",
    path: "/dashboard/sales",
  },
];

const SideBar = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-20 items-center space-x-4 px-4  py-6 border-b-2">
          <FaUserCircle className="text-4xl" />
          <div className="text-sm">
            <p>Admin</p>
            <p>John Doe</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col py-4 px-4 font-semibold text-primary space-y-4">
          {sideBarMenu.map((item, index) => {
            return (
              <Link
                href={item.path}
                key={index}
                className={`${
                  pathname === item.path ? "text-accent" : ""
                } uppercase`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default SideBar;
