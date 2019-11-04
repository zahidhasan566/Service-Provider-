var db = require('./db');

module.exports={

    getfeed : function(callback){
		var sql = "select * from feedback";

		db.getResults(sql, function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},





}