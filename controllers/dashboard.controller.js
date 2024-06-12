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