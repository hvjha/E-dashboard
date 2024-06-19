import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Signup from './Component/Signup';
import PrivateCom from './Component/PrivateCom';
import Login from './Component/Login';
import AddProduct from './Page/AddProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path ='/register' element = {<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
          <Route element = {<PrivateCom/>}> 
          <Route path="/" element={<h1>Product Listingd</h1>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/update" element={<h1>update Product Listingd</h1>} />
          <Route path="/profile" element={<h1>profile Product Listingd</h1>} />
          <Route path="/logout" element={<h1>logout Product Listingd</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

