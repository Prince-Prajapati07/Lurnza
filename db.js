const mongoose = require("mongoose")
console.log("Connected Successfully!!!")
// mongoose.connect("");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema  = new Schema({
// _id : ObjectId,
email : {type : String,unique : true},
password : String,
firstname : String,
lastname : String   

})

const adminSchema = new Schema({
    email : {type : String,unique : true},
    password : String,
    firstname : String,
    lastname : String
})

const courseSchema = new Schema({
title : String,
description : String,
price : Number,
imageURL : String,
creatorId : ObjectId    
})

const purchaseSchema = new Schema({
userId : ObjectId,
courseId : ObjectId
})

const adminModel= mongoose.model("admin",adminSchema)
const courseModel = mongoose.model("course",courseSchema)
const purchaseModel = mongoose.model("purchases",purchaseSchema)
const userModel = mongoose.model("user",userSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}