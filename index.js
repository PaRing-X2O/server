import express from 'express';
const app = express();
import mongoose from 'mongoose';
import bodyParser from "body-parser";

mongoose.connect("mongodb://localhost:27017/pairing",{useNewUrlParser:true}).then(()=>{}).catch((err)=>{
    console.log("error");
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'));

app.get('/',(req,res)=>{
    console.log("성공");
    res.send("성공");
});

import auth from "./routes/auth";
app.use("/auth", auth);

import user from "./routes/user";
app.use("/user",user);

import post from "./routes/post";
app.use("/post",post);

import project from "./routes/project";
app.use("/project",project);

app.listen(7777, () => {
    console.log("server running 7777!");
});