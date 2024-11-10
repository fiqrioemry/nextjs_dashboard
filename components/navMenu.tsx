"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { menuType } from "@/lib/definition";

const navlink: menuType[] = [
  { name: "home", path: "/" },
  { name: "dashboard", path: "/dashboard" },
];
const NavMenu = () => {
  const pathname = usePathname();

  return (
    <nav>
      {navlink.map((item, index) => {
        return (
          <Link
            href={item.path}
            key={index}
            className={`${
              pathname === item.path ? "border-b-2 border-accent" : ""
            } py-5 px-4`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavMenu;
