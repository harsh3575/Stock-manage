"use client";
import AddProduct from "@/components/AddProduct";
import Display from "@/components/Display";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

export default function Home() {
  const [Cheack, setCheack] = useState(false);

  return (
    <>
      <Navbar />
      <SearchBar setCheck={setCheack} Cheack={Cheack} />
      <div className="container  mx-auto font-sans font-medium">
        <AddProduct setCheack={setCheack} Cheack={Cheack} />
        <Display Cheack={Cheack} />
      </div>
    </>
  );
}
