const commonFunction = require('../../common/commonFunction');

module.exports.orderProduct = function (sql, params) {
    let { product_id, user_id, status } = params;
    const q = `insert into orders (product_id,user_id,status) values (${product_id},${user_id},${status})`;
    return commonFunction.excuteQuery(sql, q);
}

module.exports.getProductDetails = function (sql, params) {
    let { product_id } = params;
    const q = `select * from products where poduct_id=${product_id}`;
    return commonFunction.excuteQuery(sql, q);
}
module.exports.getAllProducts = function (sql) {
    const q = `select * from products`;
    return commonFunction.excuteQuery(sql, q);
}
module.exports.getAllOrders = function (sql, params) {
    let { role, user_id,page,limit } = params;
    let offset = ((page)-1)*limit;
    console.log("params=== ",params);
    let q = `select orders.*,products.* from orders INNER JOIN products ON products.product_id=orders.product_id`;
    if (role == 'user') {
        q = `${q} where orders.user_id=${user_id}`;
    }
    q = `${q} ORDER BY orders.order_id DESC  LIMIT ${limit} OFFSET ${offset}`;
    return commonFunction.excuteQuery(sql, q);
}
module.exports.getAllOrdersCount = function (sql, params) {
    let { role, user_id } = params;
    let q = `select count(order_id) as count from orders`;
    if (role == 'user') {
        q = `${q} where user_id=${user_id}`;
    }
    return commonFunction.excuteQuery(sql, q);
}

module.exports.updateOrderStatus = async function (sql, params) {
    let { order_id, status, product_id } = params;
    let q = '';
    if (status == 1) {
        q = `update products set available_count=available_count-1 where product_id=${product_id}`;
        await commonFunction.excuteQuery(sql,q);
    }
    q = `update orders set status=${status} where order_id=${order_id}`;
    return commonFunction.excuteQuery(sql, q);
}

