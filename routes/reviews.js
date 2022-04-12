const express = require ('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');


router.post('/restaurants/:id/reviews', reviewsCtrl.create);

router.delete('/restaurants/:id/reviews', reviewsCtrl.delete)




module.exports = router;