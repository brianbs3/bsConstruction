const router = require('express').Router();
const { formatJSON11 } = require('../utils/format');
const {getExpenses,getCategorySummary,getAll,getExpenseCategories,getReceipts,addReceipt} = require('../utils/expenses')
const knex = require('../config/knex');
const pjson = require('../package.json');
const moment = require('moment');
const { or } = require('sequelize');
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

router.get('/expenseCategories', async (req, res) => {
    const [categories] = await Promise.all([
        getExpenseCategories()
    ])

    return res.json(formatJSON11(categories))
});

router.get('/receipts', async (req, res) => {
    const [receipts] = await Promise.all([
        getReceipts()
    ])

    return res.json(formatJSON11(receipts))
});

router.post('/receipts', async (req, res) => {
    try {
        const {vendor, purchaseDate, total, projectId, notes, orderNum} = req.body;
        
        const r = await addReceipt({vendor: vendor, purchaseDate: purchaseDate, total: total, notes:notes, projectId: projectId, orderNum:orderNum});
        return res.status(201).json(r);
    }
    catch (err) {
        console.error('Error uploading receipt: ', err);
        return res.status(500).json({ status: 'FAILED', message: err.message });
    }
});

module.exports = router;