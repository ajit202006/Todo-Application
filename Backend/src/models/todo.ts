import User from "../database/users.js";

let todoModel = {
    createTask: async (userInfo: { id: string, task: string, isDone: boolean }) => {
        const result = await User.findById(userInfo.id);
        if (result) {
            const newTodos = [...result.todos, { task: userInfo.task, isDone: userInfo.isDone }];
            await result.updateOne({ todos: newTodos })
            return result._id;
        } else {
            throw Error("User not found");
        }
    },

    retrieveTasks: async (userId: string) => {
        const data = await User.findById(userId);
        return data?.todos;
    },

    markDone: async (userId: string, index: number) => {
        const userData = await User.findById(userId);
        if (userData) {
            const newTodos = [...userData.todos];
            newTodos[index].isDone = !(newTodos[index].isDone);
            await userData.updateOne({ todos: newTodos });
        } else {
            throw Error("User not found");
        }
    },

    deleteTask: async (userId: string, index: number) => {
        const userData = await User.findById(userId);
        if (userData) {
            let newTodos = [...userData.todos];
            newTodos.splice(index, 1);
            await userData.updateOne({ todos: newTodos });
            return true;
        } else {
            throw Error("User not found.");
        }
    }
}

export default todoModel;