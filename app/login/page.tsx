"use client";
import React, { useState } from "react";

interface formDataType {
  useremail: string;
  password: string;
}

const Page = () => {
  const [formData, setFormData] = useState<formDataType>({
    useremail: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${formData.useremail} and ${formData.password}`);
  };
  return (
    <div className="h-screen flex-center bg-black/20">
      <div className="w-[300px] px-4 py-4 rounded-md shadow-xl bg-white">
        <div className="text-center mb-6">
          <h1 className="text-2xl">Web Store Management</h1>
        </div>
        <form action="submit" className="space-y-2">
          <input
            onChange={handleChange}
            type="text"
            name="useremail"
            placeholder="useremail"
            className="py-2 px-4 rounded-md border w-full"
          />

          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password"
            className="py-2 px-4 rounded-md border w-full"
          />

          <button
            className="flex-center py-2 px-4 rounded-md bg-primary text-white w-full"
            onClick={handleSubmit}
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
