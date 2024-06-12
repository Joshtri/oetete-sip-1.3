import { DataTypes } from "sequelize";
import db from "../config/dbConfig.js";

const User = db.define("User", {
    id_user:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull:false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    nama_lengkap: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin'),
        defaultValue: 'admin',
        allowNull: false
    }
}, {
    timestamps: true
});

export default User;
