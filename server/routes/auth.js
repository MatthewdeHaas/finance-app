const router = require('express').Router();
const { login, register, refresh, logout, me} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', me);


module.exports = router;
