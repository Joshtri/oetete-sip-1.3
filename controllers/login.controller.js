/* eslint-disable no-useless-catch */
import { login } from "../services/login.services.js";


export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await login(username, password);
        // Jika login berhasil, Anda dapat mengirimkan respons yang sesuai ke klien
        // res.status(200).json({ message: "Login successful", user });
        
        // Simpan informasi pengguna dalam sesi
        req.session.user = user;
        res.redirect('/adm/dashboard');
    } catch (error) {
        res.status(401).json({ message: "Login failed", error: error.message });
    }
};


export const loginPage = async(req,res)=>{

    try {
        const title = "Login";
        res.render('index',{
            title
        });
    } catch (error) {
        throw error;
    }

};