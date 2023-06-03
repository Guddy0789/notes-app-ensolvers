const {Sequelize} = require('sequelize');
const {development} = require('../config/config')
// require('dotenv').config();
const sequelize = new Sequelize(development.database, development.username, development.password, {
    host: 'localhost',
    dialect: 'mysql',
      port: development.dbbPort,
  });

  sequelize.sync({ force: false})
    .then(() => {
      console.log('\x1b[32m','Conectado a la base de datos -- force false:'+process.env.DB_DATABASE);
    })
    .catch(err => {
      console.error('\x1b[41m','Error al conectar a la base de datos:', err);
    });

   

  

module.exports = sequelize;
