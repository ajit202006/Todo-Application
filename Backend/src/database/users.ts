import mongoose, { Schema } from "mongoose";

const userSchema=new Schema({
    full_name:String,
    email:String,
    password:String,
    todos:Array
});

export default mongoose.model("User",userSchema);