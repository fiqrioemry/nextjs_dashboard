"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface navLinkType {
  name: string;
  path: string;
}

const navlink: navLinkType[] = [
  { name: "home", path: "/" },
  { name: "product", path: "/product" },
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
              pathname === item.path ? "border-b-2 border-blue-500" : ""
            } py-4 px-4`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavMenu;
