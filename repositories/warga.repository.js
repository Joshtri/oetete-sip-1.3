/* eslint-disable no-empty */
/* eslint-disable no-useless-catch */
import Warga from "../models/warga.model.js";
import Keluarga from "../models/keluarga.model.js";
import Masuk from '../models/masuk.model.js';

// Fungsi untuk menambahkan mahasiswa baru (contoh tambahan)
export const createWarga = async (wargaData) => {

    try {
        const newWarga = await Warga.create(wargaData);
        return newWarga;
    } catch (error) {
        throw error;
    }
};


export const getAllWarga = async (offset, limit) => {
    try {
        const getAllWarga = await Warga.findAll({
            include: {
                model: Keluarga,
                attributes: ['nama_kepala_keluarga'] // Specify the columns you want to include from the Keluarga table
            },
            where:{
                status_warga:"hidup"
            },
            offset,
            limit
        });
        return getAllWarga;
    } catch (error) {
        throw error;
    }
};

// Fungsi untuk mendapatkan total data Warga dengan status hidup
export const getTotalWarga = async () => {
  try {
      const totalWargaHidup = await Warga.count({ where: { status_warga: 'hidup' } });
      return totalWargaHidup;
  } catch (error) {
      throw error;
  }
};


export const findWargaByNomorKartuKeluarga = async (nomorKartuKeluarga) => {
  try {
      const warga = await Warga.findOne({
          include: [{
              model: Keluarga,
              where: { nomor_kartu_keluarga: nomorKartuKeluarga }
          }],
          where: { status_warga: 'hidup' }
      });
      return warga;
  } catch (error) { 
      throw error;
  }
};



export const deleteWarga = async(id_warga)=>{
    try {
        const deleteWarga = await Warga.destroy({where:{
            id_warga
            }
        });

        return deleteWarga;
    } catch (error) {
        throw error;
    }
};


export const getWargaById =  async(id_warga)=>{
    try {
        const wargaDetail = await Warga.findByPk(id_warga,{
            include: {
                model: Keluarga,
                attributes: ['nama_kepala_keluarga']
            }
        });
        return wargaDetail;
    } catch (error) {
        throw error;
    }
};



// Fungsi untuk mendapatkan data keluarga semua
export const getAll = async () => {
    try {
      const wargaData = await Warga.findAll({
        where:{
            status_warga:"hidup"
        }
      });
      return wargaData;
    } catch (error) {
      throw error;
    }
};

export const getWargaByKeluargaId = async (keluargaId) => {
    try {
        const wargaList = await Warga.findAll({
            attributes: ['nama_warga'],
            where: {
                keluargaId: keluargaId
            },
            include: {
                model: Keluarga,
                attributes: ['nama_kepala_keluarga'] // Optional, to include additional data from the Keluarga model
            }
        });
        return wargaList;
    } catch (error) {
        throw error;
    }
};


export const getGenderStatistics = async (_, res) => {
    try {
      const totalPria = await Warga.count({ where: { jenis_kelamin: 'Laki-Laki' } });
      const totalWanita = await Warga.count({ where: { jenis_kelamin: 'Perempuan' } });
  
      res.status(200).json({ pria: totalPria, wanita: totalWanita });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const getPekerjaanStatistics = async (_, res) => {
    try {
      const totalBelumKerja = await Warga.count({ where: { pekerjaan: 'Belum Bekerja' } });
      const totalMengurusRT = await Warga.count({ where: { pekerjaan: 'Mengurus Rumah Tangga' } });
      const totalPelajarMhs = await Warga.count({ where: { pekerjaan: 'Pelajar/Mahasiswa' } });
      const totalPensiunan = await Warga.count({ where: { pekerjaan: 'Pensiunan' } });
      const totalPns = await Warga.count({ where: { pekerjaan: 'PNS' } });
      const totalPolri = await Warga.count({ where: { pekerjaan: 'POLRI' } });
      const totalTni = await Warga.count({ where: { pekerjaan: 'TNI' } });
      const totalWiraswasta = await Warga.count({ where: { pekerjaan: 'Wiraswasta' } });
      const totalSwasta = await Warga.count({ where: { pekerjaan: 'Swasta' } });
      const totalBumn = await Warga.count({ where: { pekerjaan: 'Pegawai BUMN' } });
      const totalKerjaLepas = await Warga.count({ where: { pekerjaan: 'Pekerja Lepas' } });
      const totalPetaniPeternak = await Warga.count({ where: { pekerjaan: 'Petani/Peternak/Pekebun' } });
      const totalNelayan = await Warga.count({ where: { pekerjaan: 'Nelayan' } });
      const totalIndustri = await Warga.count({ where: { pekerjaan: 'Industri' } });
  
      res.json({
        belumKerja: totalBelumKerja,
        mengurusRT: totalMengurusRT,
        pelajarMhs: totalPelajarMhs,
        pensiunan: totalPensiunan,
        pns: totalPns,
        polri: totalPolri,
        tni: totalTni,
        wiraswasta: totalWiraswasta,
        swasta: totalSwasta,
        bumn: totalBumn,
        kerjaLepas: totalKerjaLepas,
        petaniPeternak: totalPetaniPeternak,
        nelayan: totalNelayan,
        industri: totalIndustri
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Controller untuk mendapatkan statistik pendidikan
export const getPendidikanStatistics = async (_, res) => {
    try {
      const pendidikanLevels = [
        'Belum/Tidak Pernah Sekolah', 'Belum/Tidak Tamat SD/SDLB/MI/Paket A', 'SD/SDLB/MI/Paket A',
        'SMP/SMPLB/MTs/Paket B', 'SMA/SMLB/MA/SMK/MAK/paket C', 'DI/DII/DIII', 
        'DIV/S1', 'S2', 'S3'
      ];
  
      const pendidikanStatistics = {};
  
      for (const level of pendidikanLevels) {
        const count = await Warga.count({ where: { pendidikan: level } });
        pendidikanStatistics[level] = count;
      }
  
      res.status(200).json(pendidikanStatistics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


// Controller untuk mendapatkan statistik status perkawinan
export const getStatusPerkawinanStatistics = async (_, res) => {
    try {
      const statusPerkawinanLevels = [
        'Belum Menikah', 'Sudah Menikah', 'Cerai Hidup', 'Cerai Mati'
      ];
  
      const statusPerkawinanStatistics = {};
  
      for (const status of statusPerkawinanLevels) {
        const count = await Warga.count({ where: { status_perkawinan: status } });
        statusPerkawinanStatistics[status] = count;
      }
  
      res.status(200).json(statusPerkawinanStatistics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Fungsi untuk memperbarui data warga berdasarkan id
export const updateWarga = async (id_warga, updateData) => {
    try {
      const [updatedRows] = await Warga.update(updateData, {
        where: { id_warga }
      });
  
      if (updatedRows === 0) {
        return null;
      }
  
      const updatedWarga = await Warga.findByPk(id_warga);
      return updatedWarga;
    } catch (error) {
      throw error;
    }
};


// Function to check if a nama warga exist on table masuk
export const checkWargaExists = async (nama) => {
  try {
      const warga = await Masuk.findOne({
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