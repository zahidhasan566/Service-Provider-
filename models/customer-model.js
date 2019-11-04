var db = require('./db');

module.exports = {

    getById: function(id, callback){
        console.log(id);
        
            console.log(id);
                    var sql = "select user.userid, user.username , user.email, user.phone, user.gender, user.city, serviceprovider.skill FROM user join serviceprovider on user.userid='"+id+"'  and serviceprovider.userid='"+id+"' " ; 
                    db.getResults(sql, function(result){
                        
                        if( result.length > 0 ){
                            
                            callback(result);
            
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
    getprovider : function(callback){
		var sql = "select * from user where type= 1";

		db.getResults(sql, function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},

    delete: function (id, callback) {
        var sql = "delete from user where id=?";
        db.execute(sql, [id], function (status) {
            callback(status);
        });

    }

}


