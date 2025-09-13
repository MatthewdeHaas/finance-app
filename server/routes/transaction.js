const router = require('express').Router();
const { getTransactions, monthlySpending, dailyVolume } = require('../controllers/transactionController');

router.post("/", getTransactions);
router.get("/monthly-spending", monthlySpending);
router.post("/daily-volume", dailyVolume);

module.exports = router;
