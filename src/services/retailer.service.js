const {save, get, findOneAndUpdate} = require('../daos/retailer.dao');
const { hashPassword } = require('./auth.service');

const RetailerService = {
    async getRetailers(condition) {
        return get(condition)
    },
    async createRetailer(retailer) {
        const hashedPassword = await hashPassword(retailer.password);
        await save({...retailer, password: hashedPassword})
        return {isSuccess: true, isError: false}
    }
}

module.exports = RetailerService