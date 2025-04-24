const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/v1/user",userRouter);
app.use("/v1/admin",adminRouter);
app.use("/v1/course",courseRouter);

async function auth(req,res,next){

}
async function main(){
    try{
     await mongoose.connect(process.env.URI)
    console.log('Connected to the database');
        
    }catch(e){
        console.log("Problem in Connecting to db... ",e);
    }
    
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

main()


