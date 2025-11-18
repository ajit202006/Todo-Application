import dotenv from "dotenv";
import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import todoRouter from "./routers/todo";
import userRouter from "./routers/users";

dotenv.config({path:'src/.env'});

const app=express();

const corsOptions = {
    origin: [process.env.CLIENT_BASE_URL || 'http://localhost:5173'],
    methods: 'GET,PUT,POST,DELETE',
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/todos',todoRouter);
app.use('/users',userRouter);

mongoose.connect(process.env.CONNECTION_STRING || '').then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server Connected");
    });
});
