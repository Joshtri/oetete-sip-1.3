/* eslint-disable no-useless-catch */
import * as WargaService from '../services/warga.services.js';
import * as KeluargaService from '../services/keluarga.services.js';


export const wargaPage = async (req,res)=>{
    const title = "Data Warga";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        // const wargaData = await WargaService.getAll;
        const { data: wargaData, total, page: currentPage, pages: totalPages } = await WargaService.getAllWarga(page,limit);
        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
    
        res.render('data_warga',{
            title,
            wargaData,
            currentPage,
            totalPages,
            totalItems: total,
            limit,
            messageDeleteSuccess
        });
    } catch (error) {
        throw error;
    }

};

export const createWargaController = async (req,res)=>{
    try {
        const wargaData = req.body;
        const newWarga = await WargaService.createWarga(wargaData);
        // res.status(201).json(newWarga);

        
        res.redirect('/adm/data/warga');
        // return newWarga;
    } catch (error) {
        throw error;
    }

};

export const addWargaPage = async(req,res)=>{
    try {
        const title = "Tambah Data Warga";
        const keluargaData = await KeluargaService.getAll();
        const id_keluarga = req.params.id;
        const kepalaKeluargaData  = await KeluargaService.getKeluargaById(id_keluarga);

        res.render('add_warga',{
            title,
            keluargaData,
            kepalaKeluargaData,

        });

        console.log(kepalaKeluargaData);
    } catch (error) {
        throw error;
    }
};



export const deleteWarga = async (req, res) => {
    const id_warga = req.body.id_warga;
  
    try {
        const result = await WargaService.deleteWarga(id_warga);
        if (result) {
          await req.flash('messageDeleteSuccess', 'Data Berhasil Dihapus');
          res.redirect('/adm/data/warga');
  
        } else {
            res.status(404).send({ message: "Warga tidak ditemukan" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
  

export const getWargaById = async (req, res) => {
  try {
      const id_warga = req.params.id;
      const title = "Detail Warga";
      const wargaDetail = await WargaService.getWargaById(id_warga);
      res.render('detail_warga', { wargaDetail, title }); // Mengirim data keluargaDetail ke view
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Controller untuk mendapatkan warga berdasarkan keluargaId
export const getWargaByKeluargaIdController = async (req, res) => {
    const { keluargaId } = req.params;

    try {
        const wargaList = await WargaService.getWargaByKeluargaId(keluargaId);
        // res.status(200).json(wargaList);
        res.render('detail_anggotaKK',{
            wargaList
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching warga by keluargaId', error: error.message });
    }
};


export const getWargaByIdEdit = async (req, res) => {
    try {
        const id_warga = req.params.id;
        const title = "Edit Warga";
        const wargaEdit = await WargaService.getWargaById(id_warga);
        res.render('edit_warga', { wargaEdit, title }); // Mengirim data keluargaDetail ke view
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



