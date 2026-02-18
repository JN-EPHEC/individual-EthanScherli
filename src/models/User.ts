import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../config/database";

class User extends Model {} 

User.init(
    {
        prenom : {
            type : DataTypes.STRING,
            allowNull: false,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type : DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        modelName : 'User',
    },
);

export default User;
