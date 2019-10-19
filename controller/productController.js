const productDataServiceProvider = require("../services/sql/productsDataServiceProvider");

module.exports.orderProduct =  function (req, res, next) {
    const sql = req.app.get('sql');
    productDataServiceProvider.orderProduct(sql, req.body).then(orderProductData => {
        return res.status(201).json({
            success: true,
            message: 'successfully added',
            data: orderProductData
        })
    }).catch(err => {
        console.log(err);
        next(err);
    })

}
module.exports.getProductDetails =  function (req, res, next) {
    const sql = req.app.get('sql');
    productDataServiceProvider.getProductDetails(sql, req.params).then(productDetails => {
        return res.status(201).json({
            success: true,
            message: 'successfully added',
            data: productDetails
        })
    }).catch(err => {
        console.log(err);
        next(err);
    })
}
module.exports.getAllProducts =  function (req, res, next) {
    const sql = req.app.get('sql');
    productDataServiceProvider.getAllProducts(sql).then(productDetails => {
        return res.status(201).json({
            success: true,
            message: 'successfully fetched',
            data: productDetails
        })
    }).catch(err => {
        console.log(err);
        next(err);
    })
}

module.exports.getAllOrders = function (req,res,next){
    const sql = req.app.get('sql');
    productDataServiceProvider.getAllOrders(sql,req.body).then(orderDetails=>{
        return res.status(201).json({
            success: true,
            message: 'successfully fetched',
            data: orderDetails
        })
    }).catch(err => {
        console.log(err);
        next(err);
    })
}
module.exports.getAllOrdersCount = function (req,res,next){
    const sql = req.app.get('sql');
    productDataServiceProvider.getAllOrdersCount(sql,req.params).then(orderDetails=>{
        console.log("count ",orderDetails);
        return res.status(201).json({
            success: true,
            message: 'successfully fetched',
            data: orderDetails
        })
    }).catch(err => {
        console.log(err);
        next(err);
    })
}

module.exports.updateOrderStatus = function (req,res,next){
    const sql = req.app.get('sql');
    productDataServiceProvider.updateOrderStatus(sql,req.body).then(orderDetails=>{
        return res.status(201).json({
            success: true,
            message: 'successfully fetched',
            data: orderDetails
        })
    }).catch(err => {
        console.log(err);
        next(err);
    })
}
