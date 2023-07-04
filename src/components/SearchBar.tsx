"use client";
import React from "react";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { toast } from "react-toastify";
import Loader from "./Loader";
export default function SearchBar({ setCheck, Cheack }: any) {
  const [load, setload] = useState(false);
  const [loadAction, setloadAction] = useState(false);
  const [dropdown, setdropdown] = useState([]);
  const onDropdown = async (e: any) => {
    setload(true);
    const { value } = e.target;
    try {
      if (value.length >= 2) {
        const res = await fetch(`/api/search?query=${value}`);
        const data = await res.json();
        setload(false);
        setdropdown(data);
      }
      if (value.length == 0) {
        setdropdown([]);
        setload(false);
      }
    } catch (er) {
      toast.warning("Errror");
    }
  };
  const buttonAction = async (
    action: String,
    product: String,
    Mainquantity: Number
  ) => {
    let index = dropdown.findIndex((item: any) => item.product == product);
    let newProdcut = JSON.parse(JSON.stringify(dropdown));
    if (action == "plus") {
      newProdcut[index].quantity = Number(Mainquantity) + 1;
    } else {
      newProdcut[index].quantity = Number(Mainquantity) - 1;
    }
    setdropdown(newProdcut);
    setloadAction(true);
    let response = await fetch("/api/action", {
      method: "post",
      headers: {
        "Content-type": "appliacation/json",
      },
      body: JSON.stringify({ action, product, Mainquantity }),
    });
    setloadAction(false);
    setCheck(!Cheack);
  };
  return (
    <div className="container relative mx-auto font-sans font-medium">
      <h1 className="text-3xl font-bold my-6">Search Product</h1>
      <div className="flex my-3 ">
        <input
          type="text"
          placeholder="Search"
          onChange={onDropdown}
          className="flex-grow  px-4 border border-gray-400 rounded"
        />
        <select className="border border-gray-400 rounded bg-white  px-2 py-1">
          <option value="name">Name</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>
      <div className="dropcontainer absolute w-[93.6%]  z-10 bg-white ">
        {load && <Loader />}
        {dropdown.map(({ product, quantity, price }: any, index: any) => {
          return (
            <div
              key={index}
              className="container flex justify-between px-6  font-semibold py-2 border-y-2 gap-1 bg-slate-50 "
            >
              <span>
                {product} ({quantity} available for ₹{price} )
              </span>
              <div className="mx-5 ">
                <button
                  disabled={loadAction}
                  onClick={() => {
                    buttonAction("minus", product, quantity);
                  }}
                >
                  <RemoveCircleOutlineIcon
                    fontSize="medium"
                    className={`${
                      loadAction ? "text-blue-300" : "text-blue-600"
                    } font-bold cursor-pointer `}
                  />
                </button>
                <span className="inline-block w-9 text-center">{quantity}</span>
                <button
                  disabled={loadAction}
                  onClick={() => {
                    buttonAction("plus", product, quantity);
                  }}
                >
                  <AddCircleOutlineIcon
                    fontSize="medium"
                    className={`${
                      loadAction ? "text-blue-300" : "text-blue-600"
                    } font-bold cursor-pointer `}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
