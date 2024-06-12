/* eslint-disable no-useless-catch */
import  * as KelahiranService from "../services/kelahiran.services.js";
import * as KeluargaService from '../services/keluarga.services.js';

export const kelahiranPage = async (req, res) => {
    const title = "Data Kelahiran";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
      const keluargaData = await KeluargaService.getAll();
      const { data: kelahiranData, total, page: currentPage, pages: totalPages } = await KelahiranService.getAllKelahiran(page, limit);
  
      const messageDeleteSuccess = await req.flash('messageDeleteSuccess');

      res.render('data_kelahiran', {
        kelahiranData,
        keluargaData,
        title,
        currentPage,
        totalPages,
        totalItems: total,
        limit,
        messageDeleteSuccess
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

export const createKelahiran = async (req,res)=>{
    try {
        const kelahiranData = req.body;
        const newKelahiran = await KelahiranService.createKelahiran(kelahiranData);
        
        
        res.redirect('/adm/data/kelahiran');
    } catch (error) {
        throw error;
    }
};


export const deleteKelahiran = async (req, res) => {
  const id_kelahiran = req.body.id_kelahiran;

  try {
      const result = await KelahiranService.deleteKelahiran(id_kelahiran);
      if (result) {
        await req.flash('messageDeleteSuccess', 'Data Berhasil Dihapus');
        res.redirect('/adm/data/kelahiran');

      } else {
          res.status(404).send({ message: "Kelahiran tidak ditemukan" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
};


export const getKelahiranById = async (req, res) => {
  try {
      const id_kelahiran = req.params.id;
      const title = "Detail Kelahiran";
      const kelahiranDetail = await KelahiranService.getKelahiranById(id_kelahiran);
      res.render('detail_kelahiran', { kelahiranDetail, title }); // Mengirim data keluargaDetail ke view
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


export const getKelahiranByIdEdit = async (req, res) => {
  try {
      const id_kelahiran = req.params.id;
      const title = "Edit Kematian";
      const kelahiranEdit = await KelahiranService.getKelahiranById(id_kelahiran);
      res.render('edit_kelahiran', { kelahiranEdit, title }); // Mengirim data keluargaDetail ke view
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


