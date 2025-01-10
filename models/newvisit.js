'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewVisit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NewVisit.init({
    id_visit: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    id_hospital: DataTypes.UUID,
    id_patient: DataTypes.UUID,
    id_doctor: DataTypes.UUID,
    status: DataTypes.STRING,
    name_visit: DataTypes.STRING,
    fee_visit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NewVisit',
  });
  return NewVisit;
};