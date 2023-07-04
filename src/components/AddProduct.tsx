"use client";
import React from "react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
export default function AddProduct({ setCheack, Cheack }: any) {
  const [datas, setProducts] = useState({
    product: "",
    quantity: "",
    price: "",
  });
  const AddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await fetch("/api/mongo", {
        method: "post",
        headers: {
          "Content-type": "appliacation/json",
        },
        body: JSON.stringify(datas),
      });
      setCheack(!Cheack);
      setProducts({
        product: "",
        quantity: "",
        price: "",
      });
      toast.success("Product has been Added !");
    } catch (er) {
      console.log(er);
      toast.error("Something is wrong");
    }
  };
  const handleChangeData = (e: any) => {
    let { value, name } = e.target;
    setProducts((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add a product</h1>
      <form onSubmit={AddProduct}>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Product Name</label>
            <input
              type="text"
              name="product"
              className="w-full bg-white border p-1 "
              value={datas.product}
              onChange={(e) => {
                handleChangeData(e);
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Quantity </label>
            <input
              type="number"
              name="quantity"
              className="w-full bg-white border p-1"
              value={datas.quantity}
              onChange={(e) => {
                handleChangeData(e);
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Price</label>
            <input
              type="number"
              name="price"
              className="w-full bg-white border p-1"
              value={datas.price}
              onChange={handleChangeData}
            />
          </div>
        </div>
        <button
          type="submit"
          className="p-2 mt-3 bg-blue-500 text-white text-base font-semibold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
