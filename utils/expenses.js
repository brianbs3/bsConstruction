'use strict';
const knex = require('../config/knex');
const db = require('../models');
// const axios = require('axios');
// const fs = require('fs');

const config = require('../config')

const getExpenses = () => {
    return new Promise(async (resolve, reject) => {
        try{
            const p = await knex.columns()
            .select()
            .from('items')
            .where('exclude', false)
            
            resolve(p);
        }
        catch(error){
            console.log(error);
            reject(new Error(`Cannot get items`));
        }
    });
}

const getCategorySummary = () => {
    return new Promise(async (resolve, reject) => {
        try{
            // Rolls subcategory totals up into their top-level parent (parentId=0).
            // Subcategories with a missing/dangling parent fall back to being their own top-level row.
            const p = await knex.raw(`
                SELECT
                    top.id AS categoryId,
                    top.category AS category,
                    count(*) AS count,
                    sum(i.quantity*i.price) AS totalCost,
                    SUM(i.quantity) AS totalCount,
                    SUM(i.quantity*i.price)/SUM(i.quantity) AS avgPerItem
                FROM items i
                JOIN expenseCategories c ON i.categoryId=c.id
                LEFT JOIN expenseCategories parent ON c.parentId=parent.id
                JOIN expenseCategories top ON top.id = IF(c.parentId=0 OR parent.id IS NULL, c.id, parent.id)
                WHERE i.exclude=false
                GROUP BY top.id, top.category
                ORDER BY top.category`)

            resolve(p);
        }
        catch(error){
            console.log(error);
            reject(new Error(`Cannot get items`));
        }
    });
}

const getCategorySummaryDetail = (parentId) => {
    return new Promise(async (resolve, reject) => {
        try{
            // Direct items on the parent category itself plus each subcategory's own totals.
            const p = await knex.raw(`
                SELECT
                    c.id AS categoryId,
                    c.category AS category,
                    count(*) AS count,
                    sum(i.quantity*i.price) AS totalCost,
                    SUM(i.quantity) AS totalCount,
                    SUM(i.quantity*i.price)/SUM(i.quantity) AS avgPerItem
                FROM items i
                JOIN expenseCategories c ON i.categoryId=c.id
                WHERE i.exclude=false AND (c.id=? OR c.parentId=?)
                GROUP BY c.id, c.category
                ORDER BY (c.id=?) DESC, c.category`, [parentId, parentId, parentId])

            resolve(p);
        }
        catch(error){
            console.log(error);
            reject(new Error(`Cannot get items`));
        }
    });
}

const getAll = () => {
    return new Promise(async (resolve, reject) => {
        try{
            const p = await knex.raw(`
                select *,i.id as itemId, r.id as receiptId, p.id as projectId, e.id as expenseCategoryId 
                from items i join receipts r on i.receiptId=r.id 
                join projects p on r.projectId=p.id 
                join expenseCategories e on i.categoryId=e.id 
                where i.exclude=false`)
            
            resolve(p);
        }
        catch(error){
            console.log(error);
            reject(new Error(`Cannot get items`));
        }
    });
}

const getExpenseCategories = () => {
    return new Promise(async (resolve, reject) => {
        try{
            const p = await knex.columns()
            .select()
            .from('expenseCategories')
            
            resolve(p);
        }
        catch(error){
            console.log(error);
            reject(new Error(`Cannot get items`));
        }
    });
}

const getReceipts = () => {
    return new Promise(async (resolve, reject) => {
        try{
            const p = await knex.columns()
            .select()
            .from('receipts')
            
            resolve(p);
        }
        catch(error){
            console.log(error);
            reject(new Error(`Cannot get items`));
        }
    });
}

const getItemsByNum = (itemNum) => {
    return new Promise(async (resolve, reject) => {
        try{
            const p = await knex.columns()
            .select()
            .from('items')
            .where('itemNum', '=', itemNum)
            
            resolve(p);
        }
        catch(error){
            console.log(error);
            reject(new Error(`Cannot get items`));
        }
    });
}

const addReceipt = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            await db.sequelize.models.receipts.upsert(data);
            console.log(data)
            let receipt = await db.sequelize.models.receipts.findOne({
                where: { vendor:data.vendor, purchaseDate:data.purchaseDate, total:data.total, projectId:data.projectId }
            });
                                
            resolve(receipt)
        }
        catch(error){
            console.log(error);
            reject(new Error(`Cannot add receipt`));
        }
    });
}

const addItem = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            await db.sequelize.models.items.upsert(data);
            console.log(data)
            let item = await db.sequelize.models.items.findOne({
                where: { description:data.description, receiptId:data.receiptId }
            });
                                
            resolve(item)
        }
        catch(error){
            console.log(error);
            reject(new Error(`Cannot add item`));
        }
    });
}

module.exports = {
    getExpenses,
    getCategorySummary,
    getCategorySummaryDetail,
    getAll,
    getExpenseCategories,
    getReceipts,
    addReceipt,
    addItem,
    getItemsByNum
};