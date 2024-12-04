"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.HospitalAccounts, {
        foreignKey: "id_category",
        targetKey: "id_category",
        as: "category_FK",
      });
      Service.belongsTo(models.Category, {
        foreignKey: "id_category",
        targetKey: "id_category",
        as: "category_FK",
      });
    }
  }
  Service.init(
    {
      id_service: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      id_hospital: { type: DataTypes.UUID, allowNull: false },
      id_category: { type: DataTypes.UUID, allowNull: false },
      service_name: { type: DataTypes.STRING, allowNull: false },
      description_service: { type: DataTypes.STRING, allowNull: false },
      fee_service: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "Service", timestamps: true }
  );
  return Service;
};
