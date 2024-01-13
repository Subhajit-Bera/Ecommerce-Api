const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app'); 
const Brand = require('../../model/Brand');
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL
    );
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Brand Controller Tests', () => {
    it('should create a new brand', async () => {
        const response = await request(app)
            .post('/api/v1/brands')
            .send({ name: 'NewBrand' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Brand created successfully');
        expect(response.body.brand.name).toBe('newbrand');
    });

    it('should fetch all brands', async () => {
        const response = await request(app).get('/api/v1/brands');

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Brands fetched successfully');
        expect(response.body.brands.length).toBeGreaterThan(0);
    });

    it('should delete a brand', async () => {
        const brand = await Brand.create({ name: 'ToDelete' });

        const response = await request(app).delete(`/api/v1/brands/${brand._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('brand deleted successfully');
    });

    it('should handle errors when deleting a non-existing brand', async () => {
        const response = await request(app).delete('/api/v1/brands/nonexistentid');

        expect(response.status).toBe(500);
    });
});