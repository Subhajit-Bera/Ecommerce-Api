const Product = require("../model/Product");
const Category = require("../model/Category");
const Brand = require("../model/Brand");
const Color = require("../model/Color");

exports.createProductCtrl = async (req, res) => {
    // console.log(req.files); req.files->images

    // console.log(req.body);
    try {
        const { name, description, price, brand, category, colors, totalQty } = req.body;

        const productExists = await Product.findOne({ name });
        if (productExists) {
            return res.status(409).json({ message: "Product already exists" });
        }


        //Find the brand
        const brandFound = await Brand.findOne({
            name: brand,
        });

        if (!brandFound) {
            return res.status(404).json({ message: "Brand not found, please create brand first or check brand name" });
        }

        //find the category
        const categoryFound = await Category.findOne({
            name: category,
        });
        if (!categoryFound) {
            return res.status(404).json({ message: "Category not found, please create Category first or check Category name" });
        }

        //Find the color
        const colorFound = await Color.findOne({
            name: colors,
        });
        if (!colorFound) {
            return res.status(404).json({ message: "Color not found, please create Color first or check Color name" });
        }

        //Create the product
        const product = await Product.create({
            name,
            description,
            price,
            brand,
            category,
            colors,
            totalQty
        });

        //Push the product into category 
        categoryFound.products.push(product._id);
        //resave
        await categoryFound.save();

        //push the product into brand
        brandFound.products.push(product._id);
        //resave
        await brandFound.save();

        colorFound.products.push(product._id);
        await categoryFound.save();

        //send response
        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }

};


//Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).lean();

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

//Get single Product
exports.getProductCtrl = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({ message: "Prouduct not found" });
        }
        res.status(201).json({
            message: "Product fetched successfully",
            product,
        });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

};

//Update Product
exports.updateProductCtrl = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            brand,
            category,
            colors,
            totalQty

        } = req.body;

        //update
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                brand,
                category,
                colors,
                totalQty
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({
            message: "Product updated successfully",
            product,
        });

    } catch (error) {
        res.status(500).send({ error: error.message });

    }

};




//Search Products
exports.searchProductsCtrl = async (req, res) => {
    // console.log(req.query);

    try {
        let productQuery = Product.find();

        //Search by name
        if (req.query.name) {
            productQuery = productQuery.find({
                //$regex -> Provides regular expression capabilities for pattern matching strings in queries.
                //$options: "i" -> match both lower case and upper case pattern in the string
                name: { $regex: req.query.name, $options: "i" },
            });
        }
        //Search by description
        if (req.query.description) {
            productQuery = productQuery.find({
                description: { $regex: req.query.description, $options: "i" },
            });
        }

        //Search by brand
        if (req.query.brand) {
            productQuery = productQuery.find({
                brand: { $regex: req.query.brand, $options: "i" },
            });
        }

        //Search by category
        if (req.query.category) {
            productQuery = productQuery.find({
                category: { $regex: req.query.category, $options: "i" },
            });
        }

        //Search by color
        if (req.query.color) {
            productQuery = productQuery.find({
                colors: { $regex: req.query.color, $options: "i" },
            });
        }

        //Search by price range   (Here the query looks like : product?price=100-500)
        if (req.query.price) {
            const priceRange = req.query.price.split("-");
            //gte: greater or equal
            //lte: less than or equal to
            productQuery = productQuery.find({
                price: { $gte: priceRange[0], $lte: priceRange[1] },
            });
        }


        //Pagination
        //Page
        const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;

        //Limit
        const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

        //Start Index
        const startIndex = (page - 1) * limit;

        //End Index
        const endIndex = page * limit;

        //Total
        const total = await Product.countDocuments();


        //for 1st page: skip=(1-1)*10(default limit) = 0  -> So it will show the no of limits assign without skip 
        //for 2nd page: skip=(2-1)*10 = 10  ->skip=10 :it will skip first 10 products 
        productQuery = productQuery.skip(startIndex).limit(limit);

        //Pagination results
        const pagination = {};

        //For next page
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }
        //For previous page
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }

        const products = await productQuery.lean();
        res.status(201).json({
            total,
            results: products.length,
            pagination,
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete Product
exports.deleteProductCtrl = async (req, res) => {

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
