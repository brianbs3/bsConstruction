'use strict';

const formatJSON11 = (m) => {
    return ({
        data: m,
        meta: { totalResourceCount: m.length }
    });
}

module.exports = {
    formatJSON11
};