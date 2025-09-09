const router = require('express').Router();
const { getAccounts, createAccount, updateBalance } = require('../controllers/accountController');

router.get("/", getAccounts);
router.post("/create", createAccount); 
router.put("/update", updateBalance);

module.exports = router;
