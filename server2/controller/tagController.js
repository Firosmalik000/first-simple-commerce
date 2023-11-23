const Tag = require('../model/tagModel');

const index = async (req, res) => {
  const tags = await Tag.find({});
  res.status(200).json({ message: 'Category Berhasil di muat', data: tags });
};

const detail = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag tidak ditemukan' });
    }
    res.status(200).json({ message: 'Tag berhasil di muat', data: tag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const store = async (req, res) => {
  try {
    const { name } = req.body;
    const tag = new Tag({ name });
    await tag.save();
    res.status(201).json({ message: 'Tag berhasil di buat', data: tag });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag tidak di temukan' });
    }
    res.status(200).json({ message: 'Tag berhasil di hapus', data: tag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag tidak di temukan' });
    }
    tag.name = name;
    await tag.save();
    res.status(200).json({ message: 'Tag berhasil di update', data: tag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  index,
  detail,
  store,
  destroy,
  update,
};
