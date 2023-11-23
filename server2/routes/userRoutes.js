const router = require('express').Router();
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userController = require('../controller/userController');

dotenv.config();

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
