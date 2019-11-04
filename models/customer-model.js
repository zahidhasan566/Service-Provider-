var db = require('./db');

module.exports = {

    getById: function (id, callback) {

        var sql = "select * from user where id=?";
        db.getResults(sql, [id], function (result) {

            //console.log(result);
            if (result.length > 0) {
                callback(result[0]);
            } else {
                callback([]);
            }
        });
    },


	getprofile : function(id, callback){
		var sql = "select * from user where type= 4";

		db.getResults(sql, function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},


    validate: function (user, callback) {
        var sql = "select * from user where username=? and password=?";

        db.getResults(sql, [user.username, user.password], function (result) {

            if (result.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    getAll: function (callback) {
        var sql = "select * from user where type=2";

        db.getResults(sql, [], function (results) {

            if (results.length > 0) {
                callback(results);
            } else {
                callback([]);
            }
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


