"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Item } from "@/lib/definition";
import { BiSortAlt2 } from "react-icons/bi";

import fetchProducts from "@/services/products";
import React, { useState, useEffect } from "react";
import LoadingPage from "@/components/LoadingPage";

const headers = ["No.", "Name", "Cost", "Price", "Stock", "Category"];

const ProductList = () => {
  const [products, setProducts] = useState<Item | null>(null);
  console.log(products);
  useEffect(() => {
    const getProducts = async () => {
      const data = (await fetchProducts()) as Item[];
      console.log(data);
    };
    getProducts();
  }, []);
  return (
    <div className="rounded-md border">
      <input
        type="text"
        placeholder="Search products..."
        className="mb-4 p-2 border rounded"
      />
      <Table>
        <TableHeader className="border-b">
          {headers.map((header, index) => (
            <TableHead key={index}>
              <div className="flex w-full items-center justify-between ">
                <div>{header}</div>
                <button className="py-2 px-2 rounded-md hover:bg-primary transition-all duration-300">
                  <BiSortAlt2 />
                </button>
              </div>
            </TableHead>
          ))}
        </TableHeader>
        {!products ? (
          <LoadingPage />
        ) : (
          <TableBody>
            {products.map((item, index) => (
              <TableRow key={item.id} className="text-start px-4">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.item_cost}</TableCell>
                <TableCell>{item.item_price}</TableCell>
                <TableCell>{item.item_stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default ProductList;
