const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/teste',apiController.test);

router.get('/details',apiController.details);

router.post('/interest',apiController.create);

router.put('/interest/:id',apiController.update);

router.delete('/interest/:id',apiController.delete1);

module.exports = router;