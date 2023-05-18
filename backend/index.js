const express=require("express");
const cors=require("cors")

const app=express();

const {connection}=require("./config/db")
const {authmiddleware}=require("./middleware/authmiddleware");
const {userRouter,rocketRouter}=require("./routes/userRoute")


app.use(cors({
    origin:"*"
}));
app.use(express.json());
app.use("/user",userRouter)
app.use("/launc",rocketRouter)
// app.use(authmiddleware)



app.listen(7500,async()=>{
  try{
     await connection;
     console.log("connected to db")
  }
  catch(err){
     console.log(err)
     console.log("error connecting")
  }
  console.log("listening to port")
})