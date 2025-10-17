import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routers/todo";
import userRouter from "./routers/users";

const app=express();

dotenv.config({path:'src/.env'});
app.use(express.json());

app.use('/todos',todoRouter);
app.use('/users',userRouter);

mongoose.connect(process.env.CONNECTION_STRING || '').then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server Connected");
    });
});
