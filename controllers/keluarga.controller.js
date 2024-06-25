/* eslint-disable no-useless-catch */
// controllers/keluarga.controller.js

import * as KeluargaService from "../services/keluarga.services.js";
import * as WargaService from "../services/warga.services.js";

export const createKeluargaController = async (req, res) => {
  try {
    const keluargaData = req.body;
    const newKeluarga = await KeluargaService.createKeluarga(keluargaData);
    // res.status(201).json(newKeluarga);
    await req.flash('messageCreateSuccess', `Data Keluarga dari Kepala Keluarga ${newKeluarga.nama_kepala_keluarga} berhasil dibuat`);

    res.redirect('/adm/data/kartu_keluarga');
  } catch (error) {
    res.status(500).json({ message: "Failed to create Keluarga", error: error.message });
  }
};

// You can add more controller functions here as needed

export const keluargaPage = async (req, res) => {
  const title = "Data Keluarga";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
      const { data: keluargaData, total, page: currentPage, pages: totalPages } = await KeluargaService.getAllKeluarga(page, limit);
      
      // Loop through keluargaData to check if nomor_kartu_keluarga exists in Warga table
      for (const keluarga of keluargaData) {
          const nomorKartuKeluargaExist = await WargaService.checkNomorKartuKeluargaInWarga(keluarga.nomor_kartu_keluarga);
          keluarga.nomorKartuKeluargaExist = nomorKartuKeluargaExist; // Add a property to keluargaData indicating whether nomor kartu keluarga exists in Warga table
          
          // Log the result of the check to the console
          // console.log(`Nomor Kartu Keluarga ${keluarga.nomor_kartu_keluarga} ${nomorKartuKeluargaExist ? 'exists' : 'does not exist'} in Warga table`);
      }

      const messageCreateSuccess = await req.flash('messageCreateSuccess');
      const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
      const messageUpdateSuccess = await req.flash('messageUpdateSuccess');
      const messageDeleteError = await req.flash('messageDeleteError');

      res.render('data_keluarga', {
          title,
          keluargaData,
          currentPage,
          totalPages,
          totalItems: total,
          messageCreateSuccess,
          messageDeleteSuccess,
          messageUpdateSuccess,
          limit,
          messageDeleteError
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
};


export const deleteKeluarga = async (req, res) => {
  const id_keluarga = req.body.id_keluarga;

  try {
      const result = await KeluargaService.deleteKeluarga(id_keluarga);
      if (result) {
        await req.flash('messageDeleteSuccess', 'Data Berhasil Dihapus');
        res.redirect('/adm/data/kartu_keluarga');

      } else {
          res.status(404).send({ message: "Keluarga tidak ditemukan" });
      }
  } catch (error) {
      console.error(error);
      await req.flash('messageDeleteError', 'Tidak dapat menghapus data karena ada data yang berelasi.');

      res.redirect('/adm/data/kartu_keluarga');
      // res.status(500).send("Internal Server Error");
  }
};


export const getKeluargaById = async (req, res) => {
  try {
      const id_keluarga = req.params.id;
      const title = "Detail Keluarga";
      const keluargaDetail = await KeluargaService.getKeluargaById(id_keluarga);
      res.render('detail_keluarga', { keluargaDetail, title }); // Mengirim data keluargaDetail ke view
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Misalkan Anda memiliki sebuah fungsi untuk memeriksa apakah nomor kartu keluarga ada di tabel warga
// Anda dapat menggunakan fungsi ini sebelum mengirimkan data ke tampilan

// export const getAllKeluargaWithWargaInfo = async () => {
//   try {
//       const keluargaData = await Keluarga.findAll();

//       // Misalkan Anda memiliki sebuah fungsi untuk memeriksa apakah nomor kartu keluarga ada di tabel warga
//       const keluargaWithWargaInfo = await Promise.all(keluargaData.map(async (keluarga) => {
//           const isNomorKartuKeluargaExist = await checkNomorKartuKeluargaInWarga(keluarga.nomor_kartu_keluarga);
//           return { ...keluarga, isNomorKartuKeluargaExist };
//       }));

//       return keluargaWithWargaInfo;
//   } catch (error) {
//       throw error;
//   }
// };


export const getKeluargaByIdEdit = async (req, res) => {
  try {
      const id_keluarga = req.params.id;
      const title = "Edit Keluarga";
      const keluargaEdit = await KeluargaService.getKeluargaById(id_keluarga);
      res.render('edit_keluarga', { keluargaEdit, title }); // Mengirim data keluargaDetail ke view
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Controller untuk memperbarui data keluarga berdasarkan id
export const updateKeluarga = async (req, res) => {
  const { id_keluarga } = req.params;
  const updateData = req.body;

  try {
    const updatedKeluarga = await KeluargaService.modifyKeluarga(id_keluarga, updateData);
    // res.status(200).json(updatedKeluarga);

    await req.flash('messageUpdateSuccess','Data Keluarga Diupdate');
    res.redirect('/adm/data/kartu_keluarga');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


