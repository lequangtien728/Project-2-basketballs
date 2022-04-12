const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');




router.get('/', restaurantsCtrl.index);
router.get('/new', restaurantsCtrl.new);

router.get('/:id', restaurantsCtrl.show);

router.get('/:id/edit',restaurantsCtrl.edit);
router.put('/:id', restaurantsCtrl.update);


router.post('/', restaurantsCtrl.create);




module.exports = router;