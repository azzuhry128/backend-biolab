"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HospitalAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HospitalAccount.init(
    {
      id_hospital: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      hospital_name: { type: DataTypes.STRING, allowNull: false },
      hospital_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hospital_password: { type: DataTypes.STRING, allowNull: false },
      hospital_latitude: { type: DataTypes.STRING, allowNull: false },
      hospital_longitude: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "HospitalAccount", timestamps: true }
  );
  return HospitalAccount;
};
