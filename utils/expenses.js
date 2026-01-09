'use strict';
const knex = require('../config/knex');
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
            const p = await knex.raw('select category,count(*) as count,sum(quantity*price) as totalCost, sum(quantity) as totalCount, sum(quantity*price)/sum(quantity) as avgPerItem from items join expenseCategories on items.categoryId=expenseCategories.id where items.exclude=false group by category')
            
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
            const p = await knex.raw('select *,i.id as itemId, r.id as receiptId, p.id as projectId, e.id as expenseCategoryId from items i join receipts r on i.receiptId=r.id join projects p on r.projectId=p.id join expenseCategories e on i.categoryId=e.id')
            
            resolve(p);
        }
        catch(error){
            console.log(error);
            reject(new Error(`Cannot get items`));
        }
    });
}

module.exports = {
    getExpenses,
    getCategorySummary,
    getAll
};