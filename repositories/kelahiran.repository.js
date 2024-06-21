/* eslint-disable no-useless-catch */

import Kelahiran from "../models/kelahiran.model.js";
import Keluarga from "../models/keluarga.model.js";
import Warga from "../models/warga.model.js";


export const getAllKelahiran = async(offset, limit)=>{
    try {
        const getAllKelahiran = await Kelahiran.findAll({
            include: {
                model: Keluarga,
                attributes: ['nama_kepala_keluarga'] // Specify the columns you want to include from the Keluarga table
            },
            offset: offset,
            limit: limit 
        });
        return getAllKelahiran;
    } catch (error) {
        throw error;
    }
};


export const createKelahiran = async (kelahiranData)=>{
    try {
        const createKelahiran = await Kelahiran.create(kelahiranData);
        return createKelahiran;
    } catch (error) {
        throw error;
    }
};



// Fungsi untuk mendapatkan total data Kelahiran
export const getTotalKelahiran = async () => {
    try {
        const totalKelahiran = await Kelahiran.count();
        return totalKelahiran;
    } catch (error) {
        throw error;
    }
};


// Fungsi untuk menghapus data kelahiran berdasarkan id
export const deleteKelahiran = async (id_kelahiran) => {
    try {
        const result = await Kelahiran.destroy({ where: { id_kelahiran } });
        return result;
    } catch (error) {
        throw error;
    }
};


// Fungsi untuk mendapatkan detail keluarga berdasarkan id_keluarga
export const getKelahiranById = async (id_kelahiran) => {
    try {
        const kelahiranDetail = await Kelahiran.findByPk(id_kelahiran,{
            include: {
                model: Keluarga,
                attributes: ['nama_kepala_keluarga']
            }
        });
        return kelahiranDetail;
    } catch (error) {
        throw error;
    }
};

// Function to check if a nama_wargaId exists in the Warga table
export const checkWargaIdExists = async (nama ) => {
    try {
        const warga = await Warga.findOne({
            where: {
                nama_warga: nama,
                status_warga: 'hidup'
            }
        });
        return !!warga; // Return true if warga is found with status "hidup", otherwise false
    } catch (error) {
        throw error;
    }
};



// Fungsi untuk memperbarui data kelahiran berdasarkan id
export const updateKelahiran = async (id_kelahiran, updateData) => {
    try {
      const [updatedRows] = await Kelahiran.update(updateData, {
        where: { id_kelahiran }
      });
  
      if (updatedRows === 0) {
        return null;
      }
  
      const updatedKelahiran = await Kelahiran.findByPk(id_kelahiran);
      return updatedKelahiran;
    } catch (error) {
      throw error;
    }
};


// Function to check if a nama_wargaId exists in the Warga table
export const checkNamaExistsInWarga = async (nama) => {
    try {
        const warga = await Warga.findOne({
            where: {
                nama_warga: nama,
                // status_warga: 'hidup'
            }
        });
        return !!warga; // Return true if warga is found with status "hidup", otherwise false
    } catch (error) {
        throw error;
    }
};


