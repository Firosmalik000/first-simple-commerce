const Adress = require('../model/adressModel');

const index = async (req, res) => {
  try {
    const addresses = await Adress.find().populate('user');
    res.status(200).json({ message: 'Alamat Berhasil di muat', data: addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const indexId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userAddresses = await Adress.find({ user: userId }).populate('user');
    res.status(200).json(userAddresses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const store = async (req, res) => {
  const address = new Adress({
    name: req.body.name,
    kelurahan: req.body.kelurahan,
    kecamatan: req.body.kecamatan,
    kota: req.body.kota,
    provinsi: req.body.provinsi,
    user: req.body.user,
    detail: req.body.detail,
  });

  try {
    const newAddress = await address.save();
    res.status(201).json({ message: 'Alamat berhasil dibuat', data: newAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Adress.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({ message: 'Alamat tidak di temukan' });
    }
    res.status(201).json({ message: 'Alamat berhasil di hapus', data: address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const address = await Adress.findByIdAndUpdate(id, payload, { new: true });
    if (!address) {
      return res.status(404).json({ message: 'Alamat tidak ditemukan' });
    }
    res.status(200).json({ message: 'Alamat berhasil diperbarui', data: address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const detail = (req, res) => {
  res.status(200).json(res.locals.address);
};
module.exports = {
  index,
  indexId,
  store,
  destroy,
  update,
  detail,
};
