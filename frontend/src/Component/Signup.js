import React,{useEffect, useState} from 'react';
import '../Style/Signup.css';
import { useNavigate} from 'react-router-dom'
const Signup = () => {
    const [name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[print,setPrint]=useState(null)
    const navigate = useNavigate();
    useEffect(()=>{
      const auth = localStorage.getItem('user');
      if(auth){
        navigate('/');
      }
    },[navigate]);
    const handleSignup=async (e)=>{
        e.preventDefault();
        console.log(name,email,password)
        const data ={name,email,password}
        setPrint(data);
        const result = await fetch('http://localhost:4500/register',{
          method:'POST',
          body:JSON.stringify({name,email,password}),
          headers:{
            'content-Type':"application/json"
          }
        })
        const val = await result.json();
        console.log(val)
        localStorage.setItem('user',JSON.stringify(val))
        if(val){
          navigate('/')
          window.dispatchEvent(new Event('storage'));
        }
    }
  return (
    <div className="page-container">
      <div className="signup-container">
        <h1>Register</h1>
        <div className="input-group">
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
          <input type="text"  value={email} onChange={(e)=>setEmail(e.target.value)}placeholder="Enter Email" />
          <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}placeholder="Enter Password" />
          <button onClick={handleSignup} type="button">Sign Up</button>
        </div>
      </div>
      {print && (
        <div className='printData'>
            <h2>Print Form Data</h2>
            <p>Name:{print.name}</p>
            <p>Email:{print.email}</p>
            <p>Password:{print.password}</p>
        </div>
      )}
    </div>
  );
}

export default Signup;





