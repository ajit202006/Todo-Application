import userModel from "../models/users.js"

const userController = {
    register: async (req, res) => {
        try {
            const userExist = await userModel.checkUserExist(req.body.email);
            if (userExist) {
                res.send({ status: "Failed", message: "User already exist." })
            } else {
                const data = await userModel.registerUser(req.body);
                res.send({ status: "Success", data: data });
            }
        } catch (error) {
            console.log(error.message);
            res.send("Something went wrong.");
        }
    },
    login: async (req, res) => {
        try {
            const userExist = await userModel.checkUserExist(req.body.email);
            if (!userExist) {
                res.send({ status: "Failed", message: "User not found.", advice: "Try 'Register Now' to create an account." })
            } else {
                const userLogin = await userModel.loginUser(req.body);
                if (userLogin) {
                    res.send({ status: "Success", data: userLogin })
                } else {
                    res.send({ status: "Failed", message: "Incorrect password.", advice: "Try 'Forget Password' to reset your password." })
                }
            }
        } catch (error) {
            console.log(error);
            res.send("Something went wrong.");
        }
    }
}

export default userController;
