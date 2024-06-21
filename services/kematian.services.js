/* eslint-disable no-useless-catch */
import * as KematianRepository from "../repositories/kematian.repository.js";


export const getAllKematian = async(page = 1, limit = 10)=>{
    try {
        const offset = (page - 1) * limit;
        const getAllKematian = await KematianRepository.getAllKematian(offset,limit);
        const totalDocuments = await KematianRepository.getTotalKematian();
        if(getAllKematian.length === 0) console.log('Data EMPTY');
        return {
            data: getAllKematian,
            total: totalDocuments,
            page,
            pages: Math.ceil(totalDocuments / limit)
        };

    } catch (error) {
        throw error;
    }
};


export const createKematian = async(kematianData)=>{
    try {
        const newKematian = await KematianRepository.createKematian(kematianData);
        return newKematian;
    } catch (error) {
        throw error;
    }
};



// Fungsi untuk menghapus data keluarga berdasarkan id
export const deleteKematian = async (id_kematian) => {
    try {
        const result = await KematianRepository.deleteKematian(id_kematian);
        return result;
    } catch (error) {
        throw error;
    }
};


export const getKematianById = async(id_kematian)=>{
    try {
      const kematianDetail = await KematianRepository.getKematianById(id_kematian);
      return kematianDetail;
    } catch (error) {
      throw error;
    }
};


export const updateStatusWargaToMeninggal = async (id_warga) => {
    try {
        const result = await KematianRepository.updateStatusWargaToMeninggal(id_warga);
        return result;
    } catch (error) {
        throw error;
    }
};


// Function to check if a nama_wargaId exists in the Warga table
export const checkKematianWargaIdExists = async (namaWargaId) => {
    try {
        const warga = await KematianRepository.checkWargaIdExists(namaWargaId);
        return warga; // Return true if warga is found, otherwise false
    } catch (error) {
        throw error;
    }
};


export const modifyKematian = async (id_kematian, updateData) => {
    try {
      const updatedKematian = await KematianRepository.updateKematian(id_kematian, updateData);
      if (!updatedKematian) {
        throw new Error('Kematian not found');
      }
      return updatedKematian;
    } catch (error) {
      throw new Error(`Error while updating kematian: ${error.message}`);
    }
  };