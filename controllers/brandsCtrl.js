const Brand = require("../model/Brand");

//Create New Brand
exports.createBrandCtrl = async (req, res) => {
  try {
    const { name } = req.body;
    //brand exists
    const brandFound = await Brand.findOne({ name });
    if (brandFound) {
      return res.status(409).json({ message: "Brand already exists" });
    }

    //create
    const brand = await Brand.create({
      name: name.toLowerCase()
    });

    res.status(201).json({
      message: "Brand created successfully",
      brand,
    });

  } catch (error) {
    res.status(500).send('Internal Server error');
  }

};

//Get All Brands
exports.getAllBrandsCtrl = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(201).json({
      message: "Brands fetched successfully",
      brands,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Brand
exports.deleteBrandCtrl = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "brand deleted successfully",
    });
  } catch (error) {
    await Brand.findByIdAndDelete(req.params.id);
  } 
};