/* eslint-disable no-useless-catch */
import * as MasukService from '../services/masuk.services.js';
import * as KeluargaService from '../services/keluarga.services.js';




export const MasukPage = async(req,res)=>{
    try {
        const title = "Data Masuk";
        const masukData = await MasukService.getAllMasuk();
        const keluargaData = await KeluargaService.getAll();


        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');

        res.render('data_masuk',{
            title,
            masukData,
            keluargaData,
            messageDeleteSuccess
        });
    } catch (error) {
        throw error;
    }
};


export const deleteMasuk = async (req, res) => {
    const id_masuk = req.body.id_masuk;
  
    try {
        const result = await MasukService.deleteMasuk(id_masuk);
        if (result) {
          await req.flash('messageDeleteSuccess', 'Data Berhasil Dihapus');
          res.redirect('/adm/data/masuk');
  
        } else {
            res.status(404).send({ message: "Masuk tidak ditemukan" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


export const createMasuk = async (req,res)=>{
    try {
        const masukData = req.body;
        const newKeluarga = await MasukService.createMasuk(masukData);
        // res.status(201).json(newKeluarga);
        await req.flash('messageCreateSuccess', `Data warga telah berhasil ditambah ke daftar masuk.`);
    
        res.redirect('/adm/data/warga');
      } catch (error) {
        res.status(500).json({ message: "Failed to create Masuk", error: error.message });
      }
};


