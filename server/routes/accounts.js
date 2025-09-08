const router = require('express').Router();
const { getAccounts, createAccount } = require('../controllers/accountController');

router.get("/", getAccounts);
router.post("/create", createAccount); 

module.exports = router;
