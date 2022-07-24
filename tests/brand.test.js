const { saveBrand, getBrands } = require('../src/services/brand.service');
const {} = require('jest');
const db = require('./db');

beforeAll(async () => db.connect());
afterEach(async () => db.clearDatabase());
afterAll(async () => db.closeDatabase());

describe('Brand tests', () => {
  it('Creates a brand', async () => {
    
    await saveBrand({
      name: 'Adidas',
      password: 'Rest',
      retailers: [],
    });
    const brand = (await getBrands({}))?.[0];
    console.log(brand)
    expect(brand?.name).toBe('Adidas');
  });
});
