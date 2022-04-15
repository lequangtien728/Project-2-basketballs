const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');




router.get('/', restaurantsCtrl.index);

router.get('/new', restaurantsCtrl.new);//URL=http://localhost:3000/restaurants/new. This page to add Restaurant information.

router.get('/:id', restaurantsCtrl.show);//this is the details page(http://localhost:3000/restaurants/6250eab4fecfab4a23eef2b4)

router.get('/:id/edit',restaurantsCtrl.edit);
router.put('/:id', restaurantsCtrl.update);//after edit, you need to update and redirect it back to (restaurants/:id)

router.post('/', restaurantsCtrl.create);//this need to create when add "Add Restaurant" when created router.get('/new', restaurantsCtrl.new);

router.delete('/:id', restaurantsCtrl.delete);




module.exports = router;