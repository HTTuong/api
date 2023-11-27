const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT
    }
});

module.exports = Category;
