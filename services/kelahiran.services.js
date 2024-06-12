/* eslint-disable no-useless-catch */
import * as KelahiranRepository from "../repositories/kelahiran.repository.js";




export const getAllKelahiran = async (page = 1, limit = 10) => {
    try {
      const offset = (page - 1) * limit;
      const kelahiranData = await KelahiranRepository.getAllKelahiran(offset, limit);
      const totalDocuments = await KelahiranRepository.getTotalKelahiran();
  
      if (kelahiranData.length === 0) console.log('Data EMPTY');
  
      return {
        data: kelahiranData,
        total: totalDocuments,
        page,
        pages: Math.ceil(totalDocuments / limit)
      };
    } catch (error) {
      throw error;
    }
};

export const createKelahiran = async(kelahiranData)=>{
    try {
        const newKelahiran = await KelahiranRepository.createKelahiran(kelahiranData);
        return newKelahiran;
    } catch (error) {
        throw error;
    }
};

// Fungsi untuk menghapus data keluarga berdasarkan id
export const deleteKelahiran = async (id_kelahiran) => {
  try {
      const result = await KelahiranRepository.deleteKelahiran(id_kelahiran);
      return result;
  } catch (error) {
      throw error;
  }
};

export const getKelahiranById = async(id_kelahiran)=>{
  try {
    const kelahiranDetail = await KelahiranRepository.getKelahiranById(id_kelahiran);
    return kelahiranDetail;
  } catch (error) {
    throw error;
  }
};