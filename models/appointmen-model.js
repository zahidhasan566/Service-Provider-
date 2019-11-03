var db = require('./db');


module.exports = {

    getById: function (id, callback) {

        var sql = "select * from appointment  where appid=?";
        db.getResults(sql, [id], function (result) {

            //console.log(result);
            if (result.length > 0) {
                callback(result[0]);
            } else {
                callback([]);
            }
        });
    },



    getAll: function (callback) {
        var sql = "select * from appointment";

        db.getResults(sql, [], function (results) {

            if (results.length > 0) {
                callback(results);
            } else {
                callback([]);
            }
        });
    },

    insert: function(callback)
    {
        var sql= "insert into appointment values('','" + user.username + "', '" + user.email + "', '" + user.phone + "','" + user.password + "','" + user.gender + "','" + user.city + "', '1')";
        db.execute(sql, function(status){
			callback(status);
			
		});
    },


    update: function (user, callback) {
        var sql = "update user set username=?, password=? where id=?";
        db.execute(sql, [user.username, user.password, user.id], function (status) {
            callback(status);
        });

    },

    delete: function (id, callback) {
        var sql = "delete from user where id=?";
        db.execute(sql, [id], function (status) {
            callback(status);
        });

    }

}


