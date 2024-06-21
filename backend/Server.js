const express = require('express')
const cors = require('cors');
const app = express();
const Jwt = require('jsonwebtoken');
const jwtKey = "e-shop";
require('./db/config')
const User = require("./db/User")
const Product = require('./db/Product')
// middleware
app.use(express.json())
app.use(cors())
// ======SIGNUP API=======
app.post('/register',async (req,res)=>{
    let data = new User(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send("something went wrong, please try after some time");
        }
        res.send({ result, auth:token});
    })
})
// =====LOGIN API=====
app.post('/login', async(req,res)=>{
    if(req.body.password && req.body.email){
        let data = await User.findOne(req.body).select("-password");
        if(data){
            Jwt.sign({data},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send("something went wrong, please try after some time");
                }
                res.send({ data, auth:token});
            })
          

        }
        else{
          res.send("Invalid User")
        }
    }
    else{
        res.send("User Not Found")
    }
})
// ======ADD PRODUCT API=======
app.post("/add-product",verifyToken,async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})
// =======PRODUCT LISTING API=======
app.get("/products",verifyToken,async(req,res)=>{
    let products =await Product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send("No Product Find")
    }
})
//===== DELETE API========
app.delete('/product/:id',verifyToken,async(req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result)
})
// UPDATE API
// PEIFILL THE FORM API ======
app.get('/product/:id',verifyToken,async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }
    else{
        res.send("no result find")
    }
})
// ======UPDATE API=======
app.put('/product/:id',verifyToken,async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    res.send(result);
})
// =====SEARCH API========
app.get("/search/:key",verifyToken,async(req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {price:{$regex:req.params.key}}
        ]
    });
    res.send(result);
})
// ======MIDDLEWARE FOR TOKEN VERIFICATION ========
function verifyToken(req,res,next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(" ")[1];
        Jwt.verify(token,jwtKey,(err,success)=>{
            if(err){
                res.status(401).send("please provide a valid token")
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(403).send("Please add token with header")
    }
}
const PORT = 4500;
app.listen(PORT,()=>{
    console.log(`Server Is Running On ${PORT}`)
})