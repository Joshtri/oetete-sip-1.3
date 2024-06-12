import { DataTypes } from "sequelize";
import Warga from '../models/warga.model.js';
import Keluarga from "../models/keluarga.model.js";
import db from "../config/dbConfig.js";

const Keluar = db.define('Keluar',{
    
    id_keluar:{
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

    tanggal_keluar:{
        type: DataTypes.DATE,
        allowNull : false
    },

    alasan_keluar:{
        type: DataTypes.STRING(50),
        allowNull : false
    },
});



// Define associations within this filers
Keluar.belongsTo(Keluarga, {
    foreignKey: 'nama_kepala_keluargaId',
    as: 'keluarga'
});

Keluar.belongsTo(Warga, {
    foreignKey: 'nama_wargaId',
    as: 'warga'
});



export default Keluar;