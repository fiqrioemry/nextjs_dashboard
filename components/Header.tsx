"use client";

import React from "react";
import NavMenu from "./navMenu";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header: React.FC = () => {
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
      {!isAdminRoute ? (
        <header className="py-4 border-b">
          <div className="container mx-auto flex-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-[2px]">
                NEXT LOGO
              </h1>
            </div>
            <NavMenu />
          </div>
        </header>
      ) : (
        <header className="py-6 bg-primary px-6">
          <div className="flex-between">
            <SidebarTrigger />

            <div className="space-x-4">
              <Button>
                <Link href={"/"}>Home</Link>
              </Button>
              <Button>Logout</Button>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
