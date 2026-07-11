"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const addproduct = () => {
  const [data,setdata]=useState({
    title:"",
    price:"",
    description:"",
    category:"",
    rating:"",
    stock:"",
    discountpercentage:""
    
  })
  const usesearch=useSearchParams()

  const id=usesearch.get("id")

  console.log("ID",id)
  useEffect(()=>{
    if(id){
      getproduct()
    }
  },[id])


  const  getproduct=()=>{
    axios.get(`http://localhost:4006/api/viewdetail/${id}`)
    .then((res)=>setdata({
      ...res.data.detail,
      thumbnail:null
  }))


  }
  const handlechangee=(e)=>{
    setdata({
      ...data,
      [e.target.name]:e.target.value
    })
   
  }
    

    const handleimage=(e)=>{
      setdata({
        ...data,
        thumbnail:e.target.files[0]
      })
    }
    

  

  
  const handlesubmit=async(e)=>{
    const token=sessionStorage.getItem("token")
    e.preventDefault()

    const formData=new FormData()

console.log(data.thumbnail)
    formData.append("title",data.title)
    formData.append("price",data.price)
    formData.append("category",data.category)
    formData.append("description",data.description)
    formData.append("stock",data.stock)
    formData.append("discountpercentage",data.discountpercentage)
    formData.append("rating",data.rating)
    formData.append("thumbnail",data.thumbnail)

  const res=await axios.post("http://localhost:4006/api/productcreate",formData,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }

    }
  )
  console.log(res.data)
  alert("data added successfully")
}
  return (
    <>
    <form onSubmit={handlesubmit}>

    <input placeholder='enter a title' className='border-2 border-black-500'  type="text" value={data.title} name='title' onChange={handlechangee} />
    <input placeholder='enter a price' className='border-2 border-black-500'  type="text" value={data.price} name='price' onChange={handlechangee} />
    <input placeholder='enter a category' className='border-2 border-black-500'  type="text" value={data.category} name='category' onChange={handlechangee}/>
    <input placeholder='enter a description' className='border-2 border-black-500'  type="text" value={data.description} name='description'onChange={handlechangee}/>
    <input placeholder='rating' className='border-2 border-black-500'  type="text" name='rating' value={data.rating} onChange={handlechangee} />
      <input placeholder='enter a stock' className='border-2 border-black-500'  type="text" name='stock' value={data.stock} onChange={handlechangee}/>
      <input placeholder='enter a discountpercentage' className='border-2 border-black-500'  type="text" value={data.discountpercentage} name='discountpercentage' onChange={handlechangee} />
      <input placeholder='enter a thumbnail' className='border-2 border-black-500'  type="file" name='thumbnail' value={data.thumbnail} onChange={handleimage} />
      <button type='submit'>submit</button>
    </form>
      
    </>
    
  )
}

export default addproduct
