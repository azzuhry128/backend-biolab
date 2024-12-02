'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HospitalService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HospitalService.init({
    id_hospital: DataTypes.INTEGER,
    name_service: DataTypes.STRING,
    description_service: DataTypes.STRING,
    fee_service: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HospitalService',
  });
  return HospitalService;
};