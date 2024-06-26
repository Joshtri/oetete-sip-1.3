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

        // Login gagal, berikan pesan error
        await req.flash('messageProtect', 'Username atau password salah.');
        res.redirect('/');
        console.log(error);
        // res.status(401).json({ message: "Login failed", error: error.message });
    }
};


export const loginPage = async(req,res)=>{
    const title = "Login";

    try {

        const messageProtect = await req.flash('messageProtect');

        res.render('index',{
            title,
            messageProtect
        });
    } catch (error) {
        throw error;
    }

};