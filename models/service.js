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
      Service.belongsTo(models.Category, { foreignKey: "id_category" });
      Service.belongsTo(models.HospitalAccount, { foreignKey: "id_hospital" });
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
      service_description: { type: DataTypes.STRING, allowNull: false },
      service_fee: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "Service", timestamps: true }
  );
  return Service;
};
