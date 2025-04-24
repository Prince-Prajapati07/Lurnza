const {Router}  =  require("express");

const {courseModel} = require("../db");

const courseRouter = Router();

courseRouter.get("/preview",function(req,res){
res.json({
    message : "Preview,Endpoint!!"
})
})

courseRouter.get("/courses",function(req,res){
    res.json({
        message : "You have enrolled in the following courses."
    })
})

module.exports = {
    courseRouter : courseRouter
}
