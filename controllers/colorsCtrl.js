const Color = require("../model/Color");

//Create New Color
exports.createColorCtrl = async (req, res) => {
    try {
        const { name } = req.body;
        const colorFound = await Color.findOne({ name });
        if (colorFound) {
            res.status(409).json({ message: "Color already exists" });
        }

        //create
        const color = await Color.create({
            name: name.toLowerCase(),
        });

        res.status(201).json({
            message: "Color created successfully",
            color,
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

//Get All colors
exports.getAllColorsCtrl =async (req, res) => {
    try {
        const colors = await Color.find();
        res.status(201).json({
            message: "colors fetched successfully",
            colors,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

//Delete Color
exports.deleteColorCtrl = async (req, res) => {
    try {
        await Color.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "color deleted successfully",
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};