const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://raashi:raashidb@cluster0.zzczpqb.mongodb.net/logindb");

const UserSchema = new mongoose.Schema({

username:String,
password:String

});

const User = mongoose.model("User", UserSchema);

app.post("/login", async (req,res)=>{

let user = await User.findOne({

username:req.body.username,
password:req.body.password

});

if(user){

res.json({message:"Login Successful"});

}else{

res.json({message:"Invalid Credentials"});

}

});

app.listen(3000, ()=>{

console.log("server running on port 3000");

});