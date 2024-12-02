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
      name_hospital: DataTypes.STRING,
      email_hospital: DataTypes.STRING,
      password_hospital: DataTypes.STRING,
      location_hospital: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HospitalAccount",
    }
  );
  return HospitalAccount;
};
