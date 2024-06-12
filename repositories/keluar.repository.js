/* eslint-disable no-useless-catch */

import Keluar from "../models/keluar.model.js";
import Keluarga from "../models/keluarga.model.js";
import Warga from "../models/warga.model.js";

export const getAllKeluar = async (offset, limit) => {
    try {
        const getAllKeluar = await Keluar.findAll({
            include: [
                {
                    model: Warga,
                    as: 'warga', // Use the alias defined in the model association
                    attributes: ['nama_warga']
                },
                {
                    model: Keluarga,
                    as: 'keluarga', // Use the alias defined in the model association
                    attributes: ['nama_kepala_keluarga']
                }
            ],
            offset: offset,
            limit: limit
        });
        return getAllKeluar;
    } catch (error) {
        throw error;
    }
};

export const createKeluar = async(keluarData)=>{
    try {
        const createKeluar = await Keluar.create(keluarData);
        return createKeluar;
    } catch (error) {
     throw error;   
    }
};


// Fungsi untuk menghapus data keluar berdasarkan id
export const deleteKeluar = async (id_keluar) => {
    try {
        const result = await Keluar.destroy({ where: { id_keluar } });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getTotalKeluar = async()=>{
    try {
        const getTotalKeluar = await Keluar.count();
        return getTotalKeluar;
    } catch (error) {
        throw error;
    }
};

// Function to check if a nama_wargaId exists in the Warga table
export const checkWargaIdExists = async (nama_wargaId) => {
    try {
        const warga = await Warga.findOne({
            where: {
                id_warga: nama_wargaId,
                status_warga: 'hidup'
            }
        });
        return !!warga; // Return true if warga is found with status "hidup", otherwise false
    } catch (error) {
        throw error;
    }
};

export const findKeluarByWargaId = async (nama_wargaId) => {
    try {
        const warga = await Warga.findOne({
            where: { id_warga: nama_wargaId }
        });
        return warga;
    } catch (error) {
        throw error;
    }
};



//fungsi untuk mengubah status warga
export const updateStatusWargaToKeluar = async (id_warga) => {
    try {
        const updatedWarga = await Warga.update(
            { status_warga: 'keluar' },
            { where: { id_warga } }
        );
        return updatedWarga;
    } catch (error) {
        throw error;
    }
};

