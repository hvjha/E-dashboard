import React,{useState} from 'react';
import '../Style/AddProduct.css';

const AddProduct = () => {
    const[name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[company,setCompany]=useState("");
    const [err,setErr]=useState(false);
    const handleProduct=async(e)=>{
        e.preventDefault();
        if(!name || !price || !category || !company){
            setErr(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:4500/add-product",{
            method:"POST",
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                'content-Type':"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
    }

  return (
    <div className='page'>
    <div className="container">
      <h1>Add Product Page</h1>
      <div className="form-row">
        <input type="text" placeholder="Enter Product Name"
            value={name} onChange={(e)=>setName(e.target.value)}
        />
        {err && !name && <span className="error">Enter a valid name</span>}
        <input type="text" placeholder="Enter Product Price"
            value={price} onChange={(e)=>setPrice(e.target.value)}
        />
         {err && !price && <span className="error">Enter price</span>}
      </div>
      <div className="form-row">
        <input type="text" placeholder="Enter Product Category"
           value={category} onChange={(e)=>setCategory(e.target.value)}
        />
         {err && !category && <span className="error">Enter category</span>}
        <input type="text" placeholder="Enter Product Company Name"
            value={company} onChange={(e)=>setCompany(e.target.value)}
        />
          {err && !company && <span className="error">Enter company name</span>}
      </div>
      <button onClick={handleProduct}>Add Product</button>
    </div>
    </div>
  )
}

export default AddProduct;

