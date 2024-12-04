"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class visit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      visit.belongsTo(models.Patient, {
        foreignKey: "id_patient",
        targetKey: "id_patient",
        as: "patient_FK",
      });
      visit.belongsTo(models.Doctor, {
        foreignKey: "id_doctor",
        targetKey: "id_doctor",
        as: "doctor_FK",
      });
      visit.belongsTo(models.HospitalAccounts, {
        foreignKey: "id_hospital",
        targetKey: "id_hospital",
        as: "hospital_FK",
      });
      visit.belongsTo(models.PatientPayment, {
        foreignKey: "id_payment",
        targetKey: "id_payment",
        as: "payment_FK",
      });
    }
  }
  visit.init(
    {
      id_visit: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      id_patient: DataTypes.UUID,
      id_doctor: DataTypes.UUID,
      id_hospital: DataTypes.UUID,
      id_payment: DataTypes.UUID,
      name_visit: DataTypes.STRING,
      fee_visit: DataTypes.STRING,
      rating_visit: DataTypes.STRING,
      score_visit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "visit",
    }
  );
  return visit;
};
