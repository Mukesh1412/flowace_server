const express = require('express');
const router = express.Router()
const productController = require("../controller/productController");

router.get('/getProducts/:id',productController.getProductDetails );
router.get('/getAllProducts',productController.getAllProducts);
router.post('/order',productController.orderProduct);
router.post('/getAllOrders',productController.getAllOrders);
router.get('/getAllOrdersCount/:role/:user_id',productController.getAllOrdersCount);
router.post('/updateOrderStatus',productController.updateOrderStatus)
module.exports = router;