const mongoose = require('mongoose');
const Color = require('../../model/Color');
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Color Model Test', () => {
    it('should correctly store and retrieve data', async () => {
        const colorData = {
            name: 'TestColor',
        };

        const color = await Color.create(colorData);
        const foundColor = await Color.findById(color._id);

        expect(foundColor.name).toBe(colorData.name);
    });
});
