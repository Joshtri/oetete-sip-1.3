/* eslint-disable no-useless-catch */
import Kematian from "../models/kematian.model.js";
import Warga from "../models/warga.model.js";



export const getAllKematian = async (offset, limit)=>{
    try {
        const getAllKematian = await Kematian.findAll({
            include: {
                model: Warga,
                attributes: ['nama_warga'] // Specify the columns you want to include from the Keluarga table
            },
            offset: offset,
            limit: limit
        });
        return getAllKematian;

    } catch (error) {
        throw error;
    }
};

export const createKematian = async(kematianData)=>{
    try {
        const newKematian = await Kematian.create(kematianData);
        return newKematian;
    } catch (error) {
        throw error;
    }
};

export const getTotalKematian = async()=>{
    try {
        const totalKematian = await Kematian.count();
        return totalKematian;
    } catch (error) {
        throw error;
    }
};


// Fungsi untuk menghapus data keluarga berdasarkan id
export const deleteKematian = async (id_kematian) => {
    try {
        const result = await Kematian.destroy({ where: { id_kematian } });
        return result;
    } catch (error) {
        throw error;
    }
};

// Fungsi untuk mendapatkan detail keluarga berdasarkan id_keluarga
export const getKematianById = async (id_kematian) => {
    try {
        const kematianDetail = await Kematian.findByPk(id_kematian,{
            include:{
                model: Warga,
                attributes:['nama_warga']
            }
        });
        return kematianDetail;
    } catch (error) {
        throw error;
    }
};

//fungsi untuk mengubah status warga
export const updateStatusWargaToMeninggal = async (id_warga) => {
    try {
        const updatedWarga = await Warga.update(
            { status_warga: 'meninggal' },
            { where: { id_warga } }
        );
        return updatedWarga;
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



// Fungsi untuk memperbarui data kematian berdasarkan id
export const updateKematian = async (id_kematian, updateData) => {
    try {
      const [updatedRows] = await Kematian.update(updateData, {
        
        where: { id_kematian }
      });
  
      if (updatedRows === 0) {
        return null;
      }
  
      const updatedKematian = await Kematian.findByPk(id_kematian);
      return updatedKematian;
    } catch (error) {
      throw error;
    }
};