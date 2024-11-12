const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Patient = sequelize.define(
'Patient',
{
    // Model attributes are defined here
    id_patient: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: false
    },
    fullname_patient: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [1, 64]
    }
    },
    email_patient: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [1, 64],
        isEmail: true
    }
    },
    password_patient: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [1, 16]
    }
    },
    phone_number_patient: {
    type: DataTypes.STRING,
    allowNull: true
    },
    address_patient: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
        len: [1, 64]
    }
    },
    geolocation_patient: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
        len: [1,16]
    }
    },
},
{
    // Other model options go here  
    sequelize,
    modelName: 'Patient',
    tableName: 'Patients',
    timestamps: true
});

// `sequelize.define` also returns the model
console.log(Patient === sequelize.models.Patient); // true