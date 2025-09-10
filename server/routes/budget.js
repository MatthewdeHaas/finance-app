const router = require('express').Router();
const { getBudget, createBudget } = require('../controllers/budgetController');

router.get("/", getBudget);
router.post("/create", createBudget);

module.exports = router;
