"use client"

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const [product,setproduct]=useState(null)

  const updateproduct=async()=>{
    const token=sessionStorage.getItem("token")
    const res=await axios.put("http://localhost:4006/api/updateproduct")



  }
  const {id}=useParams()



  
  return (
    <div>
      
      
    </div>
  )
}

export default page
