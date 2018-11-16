import express from "express";
const route = express.Router();

import User from "../models/User";

route.post('/signin', async (req,res)=>{
    try {
        const {user_id,user_pw}=req.body;
        const user = await User.findOne({user_id});
        if(user){
            if(user.user_pw===user_pw){
                res.status(200).json({success:true,data:user._id});
            } else {
                throw new Error("로그인 실패")
            }
        } else {
            throw new Error("로그인 실패");
        }
    } catch (err) {
        res.status(400).json({success: false, message: err.message});                
    }
});

route.post('/signup',(req,res)=>{
    try {
        const {user_id, user_pw, name, phone} = req.body;
        const user = new User({
            user_id,
            user_pw,
            name,
            phone
        });
        user.save();
        res.status(200).json({success: true, data: user});
    } catch (err) {
        res.status(400).json({success: false, message: err.message});        
    }
});

export default route;