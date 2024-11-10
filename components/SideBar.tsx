import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 bottom-0 p-5 bg-gray-500">
      <div className="w-[300px]  flex-center flex-col space-y-4">
        <Link href="/dashboard" className="py-4">
          DASHBOARD
        </Link>
        <Link href="/dashboard/product" className="py-4">
          PRODUCT
        </Link>
        <Link href="/dashboard/transaction" className="py-4">
          TRANSACTION
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
