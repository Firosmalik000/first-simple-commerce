const router = require('express').Router();
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// get user
router.get('/', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ verified });
  } catch (err) {
    console.log(err);
    res.status(401).json(false);
  }
});

// signUp;
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length <= 5) {
      res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    const saveNewUser = await newUser.save();

    const token = jwt.sign({ id: saveNewUser._id }, process.env.JWT_SECRET);

    // set token to http only
    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send(saveNewUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // validate
  try {
    if (!email || !password) {
      res.status(400).json({ message: 'Email Dan Password harap diisi' });
    }
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({
        message: 'User Tidak Ditemukan',
      });
    }
    // chekking user from database
    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Password Salah',
      });
    }

    // masuk

    const token = jwt.sign({ User: existUser, id: existUser._id }, process.env.JWT_SECRET);
    res
      .cookie('token', token, {
        httpOnly: true,
     
      })
      .json({ message: 'Selamat Datang Kembali', User: existUser, token, id: existUser._id, name: existUser.name });
    console.log(User);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

// logout
router.get('/logout', (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Sampai Jumpa Lagi' });
});

router.get('/loggedIn', (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    console.log(err);
    res.status(401).json(false);
  }
});
module.exports = router;
