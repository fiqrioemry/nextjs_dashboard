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
        <div className="flex items-center space-x-4 px-2 py-4 border-b-2">
          <div>
            <FaUserCircle className="text-3xl" />
          </div>
          <div>Admin : John doe</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col py-4 px-4 space-y-4">
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
