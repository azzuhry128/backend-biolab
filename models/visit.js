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
      name_visit: DataTypes.STRING,
      fee_visit: DataTypes.STRING,
      status_visit: DataTypes.STRING,
      rating_visit: DataTypes.STRING,
      score_visit: DataTypes.STRING,
    },
    {
      sequelize, modelName: "visit", timestamps: true
    }
  );
  return visit;
};
