const router = require('express').Router();
const { formatJSON11 } = require('../utils/format');
const {getExpenses,getCategorySummary,getAll} = require('../utils/expenses')
const knex = require('../config/knex');
const pjson = require('../package.json');
const moment = require('moment')
// const config = require('../config')
// const { MongoClient } = require('mongodb');
// const uri = config.MONGO_DB;
// const client = new MongoClient(uri);

router.get('/version', (req, res) => {
    return res.json(formatJSON11({ "version": pjson.version }));
});

router.get('/', async (req, res) => {
    const [coinCollection] = await Promise.all([
        getExpenses()
    ])

    return res.json(formatJSON11(coinCollection))
});

router.get('/categorySummary', async (req, res) => {
    const [coinCollection] = await Promise.all([
        getCategorySummary()
    ])

    return res.json(formatJSON11(coinCollection))
});
router.get('/all', async (req, res) => {
    const [coinCollection] = await Promise.all([
        getAll()
    ])

    return res.json(formatJSON11(coinCollection))
});

module.exports = router;