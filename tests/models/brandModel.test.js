const mongoose = require('mongoose');
const Brand = require('../../model/Brand');
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Brand Model Test', () => {
    it('should correctly store and retrieve data', async () => {
        const brandData = {
            name: 'TestBrand',
        };

        const brand = await Brand.create(brandData);
        const foundBrand = await Brand.findById(brand._id);

        expect(foundBrand.name).toBe(brandData.name);
    });
});
