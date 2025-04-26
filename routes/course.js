const {Router}  =  require("express");

const {userModel, usermiddleware} = require("../middlewares/user");
const {purchaseModel,courseModel} = require("../db")

const courseRouter = Router();

courseRouter.post("/purchase",usermiddleware,async function(req,res){
const userId = req.userId;
const courseId = req.body.courseId; 

await purchaseModel.create({
    userId,
    courseId
})
res.json({
message: "Hurray!! You have purchased a course successfully..."
})
})

courseRouter.get("/preview",async function(req,res){
    const courses = await courseModel.find({

    })
    res.json({
        courses
    })
})


courseRouter.get("/purchases",usermiddleware,async function(req,res){
    const userId = req.userId;
    const purchased = await purchaseModel.find({
        userId,
    })

    res.json({
        purchased
    })
})
module.exports = {
    courseRouter : courseRouter
}
