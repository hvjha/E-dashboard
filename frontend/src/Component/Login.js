import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login =()=>{
    const[email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    },[navigate])
    const handleLogin= async()=>{
        console.log("Login")
        let result = await fetch('http://localhost:4500/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
          headers:{
            'content-Type':"application/json"
          }
        })
        result = await result.json();
        console.log(result)

        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.data));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/')
            window.dispatchEvent(new Event('storage'));
        }
        else{
            alert("Please Enter correct Details")
        }
       
    }
    return(
        <div className="page-container">
      <div className="signup-container">
        <h1>LogIn</h1>
        <div className="input-group">
          <input type="text" placeholder="Enter Email"  value= {email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button onClick={handleLogin} type="button">LogIn</button>
        </div>
      </div>
      </div>
    )
}
export default Login;