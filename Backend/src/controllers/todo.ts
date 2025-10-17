import { check, validationResult } from "express-validator";
import todoModel from "../models/todo.js";
import { Request, Response } from "express";

const todoController = {
    // POST route to fetch data
    getTodo: async (req: Request, res: Response) => {
        try {
            const data = await todoModel.retrieveTasks(req.body.id);
            res.send({ status: "successfull", data: data });
        } catch (error: any) {
            console.log(error.message);
            res.send({ status: "failure", message: error.message });
        }
    },

    // POST route to send data
    createTodo: async (req: Request, res: Response) => {
        try {
            await check("task").isLength({ min: 4 }).withMessage("Task should contain more than 4 characters").run(req);
            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.send({ status: "failed", errors: result.array() });
            }
            const id = await todoModel.createTask(req.body);
            res.send({ status: "success", id: id });
        } catch (error: any) {
            console.log(error.message);
            res.send({ status: "failed", message: error.message });
        }
    },

    // PUT route to update data
    updateTodo: async (req: Request, res: Response) => {
        try {
            await todoModel.markDone(req.body.id, req.body.index);
            res.send({ status: "success" });
        } catch (error: any) {
            console.log(error.message)
            res.send({ status: "failed", message: error.message });
        }
    },

    // DELETE route to delete data
    deleteTodo: async (req: Request, res: Response) => {
        try {
            const result = await todoModel.deleteTask(req.body.id, req.body.index);
            res.send({ status: "successfull", result: result });
        } catch (error: any) {
            console.log(error.message);
            res.send({ status: "failed", message: error.message })
        }
    }
}

export default todoController;