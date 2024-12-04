"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.Hospital, {
        foreignKey: "id_hospital",
        targetKey: "id_hospital",
        as: "hospital_FK",
      });
    }
  }
  Doctor.init(
    {
      id_doctor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      id_hospital: { type: DataTypes.UUID, allowNull: false },
      doctor_name: { type: DataTypes.STRING, allowNull: false },
      doctor_email: { type: DataTypes.STRING, allowNull: false, unique: true },
      doctor_password: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "Doctor", timestamps: true }
  );
  return Doctor;
};
