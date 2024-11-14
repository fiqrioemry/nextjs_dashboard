"use client";
import React from "react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

const HeaderSideBar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const adminRoute: string[] = [
    "/dashboard",
    "/dashboard/product",
    "/dashboard/sales",
    "/dashboard/transaction",
  ];
  const isAdminRoute = adminRoute.includes(pathname);
  return (
    <>
      {isAdminRoute ? (
        <div>
          <SidebarProvider>
            <SideBar />
            <div className="w-full">
              <Header />
              {children}
            </div>
          </SidebarProvider>
        </div>
      ) : pathname === "/login" ? (
        <>{children}</>
      ) : (
        <>
          <Header />
          <div>{children}</div>
        </>
      )}
    </>
  );
};

export default HeaderSideBar;
