const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product_Category = sequelize.define('Product_Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
});

module.exports = Product_Category;
