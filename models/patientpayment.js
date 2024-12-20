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
    }
  }
  PatientPayment.init(
    {
      id_patient: DataTypes.INTEGER,
      details: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PatientPayment",
    }
  );
  return PatientPayment;
};
