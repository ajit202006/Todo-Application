import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// import cors from "cors";
import todoRouter from "./routers/todo.js";
import userRouter from "./routers/users.js";

const app=express();

dotenv.config({path:'src/.env'});
// app.use(cors(process.env.CLIENT_URL));
app.use(express.json());

app.use('/todos',todoRouter);
app.use('/users',userRouter);

await mongoose.connect(process.env.CONNECTION_STRING || '');

app.listen(process.env.PORT,()=>{
    console.log("Server Connected");
});