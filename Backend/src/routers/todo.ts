import express from "express";
import todoController from "../controllers/todo.js"

const todoRouter=express.Router();

// GET route to fetch data
todoRouter.post("/fetch",todoController.getTodo)
// POST route to send data
todoRouter.post("/",todoController.createTodo)
// PUT route to update data
todoRouter.put("/",todoController.updateTodo)
// DELETE route to delete data
todoRouter.delete("/",todoController.deleteTodo)

export default todoRouter;