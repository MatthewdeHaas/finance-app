const router = require('express').Router();
const { getTransactions, monthlySpending } = require('../controllers/transactionController');

router.post("/", getTransactions);
router.get("/monthly-spending", monthlySpending);

module.exports = router;
