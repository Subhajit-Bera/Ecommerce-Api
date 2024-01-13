const express = require("express");
const {createCategoryCtrl,getAllCategoriesCtrl,deleteCategoryCtrl}=require("../controllers/categoriesCtrl");
const router = express.Router();

router.post("/category",createCategoryCtrl);
router.get("/category",getAllCategoriesCtrl);
router.delete("/category/:id",deleteCategoryCtrl);
module.exports = router;