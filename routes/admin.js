const {Router} = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { adminModel, courseModel } = require("../db");
const jwt  = require("jsonwebtoken");


const { JWT_ADMIN_PASSWORD } = require("../config.js");
const { adminmiddlware } = require("../middlewares/admin.js");
adminRouter.post("/signup",async function(req,res){
    try {
        const {email, password, firstname, lastname} = req.body;
        const HashedPassword = await bcrypt.hash(password,5);  
        const admin = new adminModel({
            email,
            password : HashedPassword,
            firstname,   
            lastname
        });
        await admin.save();
        res.json({
            message: "Admin Signed up successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
})

adminRouter.post("/signin",async function(req,res){
    const {email, password} = req.body;
    const admin_response = await adminModel.findOne({
        email : email,
    })

    if(!admin_response){
        res.status(403).json({
            message : "User data not found"
        })
        return  
    }
    const matchedPassword = await bcrypt.compare(password,admin_response.password);
    console.log(matchedPassword)

    
    
    if(matchedPassword){
        const token = jwt.sign({
            id: admin_response._id.toString()
        },JWT_ADMIN_PASSWORD)

        res.json({
            token : token,
            message : "Password Hashed Successfully!!"
        })
    }else{
        res.status(403).json({
            message : "Invalid Credentials"
        })
    }
})



adminRouter.post("/course",adminmiddlware,async function(req,res){
    const adminId = req.userId;
    const {title,description,imageURL,price} = req.body;

    const course = await courseModel.create({
        title : title,
        description : description,
        imageURL : imageURL,
        price : price,
        creatorId : adminId
    })
    res.json({  
        message : course._id
    })
})


adminRouter.put("/course",adminmiddlware,async function(req,res){
    const adminId = req.userId;

    const {title,description,imageURL,price,courseId} = req.body;
    const course = await courseModel.updateOne({
        _id : courseId ,
        creatorId : adminId
    },{
        title: title,
        description : description,
        imageURL : imageURL,
        price : price,
    })
    res.json({
        message: "course updated",
        courseId : course._id
    })
})

adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message : "Purchases Endpoint"
    })
})

module.exports = {
    adminRouter : adminRouter
}