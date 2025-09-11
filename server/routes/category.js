const router = require('express').Router();
const { getCategories, createCategory, aggregateAmountByCategory } = require("../controllers/categoryController")

router.get("/", getCategories);
router.post("/create", createCategory ); 
router.post("/aggregate", aggregateAmountByCategory);

module.exports = router;
