import { DataTypes } from "sequelize";
import db from "../config/dbConfig.js";
import Warga from '../models/warga.model.js';
import Keluarga from "../models/keluarga.model.js";


const Masuk = db.define('Masuk',{
    id_masuk:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull:false
    },
    nama_kepala_keluargaId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Keluarga,
            key: 'id_keluarga'
        }
    },

    nama_wargaId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Warga,
            key: 'id_warga'
        }
    },

    tanggal_masuk:{
        type: DataTypes.DATE,
        allowNull : false
    },

    alamat_sebelumnya:{
        type: DataTypes.STRING(50),
        allowNull : false
    },
});

// Define associations within this file
Masuk.belongsTo(Keluarga, {
    foreignKey: 'nama_kepala_keluargaId',
    as: 'keluarga'
});

Masuk.belongsTo(Warga, {
foreignKey: 'nama_wargaId',
    as: 'warga'
});



export default Masuk;