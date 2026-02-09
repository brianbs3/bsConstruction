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
            const p = await knex.raw(`
                SELECT category,count(*) AS count,sum(quantity*price) AS totalCost, SUM(quantity) AS totalCount, SUM(quantity*price)/SUM(quantity) AS avgPerItem 
                FROM items JOIN expenseCategories ON items.categoryId=expenseCategories.id 
                WHERE items.exclude=false
                GROUP BY category`)
            
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

module.exports = {
    getExpenses,
    getCategorySummary,
    getAll,
    getExpenseCategories,
    getReceipts,
    addReceipt
};