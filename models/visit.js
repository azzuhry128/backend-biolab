"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Visit.init(
    {
      id_patient: DataTypes.INTEGER,
      id_doctor: DataTypes.INTEGER,
      id_hospital: DataTypes.INTEGER,
      title_visit: DataTypes.STRING,
      fee_visit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Visit",
    }
  );
  return Visit;
};
