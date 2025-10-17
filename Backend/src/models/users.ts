import User from "../database/users.js";

const userModel = {
    checkUserExist: async (userEmail: string) => {
        const result = await User.find({ email: userEmail });
        return result.length ? true : false;
    },
    registerUser: async (userData: { full_name: string, email: string, password: string }) => {
        const result = await User.create(userData);
        return result;
    },
    loginUser: async (userData: { email: string, password: string }) => {
        const [result] = await User.find({ email: userData.email });
        if (result.password === userData.password) {
            return {
                id: result._id,
                full_name: result.full_name
            };
        }
        return false;
    }
}
export default userModel;