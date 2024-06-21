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
    nama_kepala_keluarga:{
        type:DataTypes.STRING(60),
        allowNull:false,

    },

    nama_warga:{
        type:DataTypes.STRING(70),
        allowNull:false,

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

// // Define associations within this file
// Masuk.belongsTo(Keluarga, {
//     foreignKey: 'nama_kepala_keluargaId',
//     as: 'keluarga'
// });

// Masuk.belongsTo(Warga, {
// foreignKey: 'nama_wargaId',
//     as: 'warga'
// });



export default Masuk;


// Singkronisasi dengan basis data
(async () => {
    try {
        await db.sync();
        console.log("masuk table has been created.");
    } catch (error) {
        console.error("Unable to create the table:", error);
    }
})();
