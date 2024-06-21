/* eslint-disable no-useless-catch */
import  * as KelahiranService from "../services/kelahiran.services.js";
import * as KeluargaService from '../services/keluarga.services.js';

export const kelahiranPage = async (req, res) => {
  const title = "Data Kelahiran";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const namaToCheck = req.query.nama || ''; // Assuming the name to check is passed as a query parameter


  try {
    const keluargaData = await KeluargaService.getAll();
    const { data: kelahiranData, total, page: currentPage, pages: totalPages } = await KelahiranService.getAllKelahiran(page, limit);




    // Check if namaWargaId exists in Warga table and if status_warga is "hidup"
    for (const kelahiran of kelahiranData) {
      const namaWargaIdExists = await KelahiranService.checkNamaExists(kelahiran.nama);
      kelahiran.namaWargaIdExists = namaWargaIdExists; // Add a property to indicate if namaWargaId exists in Warga table with status "hidup"

      // Log the result to the console
      console.log(`Name check for "${kelahiran.namaWargaId}":`, namaWargaIdExists);
    }
    // console.log(`Name check for "${namaToCheck}":`, namaExists);

    const messageCreateSuccess = await req.flash('messageCreateSuccess');
    const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
    const messageUpdateSuccess = await req.flash('messageUpdateSuccess');


    res.render('data_kelahiran', {
      kelahiranData,
      keluargaData,
      title,
      currentPage,
      totalPages,
      totalItems: total,
      limit,
      messageCreateSuccess,
      messageDeleteSuccess,
      messageUpdateSuccess
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
      const title = "Edit Kelahiran";
      const kelahiranEdit = await KelahiranService.getKelahiranById(id_kelahiran);

      const keluargaData = await KeluargaService.getAll();
      res.render('edit_kelahiran', { 
        kelahiranEdit,
        title,
        keluargaData
      }); // Mengirim data keluargaDetail ke view
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Controller untuk memperbarui data kelahiran berdasarkan id
export const updateKelahiran = async (req, res) => {
  const { id_kelahiran } = req.params;
  const updateData = req.body;

  try {
    const updatedKelahiran = await KelahiranService.modifyKelahiran(id_kelahiran, updateData);
    // res.status(200).json(updatedKeluarga);

    await req.flash('messageUpdateSuccess', 'Data kelahiran berhasil di update.');
    res.redirect('/adm/data/kelahiran');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller untuk mengecek apakah nama ada di tabel Warga
export const checkNama = async (req, res) => {
  const { nama } = req.params;

  try {
      const namaExists = await KelahiranService.checkNamaExists(nama);

      if (namaExists) {
          return res.json({ exists: true });
      } else {
          return res.json({ exists: false, showAddButton: true });
      }
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};