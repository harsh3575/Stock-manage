"use client";
import React, { useEffect, useState } from "react";

export default function ({ Cheack }: any) {
  const [TableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/mongo", { method: "get" });
      const { data } = await res.json();
      setTableData(data);
    };
    fetchData();
  }, [Cheack]);
  return (
    <div className="mx-1">
      <h1 className="text-3xl font-bold my-6">Display Current Stock</h1>
      <table className="table-auto w-full show-data relative">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Product Name</th>
            <th className="border border-gray-400 px-4 py-2">Quantity</th>
            <th className="border border-gray-400 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {TableData.map((item: any, index) => (
            <tr key={item._id} className="show-data">
              <td className="border border-gray-400  px-4 py-2">
                {item.product}
              </td>
              <td className="border border-gray-400  px-4 py-2">
                {item.quantity}
              </td>
              <td className="border border-gray-400  px-4 py-2">
                ₹ {item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
