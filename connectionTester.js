const { Sequelize } = require("sequelize");

//postgreSQL
const sequelize = new Sequelize('proyek_professional', 'postgres', '529440', {
    host: 'localhost',
    dialect: 'postgres'
})

const connectionTester = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
};

connectionTester();
