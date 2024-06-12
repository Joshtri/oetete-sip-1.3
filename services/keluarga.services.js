/* eslint-disable no-useless-catch */
// services/keluarga.service.js

import * as KeluargaRepository from "../repositories/keluarga.repository.js";

export const createKeluarga = async (keluargaData) => {
  try {
    const newKeluarga = await KeluargaRepository.createKeluarga(keluargaData);
    return newKeluarga;
  } catch (error) {
    throw error;
  }
};


export const getAllKeluarga = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const keluargaData = await KeluargaRepository.getAllKeluarga(offset, limit);
    const totalDocuments = await KeluargaRepository.getTotalKeluarga();
    return {
      data: keluargaData,
      total: totalDocuments,
      page,
      pages: Math.ceil(totalDocuments / limit)
    };
  } catch (error) {
    throw error;
  }
};

export const getAll = async () => {
  try {
    const keluargaData = await KeluargaRepository.getAll();
    return keluargaData;
  } catch (error) {
    throw error;
  }
};


// You can add more service functions here as needed
export const getKeluargaById = async (id_keluarga) => {
  try {
    const keluargaDetail = await KeluargaRepository.getKeluargaById(id_keluarga);
    return keluargaDetail;
  } catch (error) {
    throw error;
  }
};


// Fungsi untuk menghapus data keluarga berdasarkan id
export const deleteKeluarga = async (id_keluarga) => {
  try {
      const result = await KeluargaRepository.deleteKeluarga(id_keluarga);
      return result;
  } catch (error) {
      throw error;
  }
};


export const modifyKeluarga = async (id_keluarga, updateData) => {
  try {
    const updatedKeluarga = await KeluargaRepository.updateKeluarga(id_keluarga, updateData);
    if (!updatedKeluarga) {
      throw new Error('Keluarga not found');
    }
    return updatedKeluarga;
  } catch (error) {
    throw new Error(`Error while updating keluarga: ${error.message}`);
  }
};