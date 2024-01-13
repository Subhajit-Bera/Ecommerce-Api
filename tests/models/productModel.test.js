const mongoose = require('mongoose');
const Product = require('../../model/Product');
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Product Model Test', () => {
    it('should correctly store and retrieve data', async () => {
        const productData = {
            name: 'TestProduct',
            description: 'Test Description',
            price: 100,
            brand: 'TestBrand',
            category: 'TestCategory',
            colors: ['TestColor'],
            totalQty: 10,
        };

        const product = await Product.create(productData);
        const foundProduct = await Product.findById(product._id);

        expect(foundProduct.name).toBe(productData.name);
        expect(foundProduct.description).toBe(productData.description);
        expect(foundProduct.price).toBe(productData.price);
        expect(foundProduct.brand).toBe(productData.brand);
        expect(foundProduct.category).toBe(productData.category);
        expect(foundProduct.colors).toEqual(productData.colors);
        expect(foundProduct.totalQty).toBe(productData.totalQty);
    });
});
