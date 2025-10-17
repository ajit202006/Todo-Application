import User from "../database/users.js";

let todoModel = {
    createTask: async (userInfo) => {
        const result = await User.findById(userInfo.id);
        const newTodos = [...result.todos, { task: userInfo.task, isDone: userInfo.isDone }];
        await result.updateOne({ todos: newTodos })
        return result._id;
    },

    retrieveTasks: async (userId) => {
        const data = await User.findById(userId);;
        return data.todos;
    },

    updateTask: async (id, task) => {
        try {
            const current_todo = await User.findById(id);
            await current_todo.updateOne({ isDone: !current_todo.isDone });
        } catch (error) {
            console.log(error);
        }
    },
    markDone: async ({ id: userId, index: index }) => {
        const userData = await User.findById(userId);
        const newTodos= [...userData.todos];
        newTodos[index].isDone=!(newTodos[index].isDone);
        await userData.updateOne({ todos: newTodos });
    },

    deleteTask: async ({ id: userId, index: index }) => {
        const userData = await User.findById(userId);
        let newTodos = [...userData.todos];
        newTodos.splice(index, 1);
        await userData.updateOne({ todos: newTodos });
        return true;
    }
}

export default todoModel;