import { getTotalWarga } from "../repositories/warga.repository.js";
import { getTotalKeluarga } from "../repositories/keluarga.repository.js";
import { getTotalKelahiran } from "../repositories/kelahiran.repository.js";
import { getTotalKematian } from "../repositories/kematian.repository.js";
import { getTotalKeluar } from "../repositories/keluar.repository.js";


export const dashboardPage = async(req,res)=>{

    const totalWarga = await getTotalWarga();
    const totalKeluarga= await getTotalKeluarga();
    const totalKelahiran= await getTotalKelahiran();
    const totalKematian = await getTotalKematian();
    const totalKeluar = await getTotalKeluar();

    const user = req.session.user;


    const title = "Dashboard";
    res.render('dashboard',{
        user,
        title,
        totalWarga,
        totalKeluarga,
        totalKelahiran,
        totalKematian,
        totalKeluar
    });
    // console.log(totalWarga, totalKeluarga, totalKelahiran);
};

export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out.' });
        }
        res.redirect('/');
    });
};


export const informasiAkunPage = (req,res)=>{
    const title = "Informasi Akun";
    try {
        const user = req.session.user;

        console.log(user);

        res.render('informasi_akun',{
            title,
            user
        });
    } catch (error) {
        console.log(error);
    }
};