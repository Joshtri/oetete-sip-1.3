/* eslint-disable no-useless-catch */

import * as KeluarRepository from "../repositories/keluar.repository.js";


export const getAllKeluar = async(page = 1, limit = 10)=>{
    try {
        const offset = (page - 1) * limit;
        const keluarData = await KeluarRepository.getAllKeluar(offset,limit);
        const totalDocuments = await KeluarRepository.getTotalKeluar();

        if(getAllKeluar.length === 0) console.log('Data EMPTY');
        return {
            data: keluarData,
            total: totalDocuments,
            page,
            pages: Math.ceil(totalDocuments / limit)
        };
    } catch (error) {
        throw error;
    }
};


export const createKeluar = async(keluarData)=>{
    try {
        const createKeluar = await KeluarRepository.createKeluar(keluarData);
        return createKeluar;
    } catch (error) {
        throw error;
    }
};



// Fungsi untuk menghapus data keluarga berdasarkan id
export const deleteKeluar = async (id_keluar) => {
    try {
        const result = await KeluarRepository.deleteKeluar(id_keluar);
        return result;
    } catch (error) {
        throw error;
    }
};

// Function to check if a nama_wargaId exists in the Warga table
export const checkKeluarWargaIdExists = async (nama_wargaId) => {
    try {
        const warga = await KeluarRepository.checkWargaIdExists(nama_wargaId);
        return warga; // Return true if warga is found, otherwise false
    } catch (error) {
        throw error;
    }
};



export const updateStatusWargaToKeluar = async (id_warga) => {
    try {
        const result = await KeluarRepository.updateStatusWargaToKeluar(id_warga);
        return result;
    } catch (error) {
        throw error;
    }
};