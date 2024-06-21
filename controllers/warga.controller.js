/* eslint-disable no-useless-catch */
import * as WargaService from '../services/warga.services.js';
import * as KeluargaService from '../services/keluarga.services.js';
import * as KelahiranService from '../services/kelahiran.services.js';


export const wargaPage = async (req,res)=>{
    const title = "Data Warga";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        // const wargaData = await WargaService.getAll;
        const { data: wargaData, total, page: currentPage, pages: totalPages } = await WargaService.getAllWarga(page,limit);
        
  
        
        // Check if namaWargaId exists in Warga table and if status_warga is "hidup"
        for (const warga of wargaData) {
            const namaWargaExists = await WargaService.checkNamaExists(warga.nama_warga);
            warga.namaWargaIdExists = namaWargaExists; // Add a property to indicate if namaWargaId exists in Warga table with status "hidup"

            // Log the result to the console
            console.log(`Name check for "${warga.nama_warga}":`, namaWargaExists);
        }

        // If you need to get details of a specific warga by ID, you can do it here
        const wargaId = req.query.id; // Assuming ID is passed as a query parameter
        let wargaDetails = null;
        if (wargaId) {
            wargaDetails = await WargaService.getWargaById(wargaId);
        }

        const messageCreateSuccess = await req.flash('messageCreateSuccess');
        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');
        const messageUpdateSuccess = await req.flash('messageUpdateSuccess');
        // const messageCreateSuccessMasuk = await req.flash('messageCreateSuccess');
        
    
        res.render('data_warga',{
            title,
            wargaData,
            currentPage,
            totalPages,
            totalItems: total,
            limit,
            messageDeleteSuccess,
            messageCreateSuccess,
            messageUpdateSuccess,
            // messageCreateSuccessMasuk,
            wargaDetails
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

        
        await req.flash('messageCreateSuccess',`Tambah data dari warga ${newWarga.nama_warga} berhasil ditambahkan.`);
        res.redirect('/adm/data/warga');
        // return newWarga;
    } catch (error) {
        throw error;
    }

};


//tambah data warga dari keluarga.
export const addWargaPage = async(req,res)=>{
    try {
        const title = "Tambah Data Warga";
        const keluargaData = await KeluargaService.getAll();
        //id
        const id_keluarga = req.params.id;
        const id_kelahiran = req.params.id;

        const kepalaKeluargaData  = await KeluargaService.getKeluargaById(id_keluarga);
        const namakelahiranData = await KelahiranService.getKelahiranById(id_kelahiran);

        res.render('add_warga',{
            title,
            keluargaData,
            kepalaKeluargaData,
            namakelahiranData

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
          await req.flash('messageDeleteSuccess', 'Data Warga Berhasil Dihapus');
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

        const keluargaData = await KeluargaService.getAll();

        const wargaEdit = await WargaService.getWargaById(id_warga);
        res.render('edit_warga', { 
            wargaEdit,
            title,
            keluargaData
        }); // Mengirim data keluargaDetail ke view
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Controller untuk memperbarui data kelahiran berdasarkan id
export const updateWarga = async (req, res) => {
    const { id_warga } = req.params;
    const updateData = req.body;
  
    try {
      const updatedKelahiran = await WargaService.modifyWarga(id_warga, updateData);
      // res.status(200).json(updatedKeluarga);
  
      await req.flash('messageUpdateSuccess', 'Data Warga berhasil di Update');
      res.redirect('/adm/data/warga');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};



export const getWargaToMasuk = async(req,res)=>{
    try {
        const id_warga = req.params.id;
        const title = "Edit Warga";

        // const keluargaData = await KeluargaService.getAll();

        const wargaAdd = await WargaService.getWargaById(id_warga);
        res.render('add_warga_to_masuk', { 
            wargaAdd,
            title,
            // keluargaData
        }); // Mengirim data keluargaDetail ke view
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};