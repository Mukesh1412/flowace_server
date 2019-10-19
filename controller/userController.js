const userDataServiceProvider = require("../services/sql/userDataServiceProvider");

module.exports.getUserById =  function (req, res, next) {
        const sql = req.app.get('sql');
        userDataServiceProvider.getUserById(sql, req.body).then(userDetails => {
            // console.log("user details ", userDetails); 
            return res.status(201).json({
                success: true,
                message: 'successfully fetched',
                user_details: userDetails
            })
        }).catch(err => {
            console.log(err);
            next(err);
        })
    }
