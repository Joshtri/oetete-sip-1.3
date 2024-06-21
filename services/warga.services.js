/* eslint-disable no-useless-catch */
import * as WargaRepository from '../repositories/warga.repository.js';



export const getAllWarga = async (page = 1, limit = 10)=>{
    try {
        const offset = (page - 1) * limit;
        const getAllWarga = await WargaRepository.getAllWarga(offset, limit);
        const totalDocuments = await WargaRepository.getTotalWarga();

        if(getAllWarga.length === 0) console.log('DATA WARGA IS EMPTY');

        return {
            data: getAllWarga,
            page,
            total: totalDocuments,
            pages: Math.ceil(totalDocuments / limit)
        };
    } catch (error) {
        throw error;
    }
};


export const createWarga = async(keluargaData)=>{
    try {
        const newWarga = await WargaRepository.createWarga(keluargaData);
        return newWarga; 
    } catch (error) {
        throw error;
    }
};


// Fungsi untuk memeriksa apakah nomor kartu keluarga ada dalam tabel Warga
export const checkNomorKartuKeluargaInWarga = async (nomorKartuKeluarga) => {
    try {
        const warga = await WargaRepository.findWargaByNomorKartuKeluarga(nomorKartuKeluarga);
        return !!warga; // Return true jika data ditemukan, dan false jika tidak ditemukan
    } catch (error) {
        throw error;
    }
};

export const deleteWarga = async(id_warga)=>{
    try {
        const deleteWarga = await WargaRepository.deleteWarga(id_warga);
        return deleteWarga;
    } catch (error) {
        throw error;
    }
};


// export const getWargaById = async(id_warga)=>{
//     try {
        
//     } catch (error) {
//         throw error;
//     }
// };


export const getWargaById = async (id_warga) => {
  try {
    const wargaDetail = await WargaRepository.getWargaById(id_warga);
    return wargaDetail;
  } catch (error) {
    throw error;
  }
};

export const getAll = async () => {
    try {
      const keluargaData = await WargaRepository.getAll();
      return keluargaData;
    } catch (error) {
      throw error;
    }
};


// Service untuk mendapatkan nama_warga berdasarkan keluargaId
export const getWargaByKeluargaId = async (keluargaId) => {
    try {
        const wargaList = await WargaRepository.getWargaByKeluargaId(keluargaId);
        return wargaList;
    } catch (error) {
        throw error;
    }
};


// Function to check if a nama_wargaId exists in the Warga table
export const checkWargaIdExists = async (nama_wargaId) => {
    try {
        const warga = await Warga.findByPk(nama_wargaId);
        return !!warga; // Return true if warga is found, otherwise false
    } catch (error) {
        throw error;
    }
};



export const modifyWarga = async (id_warga, updateData) => {
    try {
      const updatedWarga = await WargaRepository.updateWarga(id_warga, updateData);
      if (!updatedWarga) {
        throw new Error('Warga not found');
      }
      return updatedWarga;
    } catch (error) {
      throw new Error(`Error while updating warga: ${error.message}`);
    }
};


// Service untuk mengecek apakah nama ada di tabel Warga
export const checkNamaExists = async (nama) => {
    try {
        return await WargaRepository.checkWargaExists(nama);
    } catch (error) {
        throw error;
    }
};