const router = require('express').Router();
const { getAccounts, createAccount, updateBalance, netBalance } = require('../controllers/accountController');

router.get("/", getAccounts);
router.get("/net-balance", netBalance);
router.post("/create", createAccount); 
router.put("/update", updateBalance);

module.exports = router;
