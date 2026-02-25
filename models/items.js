var Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {

    return sequelize.define('items', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        description: {type: Sequelize.STRING},
        quantity: {type: Sequelize.INTEGER},
        price: {type: Sequelize.STRING},
        receiptId: {type: Sequelize.INTEGER},
        categoryId: {type: Sequelize.INTEGER},
        itemNum: {type: Sequelize.STRING},
        exclude: {type: Sequelize.BOOLEAN},
        notes: {type: Sequelize.STRING},
    },
    {
        tableName: 'items',
        underscored: false,
        freezeTableName: true,
        underscoredAll: false,
        timestamps: false

    });
}