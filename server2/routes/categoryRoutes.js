const router = require('express').Router();
const Category = require('../model/categoryModel');

router.get('/', async (req, res) => {
  const categories = await Category.find({});
  if(categories.length < 1) {
    res.status(404).json({ message: 'Tidak ada category ' });
  }
  res.status(200).json({ message: 'Categories berhasil di muat', data: categories });
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category tidak ditemukan' });
    }
    res.status(200).json({ message: 'Category berhasil di muat', data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: 'Category berhasil di buat', data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category tidak ditemukan' });
    }
    res.status(200).json({ message: 'Category berhasil dihapus', data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category tidak di temukan' });
    }
    category.name = name;
    await category.save();
    res.status(200).json({ message: 'Category berhasil di update', data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
