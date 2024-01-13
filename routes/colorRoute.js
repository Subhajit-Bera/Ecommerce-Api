const express = require("express");
const {createColorCtrl,getAllColorsCtrl,deleteColorCtrl }=require("../controllers/colorsCtrl");
const router = express.Router();

router.post("/color",createColorCtrl );
router.get("/color",getAllColorsCtrl );
router.delete("/color/:id",deleteColorCtrl);
module.exports = router;