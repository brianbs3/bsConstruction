'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const inflect = require('inflect');
const basename = path.basename(module.filename);
const sequelize = require('../config/db');

let db = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(file => {
        // const model = sequelize['import'](path.join(__dirname, file));
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        const underscoreModel = inflect.singularize(inflect.underscore(model.name));
        db[underscoreModel] = model;
    });

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;