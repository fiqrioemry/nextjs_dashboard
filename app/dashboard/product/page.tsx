import React, { Suspense } from "react";
import ProductList from "./ProductList";
import LoadingPage from "@/components/LoadingPage";
import fetchProducts from "@/services/products";

const Page = async () => {
  return (
    <section>
      <div className="container mx-auto">
        <h1>SALES PAGE</h1>
        <ProductList />
      </div>
    </section>
  );
};

export default Page;
