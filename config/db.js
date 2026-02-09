const Sequelize = require('sequelize');
const config = require('../config');

const db = new Sequelize(config.DB, {
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

module.exports = db;