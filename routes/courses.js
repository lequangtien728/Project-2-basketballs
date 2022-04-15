const express = require('express');
const router = express.Router();
const coursesCtrl = require('../controllers/courses');


router.get('/courses/:id', coursesCtrl.new);
router.post('/courses/:id', coursesCtrl.create);



module.exports = router;