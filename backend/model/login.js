const mongoose=require("mongoose");

mongoose.set('strictQuery', true);

const logSchema=mongoose.Schema({
    email:String,
    password:String,
})

const Logmodel=mongoose.model("brainst",logSchema)

module.exports={Logmodel}