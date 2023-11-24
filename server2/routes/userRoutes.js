const router = require('express').Router();

const userController = require('../controller/userController');

// get user
router.get('/', userController.index);

// signUp;
router.post('/register', userController.register);

// login
router.post('/login', userController.login);

// logout
router.get('/logout', userController.logout);

// middle ware
router.get('/loggedIn', userController.loggedIn);

module.exports = router;
