import User from "../models/user.model.js";
import bcrypt from 'bcrypt';


export const findUserByUsernameAndPassword = async (username, password) => {
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return null; // Pengguna tidak ditemukan
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return null; // Kata sandi tidak cocok
        }
        return user;
    } catch (error) {
        throw new Error(`Error finding user: ${error.message}`);
    }
};