const {save, get} = require('../daos/brand.dao');
const { hashPassword } = require('./auth.service');

const BrandService = {
    async getBrands(condition) {
        return get(condition)
    },

    async saveBrand(brand) {
        const hashedPassword = await hashPassword(brand.password);
        await save({...brand, password: hashedPassword})
        return {isSuccess: true, isError: false}
    }
}

module.exports = BrandService