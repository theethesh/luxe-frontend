"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios"

export default function Dashboard() {

  const [user,setuser]=useState(0)
  const [product,setproduct]=useState(0)
  const [order,setorder]=useState(0)
  const [revenue,setrevenue]=useState(0)

const  getdashboard=async()=>{
  const res=await axios.get("http://localhost:4006/api/dashboard")
  console.log(res.data)

  setuser(res.data.usercount)
  setproduct(res.data.productcounts)
  setorder(res.data.ordercounts)
  setrevenue(res.data.totalamount)

}
useEffect(()=>{
  getdashboard()
},[])


  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-5">
        <h1 className="text-2xl font-bold text-yellow-400 mb-8">
          Admin Panel
        </h1>

        <ul className="space-y-4">
          <li>
            <Link href="/admin/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/admin/products">Products</Link>
          </li>

          <li>
            <Link href="/admin/orders">Orders</Link>
          </li>

          <li>
            <Link href="/admin/users">Users</Link>
          </li>

          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Products</h2>
            <p className="text-4xl font-bold mt-3">{product}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Users</h2>
            <p className="text-4xl font-bold mt-3">{user}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Orders</h2>
            <p className="text-4xl font-bold mt-3">{order}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">Revenue</h2>
            <p className="text-4xl font-bold mt-3">{revenue}</p>
          </div>

        </div>

      </div>

    </div>
  );
}