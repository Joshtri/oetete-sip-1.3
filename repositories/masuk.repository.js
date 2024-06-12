/* eslint-disable no-useless-catch */

import Masuk from "../models/masuk.model.js";

export const getAllMasuk = async ()=>{
    try {
        const getAllMasuk = await Masuk.findAll();
        return getAllMasuk;
    } catch (error) {
        throw error;
    }
};

export const createMasuk = async(masukData)=>{
    try {
        const createMasuk = await Masuk.create(masukData);
        return createMasuk;
    } catch (error) {
     throw error;   
    }
};



// Fungsi untuk menghapus data Masuk berdasarkan id
export const deleteMasuk = async (id_masuk) => {
    try {
        const result = await Masuk.destroy({ where: { id_masuk } });
        return result;
    } catch (error) {
        throw error;
    }
};
