commonFunction = require('../../common/commonFunction');

module.exports.getUserById = function (sql, reqParams) {
    let { user_name, password } = reqParams;
    let q = `select id,user_name,role from users where user_name='${user_name}' and password='${password}'`
    return commonFunction.excuteQuery(sql, q);
}
