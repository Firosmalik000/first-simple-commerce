const router = require('express').Router();
const Tag = require('../model/tagModel');
const tagController = require('../controller/tagController');

router.get('/', tagController.index);

router.get('/:id', tagController.detail);

router.post('/', tagController.store);

router.delete('/:id', tagController.destroy);

router.put('/:id', tagController.update);

module.exports = router;
