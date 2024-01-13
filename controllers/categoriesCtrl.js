const Category = require("../model/Category");

//Create new Category
exports.createCategoryCtrl = async (req, res) => {
    try {
        const { name } = req.body;

        //category exists
        const categoryFound = await Category.findOne({ name });
        if (categoryFound) {
            res.status(409).json({ message: "Category already exists" });
        }

        //Create
        const category = await Category.create({
            name: name?.toLowerCase(),

        });

        res.status(201).json({
            message: "Category created successfully",
            category
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//Get all categories
exports.getAllCategoriesCtrl = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(201).json({

            message: "Categories fetched successfully",
            categories,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

//Deletet Category
exports.deleteCategoryCtrl = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};