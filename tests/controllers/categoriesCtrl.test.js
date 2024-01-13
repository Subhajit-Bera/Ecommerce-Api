const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Category = require('../../model/Category');
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Category Controller Tests', () => {
    it('should create a new category', async () => {
        const response = await request(app)
            .post('/api/v1/category')
            .send({ name: 'NewCategory' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Category created successfully');
        expect(response.body.category.name).toBe('newcategory'); // Ensure the name is lowercased
    });

    it('should fetch all categories', async () => {
        const response = await request(app).get('/api/v1/category');

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Categories fetched successfully');
        expect(response.body.categories.length).toBeGreaterThan(0);
    });

    it('should delete a category', async () => {
        const category = await Category.create({ name: 'ToDelete' });

        const response = await request(app).delete(`/api/v1/category/${category._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Category deleted successfully');
    });

    it('should handle errors when deleting a non-existing category', async () => {
        const response = await request(app).delete('/api/v1/category/nonexistentid');

        expect(response.status).toBe(500);
    });
});
