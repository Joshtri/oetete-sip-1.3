/* eslint-disable no-useless-catch */
import * as KematianService from '../services/kematian.services.js';
import * as WargaService from '../services/warga.services.js';

export const kematianPage = async(req,res)=>{
    const title = "Data Kematian";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        // const kematianData = await KematianService.getAllKematian()
        const { data: kematianData, total, page: currentPage, pages: totalPages } = await KematianService.getAllKematian(page, limit);

        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');

        
        // Check if nama_wargaId exists in Warga table and if status_warga is "hidup"
        for (const kematian of kematianData) {
            const namaWargaIdExists = await KematianService.checkKematianWargaIdExists(kematian.namaWargaId );
            kematian.namaWargaIdExists = namaWargaIdExists; // Add a property to indicate if nama_wargaId exists in Warga table with status "hidup"
        }


        res.render('data_kematian',{
            title,
            kematianData,
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


export const addKematianPage = async(req,res)=>{
    try {
        const title = "Tambah Data Kematian";
        const wargaData = await WargaService.getAll();

        res.render('add_kematian',{
            title,
            wargaData
        });
    } catch (error) {
        throw error;
    }
};


export const createKematian = async (req,res)=>{
    try {
        const kematianData = req.body;
        const newKematian = await KematianService.createKematian(kematianData);
        res.redirect('/adm/data/kematian');
    } catch (error) {
        throw error;
    }
};


export const deleteKematian = async (req, res) => {
    const id_kematian = req.body.id_kematian;
  
    try {
        const result = await KematianService.deleteKematian(id_kematian);
        if (result) {
          await req.flash('messageDeleteSuccess', 'Data Berhasil Dihapus');
          res.redirect('/adm/data/kematian');
  
        } else {
            res.status(404).send({ message: "Kematian tidak ditemukan" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


export const getKematianById = async (req, res) => {
    try {
        const id_kematian = req.params.id;
        const title = "Detail Kematian";
        const kematianDetail = await KematianService.getKematianById(id_kematian);
        res.render('detail_kematian', { kematianDetail, title }); // Mengirim data keluargaDetail ke view
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateStatusWargaToMeninggalController = async (req, res) => {
    const { id_warga } = req.body;
    try {
        const result = await KematianService.updateStatusWargaToMeninggal(id_warga);
        if (result[0] === 0) {
            return res.status(404).json({ message: 'Warga not found' });
        }
        res.status(200).json({ message: 'Status warga updated to meninggal successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update status warga', error: error.message });
    }
};

export const getKematianByIdEdit = async (req, res) => {
    try {
        const id_kematian = req.params.id;
        const title = "Edit Kematian";
        const kematianEdit = await KematianService.getKematianById(id_kematian);
        res.render('edit_kematian', { kematianEdit, title }); // Mengirim data keluargaDetail ke view
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};