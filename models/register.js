var db = require('./db');

module.exports={


registersp : function(user, callback){
		var sql = "insert into user values('','" + user.username + "', '" + user.email + "', '" + user.phone + "','" + user.password + "','" + user.gender + "','" + user.city + "', '1')";
		db.execute(sql, function(status){
			callback(status);

		});
	},
	registerservice : function(user, callback){
		var sql = "insert into service values('','" + user.spid + "', '" + user.sname + "', '" + user.price + "','" + user.des + "')";
		db.execute(sql, function(status){
			callback(status);

		});
	},



registercp : function(user, callback){
	    var sql = "insert into user values('','" + user.username + "', '" + user.email + "', '" + user.phone + "','" + user.password + "','" + user.gender + "','" + user.city + "', '2')";
		db.execute(sql, function(status){
			callback(status);
			
		});
	},

}