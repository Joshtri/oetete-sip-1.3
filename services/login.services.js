// import bcrypt from 'bcrypt';
import { findUserByUsernameAndPassword } from "../repositories/user.repository.js";

export const login = async (username, password) => {
    try {
        const user = await findUserByUsernameAndPassword(username, password);
        if (!user) {
            throw new Error("Invalid username or password");
        }
        // Lakukan logika lain jika login berhasil
        return user;
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
};