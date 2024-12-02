'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DoctorAccount.init({
    id_hospital: DataTypes.INTEGER,
    doctor_name: DataTypes.STRING,
    doctor_email: DataTypes.STRING,
    doctor_phone: DataTypes.STRING,
    doctor_password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DoctorAccount',
  });
  return DoctorAccount;
};