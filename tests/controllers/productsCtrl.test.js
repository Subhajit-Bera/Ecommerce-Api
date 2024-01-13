const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Product = require('../../model/Product');
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Product Controller Tests', () => {
    it('should create a new product', async () => {
        const response = await request(app)
            .post('/api/v1/product')
            .send({
                name: 'NewProduct',
                description: 'New Description',
                price: 200,
                brand: 'NewBrand',
                category: 'NewCategory',
                colors: ['NewColor'],
                totalQty: 20,
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Product created successfully');
        expect(response.body.product.name).toBe('newproduct'); // Ensure the name is lowercased
    });

    it('should fetch all products', async () => {
        const response = await request(app).get('/api/v1/product');

        expect(response.status).toBe(200);
        expect(response.body.products.length).toBeGreaterThan(0);
    });

    it('should fetch a single product', async () => {
        const newProduct = await Product.create({
            name: 'SingleProduct',
            description: 'Single Description',
            price: 300,
            brand: 'SingleBrand',
            category: 'SingleCategory',
            colors: ['SingleColor'],
            totalQty: 30,
        });

        const response = await request(app).get(`/api/v1/product/${newProduct._id}`);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Product fetched successfully');
        expect(response.body.product._id).toBe(newProduct._id.toString());
    });

    it('should update a product', async () => {
        const newProduct = await Product.create({
            name: 'ToUpdateProduct',
            description: 'ToUpdate Description',
            price: 500,
            brand: 'ToUpdateBrand',
            category: 'ToUpdateCategory',
            colors: ['ToUpdateColor'],
            totalQty: 50,
        });

        const updatedData = {
            name: 'UpdatedProduct',
            description: 'Updated Description',
            price: 600,
            brand: 'UpdatedBrand',
            category: 'UpdatedCategory',
            colors: ['UpdatedColor'],
            totalQty: 60,
        };

        const response = await request(app)
            .put(`/api/v1/product/${newProduct._id}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Product updated successfully');
        expect(response.body.product.name).toBe('UpdatedProduct'); // Ensure the name is lowercased
        expect(response.body.product.description).toBe(updatedData.description);
        expect(response.body.product.price).toBe(updatedData.price);
        expect(response.body.product.brand).toBe(updatedData.brand);
        expect(response.body.product.category).toBe(updatedData.category);
        expect(response.body.product.colors).toEqual(updatedData.colors);
        expect(response.body.product.totalQty).toBe(updatedData.totalQty);
    });

    it('should search products based on query parameters', async () => {
        const response = await request(app).get('/api/v1/product/search?name=updated');

        expect(response.status).toBe(201);
        expect(response.body.products.length).toBeGreaterThanOrEqual(0);
        expect(response.body.products[0].name.toLowerCase()).toContain('updated');
    });

    it('should delete a product', async () => {
        const newProduct = await Product.create({
            name: 'ToDeleteProduct',
            description: 'ToDelete Description',
            price: 400,
            brand: 'ToDeleteBrand',
            category: 'ToDeleteCategory',
            colors: ['ToDeleteColor'],
            totalQty: 40,
        });

        const response = await request(app).delete(`/api/v1/product/${newProduct._id}/delete`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Product deleted successfully');
    });

    it('should handle errors when deleting a non-existing product', async () => {
        const response = await request(app).delete('/api/v1/product/nonexistentid/delete');

        expect(response.status).toBe(500);
    });


});



