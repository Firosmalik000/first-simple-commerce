const router = require('express').Router();
const Adress = require('../model/adressModel');
const addressController = require('../controller/addressController');

async function getAdress(req, res, next) {
  try {
    const address = await Adress.findById(req.params.id);
    if (address == null) {
      return res.status(404).json({ message: 'Alamat tidak ditemukan' });
    }

    res.locals.address = address;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  return next();
}

router.get('/', addressController.index);

router.get('/user/:userId', addressController.indexId);

// Menambah alamat baru
router.post('/', addressController.store);

router.get('/:id', getAdress, addressController.detail);

// Menghapus alamat berdasarkan ID
router.delete('/:id', addressController.destroy);

// Memperbarui alamat
router.put('/:id', addressController.update);

module.exports = router;
