"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatientLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PatientLocation.belongsTo(models.Patient, {
        foreignKey: "id_patient",
        targetKey: "id_patient",
        as: "patient_FK",
      });
    }
  }
  PatientLocation.init(
    {
      id_location: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      id_patient: { type: DataTypes.UUID, allowNull: false },
      location_latitude: { type: DataTypes.STRING, allowNull: false },
      location_longitude: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "PatientLocation", timestamps: true }
  );
  return PatientLocation;
};
