const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));


/*
MongoDB connection
Uses Atlas URL locally
Also works in CI
*/

const MONGO_URL =
process.env.MONGO_URL ||
"mongodb+srv://raashi:raashidb@cluster0.zzczpqb.mongodb.net/logindb?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL)

.then(()=>{

console.log("MongoDB connected");

})

.catch((err)=>{

console.log("MongoDB connection error:");
console.log(err);

});


/*
Create schema
*/

const UserSchema = new mongoose.Schema({

username: String,
password: String

});

const User = mongoose.model("User", UserSchema);


/*
Login API
*/

app.post("/login", async (req,res)=>{

try{

const user = await User.findOne({

username: req.body.username,
password: req.body.password

});

if(user){

res.json({

message:"Login Successful"

});

}
else{

res.json({

message:"Invalid Credentials"

});

}

}
catch(error){

res.json({

message:"Server Error"

});

}

});


/*
Start server
*/

const PORT = 3000;

app.listen(PORT, ()=>{

console.log("Server running on port " + PORT);

});