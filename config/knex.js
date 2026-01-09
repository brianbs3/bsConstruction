const { DB_USER } = require('../config');
const config = require('../config');

const knex = require('knex')(config.DB,{
    debug: true
});

module.exports = knex;