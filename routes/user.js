// const express = require("express");
// const app = express();

const {Router} = require("express");
const userRouter = Router();
const {userModel} = require("../db");  // Correct import using destructuring
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const {JWT_USER_PASSWORD} = require("../config.js")
userRouter.post("/signup", async function(req,res){
    try {
        const {email, password, firstname, lastname} = req.body;
        const HashedPassword = await bcrypt.hash(password,5);  
        const user = new userModel({
            email,
            password : HashedPassword,
            firstname,   
            lastname
        });
        await user.save();
        res.json({
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

userRouter.post("/signin", async function(req,res){
    
        const {email, password} = req.body;
        const response = await userModel.findOne({
            email : email,
        })

        if(!response){
            res.status(403).json({
                message : "User data not found"
            })
            return  
        }
        const matchedPassword = await bcrypt.compare(password,response.password);
        console.log(matchedPassword)

        
        
        if(matchedPassword){
            const token = jwt.sign({
                id: response._id.toString()
            },JWT_USER_PASSWORD)

            res.json({
                token : token,
                message : "Password Hashed Successfully!!"
            })
        }else{
            res.status(403).json({
                message : "Invalid Credentials"
            })
        }
    });

userRouter.get("/purchases", async function(req,res){
    try {
        // Add your purchases logic here
        res.json({
            message: "Purchases retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving purchases",
            error: error.message
        });
    }
});

module.exports = {
    userRouter
}