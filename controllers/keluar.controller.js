/* eslint-disable no-useless-catch */
import * as KeluarService from '../services/keluar.services.js';
import * as KeluargaService from '../services/keluarga.services.js';
import * as WargaService from '../services/warga.services.js';




// Controller function to display Keluar data with pagination
export const keluarPage = async (req, res) => {
    const title = "Data Keluar";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const keluargaData = await KeluargaService.getAll();
        const wargaData = await WargaService.getAll();
        const { data: keluarData, total, page: currentPage, pages: totalPages } = await KeluarService.getAllKeluar(page, limit);
        const messageDeleteSuccess = await req.flash('messageDeleteSuccess');

        // Check if nama_wargaId exists in Warga table and if status_warga is "hidup"
        for (const keluar of keluarData) {
            const namaWargaIdExists = await KeluarService.checkKeluarWargaIdExists(keluar.nama_wargaId);
            keluar.namaWargaIdExists = namaWargaIdExists; // Add a property to indicate if nama_wargaId exists in Warga table with status "hidup"
        }

        const messageCreate = await req.flash('MessageCreate');

        res.render('data_keluar', {
            title,
            keluarData,
            keluargaData,
            wargaData,
            currentPage,
            totalPages,
            totalItems: total,
            messageCreate,
            messageDeleteSuccess,
            limit
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteKeluar = async (req, res) => {
    const id_keluar = req.body.id_keluar;
  
    try {
        const result = await KeluarService.deleteKeluar(id_keluar);
        if (result) {
          await req.flash('messageDeleteSuccess', 'Data Berhasil Dihapus');
          res.redirect('/adm/data/keluar');
  
        } else {
            res.status(404).send({ message: "Keluar tidak ditemukan" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
  

export const createKeluar = async (req,res)=>{
    try {
        const keluarData = req.body;
        const newKeluar = await KeluarService.createKeluar(keluarData);
        
        res.redirect('/adm/data/keluar');
    } catch (error) {
        throw error;
    }
};


// Controller function to handle the request and response
// export const checkKeluarWargaIdExists = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const exists = await KeluarService.checkKeluarWargaIdExists(id);
//         if (exists) {
//             res.status(200).send(`Warga with ID ${id} exists in the Warga table.`);
//         } else {
//             res.status(404).send(`Warga with ID ${id} does not exist in the Warga table.`);
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };


export const updateStatusWargaToKeluarController = async (req, res) => {
    const { id_warga } = req.body;
    try {
        const result = await KeluarService.updateStatusWargaToKeluar(id_warga);
        if (result[0] === 0) {
            return res.status(404).json({ message: 'Warga not found' });
        }
        res.status(200).json({ message: 'Status warga updated to keluar successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update status warga', error: error.message });
    }
};

// export const getKeluarByIdEdit = async (req, res) => {
//     try {
//         const id_kematian = req.params.id;
//         const title = "Edit Kematian";
//         const kematianEdit = await KematianService.getKematianById(id_kematian);
//         res.render('edit_kematian', { kematianEdit, title }); // Mengirim data keluargaDetail ke view
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };