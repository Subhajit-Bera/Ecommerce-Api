const express = require("express");
const {createBrandCtrl,getAllBrandsCtrl,deleteBrandCtrl}=require("../controllers/brandsCtrl");
const router = express.Router();

router.post("/brands",createBrandCtrl);
router.get("/brands",getAllBrandsCtrl);
router.delete("/brands/:id",deleteBrandCtrl);
module.exports = router;