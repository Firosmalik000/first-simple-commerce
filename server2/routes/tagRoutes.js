const router = require('express').Router();
const Tag = require('../model/tagModel');

router.get('/', async (req, res) => {
  const tags = await Tag.find({});
  res.status(200).json({ message: 'Categories found successfully', data: tags });
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'tag not found' });
    }
    res.status(200).json({ message: 'tag found successfully', data: tag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const tag = new Tag({ name });
    await tag.save();
    res.status(201).json({ message: 'tag created successfully', data: tag });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'tag not found' });
    }
    res.status(200).json({ message: 'tag deleted successfully', data: tag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    tag.name = name;
    await tag.save();
    res.status(200).json({ message: 'Tag updated successfully', data: tag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
