var db = require('./db');

module.exports={

    getById: function(id, callback){

        var sql = "select * from service where spid="+id;
        db.getResults(sql, function(result){

            if(result.length > 0 ){
                callback(result);
            }else{
                callback([]);
            }
        });
    },
    getResults: function(sql, callback){

        var connection = getConnection();
        connection.query(sql, function(error, results){

            callback(results);
        });

        connection.end(function(err) {
            console.log("Database connection is terminated.");
        });
    },



    search: function(){}
}


