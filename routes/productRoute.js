const express = require("express");
const {createProductCtrl,getAllProducts,getProductCtrl,updateProductCtrl,searchProductsCtrl,deleteProductCtrl}=require("../controllers/productsCtrl");
const router = express.Router();

router.post("/product",createProductCtrl);
router.get("/product",getAllProducts);
router.get("/product/:id",getProductCtrl);
router.put("/product/:id",updateProductCtrl);
router.get("/product/search",searchProductsCtrl);
router.delete("/product/:id/delete",deleteProductCtrl);

module.exports = router;
