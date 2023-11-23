const router = require('express').Router();

const multer = require('multer');
const Product = require('../model/productModel');
const Category = require('../model/categoryModel');
const Tag = require('../model/tagModel');

const path = require('path');
const productController = require('../controller/productController');

// uploadFile
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
});

// get
router.get('/', productController.index);

// detail
router.get('/:id', productController.detail);

// create
router.post('/', upload.single('image_url'), productController.store);

// edit
router.put('/:id', productController.update);

router.delete('/:id', productController.destroy);

module.exports = router;
