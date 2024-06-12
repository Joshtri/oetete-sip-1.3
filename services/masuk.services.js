/* eslint-disable no-useless-catch */

import * as MasukRepository from "../repositories/masuk.repository.js";




export const getAllMasuk = async()=>{
    try {
        const getAllMasuk = await MasukRepository.getAllMasuk();

        if(getAllMasuk.length === 0) console.log('Data EMPTY');
        return getAllMasuk;
    } catch (error) {
        throw error;
    }
};


export const createMasuk = async(masukData)=>{
    try {
        const createMasuk = await MasukRepository.createMasuk(masukData);
        return createMasuk;
    } catch (error) {
        throw error;
    }
};


// Fungsi untuk menghapus data keluarga berdasarkan id
export const deleteMasuk = async (id_masuk) => {
    try {
        const result = await MasukRepository.deleteMasuk(id_masuk);
        return result;
    } catch (error) {
        throw error;
    }
  };



