var db = require('./db');


module.exports={

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
	
		getupdate: function(abc, callback){
			console.log(id);
			
				console.log(id);
						//var sql = "select * from user where userid= '"+abc+"'";
			var sql = "update user set username='" + user.username + "', email='" + user.email + "', phone='" + user.phone + "', password='" + user.password + "', gender='" + user.gender + "', city='" + user.city + "' where userid=" + user.id;

			db.getResults(sql, function(result){
							
							if( result.length > 0 ){
								
								callback(result);
				
							}else{
								callback([]);
							}
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

	getprofile : function(abc,callback){

		console.log("id paisi");
		console.log(abc);

				var sql = "select * from user where userid= '"+abc+"'";

				db.getResults(sql, function (results) {

					if (results.length > 0) {
						callback(results);
					} else {
						callback([]);
					}
				});

			},

	


	insert : function(user, callback){
	    var sql = "insert into user values('','" + user.ename + "','" + user.cname + "','" + user.contact + "','" + user.username + "', '" + user.password + "')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update : function(user, callback){
		
		var sql = "update user set username='" + user.username + "', email='" + user.email + "', phone='" + user.phone + "', password='" + user.password + "', gender='" + user.gender + "', city='" + user.city + "' where userid=" + user.id;

		 db.execute(sql, function (status) {
			callback(status);
		});
	},
	delete : function(id, callback){
	    var sql = "delete from user where id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	},

	search: function(){}
}


