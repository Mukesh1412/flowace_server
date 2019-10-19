const express = require('express');
const router = express.Router()
const users = require('./usersRoutes');
const productRoutes = require('./productRoutes');
router.use(users);
router.use(productRoutes);

module.exports = router;