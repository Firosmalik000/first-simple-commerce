const router = require('express').Router();
const categoryController = require('../controller/categoryController');

// router
router.get('/', categoryController.index);

router.get('/:id', categoryController.detail);

router.post('/', categoryController.store);

router.delete('/:id', categoryController.destroy);

router.put('/:id', categoryController.update);

module.exports = router;
