var Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {

    return sequelize.define('receipts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        vendor: {type: Sequelize.STRING},
        created: {type: Sequelize.TIME},
        purchaseDate: {type: Sequelize.STRING},
        total: {type: Sequelize.STRING},
        projectId: {type: Sequelize.INTEGER},
        notes: {type: Sequelize.STRING},
        orderNum: {type: Sequelize.TIME}
    },
    {
        tableName: 'receipts',
        underscored: false,
        freezeTableName: true,
        underscoredAll: false,
        timestamps: false

    });
}