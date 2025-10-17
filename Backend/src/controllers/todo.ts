import { check, validationResult } from "express-validator";
import todoModel from "../models/todo.js";

const todoController = {
    // POST route to fetch data
    getTodo: async (req, res) => {
        try {
            const data = await todoModel.retrieveTasks(req.body.id);
            res.send({ status: "successfull", data: data });
        } catch (error) {
            console.log(error.message);
            res.send({ status: "failure", message: error.message });
        }
    },

    // POST route to send data
    createTodo: async (req, res) => {
        await check("task").isLength({ min: 4 }).withMessage("Task should contain more than 4 characters").run(req);
        const result = validationResult(req);
        if (result.errors.length) {
            res.send({ status: "failed", errors: result.errors });
        }
        const id = await todoModel.createTask(req.body);
        res.send({ status: "success", id: id });
    },
    // PUT route to update data
    updateTodo: async (req, res) => {
        try {
            if (req.body.value) {
                const result = await todoModel.updateTask(req.body.id, req.body.task);
                res.send({ status: "success",result:{id:result._id,isDone:result.isDone} });
            } else {
                await todoModel.markDone(req.body);
                res.send({ status: "success"});
            }
        }catch(error){
            console.log(error.message)
            res.send({status:"failed",message:error.message});
        }
       
    },

    // DELETE route to delete data
    deleteTodo: async (req, res) => {
        try {
            const result = await todoModel.deleteTask(req.body);
            res.send({status:"successfull", result:result});
        } catch (error) {
            console.log(error.message);
            res.send({ status: "failed", message: error.message })
        }
    }
}

export default todoController;