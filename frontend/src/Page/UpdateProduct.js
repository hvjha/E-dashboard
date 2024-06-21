import React,{useEffect, useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
const UpdateProduct = () => {
    const[name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[company,setCompany]=useState("");
    const params= useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const handleProduct=async(e)=>{
        e.preventDefault();
        let result = await fetch(`http://localhost:4500/product/${params.id}`,{
          method:'PUT',
          body:JSON.stringify({name,price,category,company}),
          headers:{
            'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    const getProductDetails=async()=>{
        let result = await fetch(`http://localhost:4500/product/${params.id}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

  return (
    <div className='page'>
    <div className="container">
      <h1>Update Product Page</h1>
      <div className="form-row">
        <input type="text" placeholder="Enter Product Name"
            value={name} onChange={(e)=>setName(e.target.value)}
        />
        <input type="text" placeholder="Enter Product Price"
            value={price} onChange={(e)=>setPrice(e.target.value)}
        />
      </div>
      <div className="form-row">
        <input type="text" placeholder="Enter Product Category"
           value={category} onChange={(e)=>setCategory(e.target.value)}
        />
        <input type="text" placeholder="Enter Product Company Name"
            value={company} onChange={(e)=>setCompany(e.target.value)}
        />
      </div>
      <button onClick={handleProduct}>Update Product</button>
    </div>
    </div>
  )
}

export default UpdateProduct
