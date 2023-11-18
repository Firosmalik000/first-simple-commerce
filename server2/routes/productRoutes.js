const router = require('express').Router();

const multer = require('multer');
const Product = require('../model/productModel');
const Category = require('../model/categoryModel');

const fs = require('fs');
const path = require('path');
const Tag = require('../model/tagModel');
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
router.get('/', async (req, res) => {
  try {
    let { q = '', category = '', tag = [] } = req.query;
    let criteria = {};

    if (q.length) {
      criteria = {
        ...(criteria = {
          name: { $regex: `${q}`, $options: 'i' },
        }),
      };
    }

    if (category.length) {
      let categoryResult = await Category.findOne({ name: { $regex: `${category}`, $options: 'i' } });
      if (categoryResult) {
        criteria = {
          ...criteria,
          category: categoryResult._id,
        };
      }
    }
    if (tag.length) {
      let tagResult = await Tag.find({ name: { $in: tag } });
      if (tagResult) {
        criteria = {
          ...criteria,
          tag: { $in: tagResult.map((t) => t._id) },
        };
      }
    }
    // http://localhost:5000/api/product?q=es&category=drink (contoh manggilnya)
    const products = await Product.find(criteria).populate('category').populate('tag');
    res.send(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// detail
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// create
router.post('/', upload.single('image_url'), async (req, res) => {
  try {
    let payload = req.body;

    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    if (payload.tag && payload.tag.length > 0) {
      let tag = await Tag.find({ name: { $in: payload.tag } });
      if (tag.length) {
        payload = { ...payload, tag: tag.map((t) => t._id) };
      } else {
        delete payload.tag;
      }
    }

    const image_url = req.file.path;

    const product = new Product({
      ...payload,
      image_url: image_url.substring(7, 30),
    });

    await product.save();
    res.send(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// edit
router.put('/:id', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.name || !payload.price || !payload.description) {
      return res.status(400).send('All fields are required');
    }
    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    const product = await Product.findById(req.params.id);

    product.name = payload.name;
    product.price = payload.price;
    product.description = payload.description;
    product.category = payload.category;

    await product.save();
    res.send(product).status(201).json('Product updated successfully');
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(201).json('Product deleted successfully');
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
