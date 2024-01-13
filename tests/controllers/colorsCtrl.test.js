const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Color = require('../../model/Color');
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Color Controller Tests', () => {
    it('should create a new color', async () => {
        const response = await request(app)
            .post('/api/v1/color')
            .send({ name: 'NewColor' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Color created successfully');
        expect(response.body.color.name).toBe('newcolor'); // Ensure the name is lowercased
    });

    it('should fetch all colors', async () => {
        const response = await request(app).get('/api/v1/color');

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Colors fetched successfully');
        expect(response.body.colors.length).toBeGreaterThan(0);
    });

    it('should delete a color', async () => {
        const color = await Color.create({ name: 'ToDelete' });

        const response = await request(app).delete(`/api/v1/color/${color._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Color deleted successfully');
    });

    it('should handle errors when deleting a non-existing color', async () => {
        const response = await request(app).delete('/api/v1/color/nonexistentid');

        expect(response.status).toBe(500);
    });
});
