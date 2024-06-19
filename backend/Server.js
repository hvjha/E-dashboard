const express = require('express')
const cors = require('cors');
const app = express();
require('./db/config')
const User = require("./db/User")
const Product = require('./db/Product')
// middleware
app.use(express.json())
app.use(cors())

app.post('/register',async (req,res)=>{
    let data = new User(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    res.send(result)
})

app.post('/login', async(req,res)=>{
    if(req.body.password && req.body.email){
        let data = await User.findOne(req.body).select("-password");
        if(data){
          res.send(data);
        }
        else{
          res.send("Invalid User")
        }
    }
    else{
        res.send("User Not Found")
    }
})

app.post("/add-product",async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/products",async(req,res)=>{
    let products =await Product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send("No Product Find")
    }
})
const PORT = 4500;
app.listen(PORT,()=>{
    console.log(`Server Is Running On ${PORT}`)
})