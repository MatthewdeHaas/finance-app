const router = require('express').Router();
const { getBudget, createBudget, pastThreshold } = require('../controllers/budgetController');

router.get("/", getBudget);
router.post("/create", createBudget);
router.get("/past-threshold-num", pastThreshold);

module.exports = router;
