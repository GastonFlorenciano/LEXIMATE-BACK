const router = require('express').Router();
const { register, login, user } = require('../controllers/auth.controllers.js')

router.post('/register', register);
router.post('/login', login)

module.exports = router;