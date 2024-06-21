import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Style/navbar.css'; 
import { RiLogoutCircleRLine } from 'react-icons/ri'; 
import avatarImg from '../assets/Harsh-E.png'; 

const Navbar = () => {
  const [auth, setAuth] = useState(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear();
    setAuth(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth(localStorage.getItem('user'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <ul className="nav-ul">
        <li className="logo-li">
          <img className="logo" src={avatarImg} alt="Avatar" />
        </li>
        {auth ? (
          <>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Product</Link></li>
            {/* <li><Link to="/update">Update Product</Link></li> */}
            <li className="profile-li">
              <Link to="/profile">
                <span className="avatar-span">{JSON.parse(auth).name}</span>
                <RiLogoutCircleRLine className="logout-icon" onClick={logout} />
              </Link>
            </li>
          </>
        ) : (
          <div className="nav-right">
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
