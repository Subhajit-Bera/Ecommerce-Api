const mongoose = require('mongoose');
const Category = require('../../model/Category');
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Category Model Test', () => {
  it('should correctly store and retrieve data', async () => {
    const categoryData = {
      name: 'TestCategory',
    };

    const category = await Category.create(categoryData);
    const foundCategory = await Category.findById(category._id);

    expect(foundCategory.name).toBe(categoryData.name);
  });
});
