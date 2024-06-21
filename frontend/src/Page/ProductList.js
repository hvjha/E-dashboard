// import React, { useEffect, useState } from "react";
// import "../Style/ProductList.css";
// import { Link } from "react-router-dom";
// import Form from "react-bootstrap/Form";
// const ProductList = () => {
//   const [product, setProduct] = useState([]);
//   useEffect(() => {
//     getProducts();
//   }, []);
//   const getProducts = async () => {
//     let result = await fetch("http://localhost:4500/products",{
//       headers:{
//         authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
//       }
//     });
//     result = await result.json();
//     setProduct(result);
//   };
//   const deleteProduct = async (id) => {
//     let result = await fetch(`http://localhost:4500/product/${id}`, {
//       method: "DELETE",
//       headers:{
//         authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
//       }
//     });
//     result = await result.json();
//     if (result) {
//       getProducts();
//     }
//   };

//   const searchHandler = async (e) => {
//     let key = e.target.value;
//     if (key) {
//       let result = await fetch(`http://localhost:4500/search/${key}`,{
//         headers:{
//           authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
//         }
//       });
//       result = await result.json();
//       if (result) {
//         setProduct(result);
//       }
//     } else {
//       getProducts();
//     }
//   };
//   return (
//     <div className="product-list">
//       <h1>Product List</h1>
//       <Form.Control
//         size="lg"
//         type="text"
//         placeholder="Search Product"
//         onChange={searchHandler}
//       />
//       <br />
//       <ul>
//         <li>S. No</li>
//         <li>Name</li>
//         <li>Price</li>
//         <li>Category</li>
//         <li>Company</li>
//         <li>Operation</li>
//       </ul>
//       {product.length>0?product.map((item, index) => (
//         <ul key={item._id} className="table-row">
//           <li>{index + 1}</li>
//           <li>{item.name}</li>
//           <li>Rs.{item.price}</li>
//           <li>{item.category}</li>
//           <li>{item.company}</li>
//           <li>
//             <button onClick={() => deleteProduct(item._id)}>Delete</button>
//             <Link to={`/update/${item._id}`} className="update-button">
//               Update
//             </Link>
//           </li>
//         </ul>
//       )):<h1>No Product Found</h1>}
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from "react";
import "../Style/ProductList.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const ProductList = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:4500/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    setProduct(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:4500/product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandler = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:4500/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
      result = await result.json();
      if (result) {
        setProduct(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Search Product"
        onChange={searchHandler}
      />
      <br />
      <ul className="table-header">
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      <div className="product-list-content">
        {product.length > 0 ? (
          product.map((item, index) => (
            <ul key={item._id} className="table-row">
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>Rs.{item.price}</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              <li>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                <Link to={`/update/${item._id}`} className="update-button">
                  Update
                </Link>
              </li>
            </ul>
          ))
        ) : (
          <h1>No Product Found</h1>
        )}
      </div>
    </div>
  );
};

export default ProductList;
