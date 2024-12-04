"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatientPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PatientPayment.belongsTo(models.Patient, {
        foreignKey: "id_patient",
        targetKey: "id_patient",
        as: "patient_FK",
      });
    }
  }
  PatientPayment.init(
    {
      id_payment: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      id_patient: { type: DataTypes.UUID, allowNull: false },
      payment_details: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "PatientPayment", timestamps: true }
  );
  return PatientPayment;
};
