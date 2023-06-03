const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Note extends Model {}
Note.init({
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  categories: DataTypes.STRING,
  state:DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'Note',
  timestamps: false, 
});

module.exports = Note;