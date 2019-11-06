var db = require('./db');

module.exports = {

    getById: function(id, callback){
        console.log(id);
        
            console.log(id);
                    var sql = "select * from feedback where receiver="+id; 
                    db.getResults(sql, function(result){
                        
                        if( result.length > 0 ){
                            
                            callback(result);
            
                        }else{
                            callback([]);
                        }
                    });
                },

                insert: function(feedback, callback){
                    var sql = "insert into feedback values('','"+feedback.cid+"', '"+feedback.serviceid+"', '"+feedback.message+"');";
                    db.execute(sql, function(status){
                        callback(status);
                        
                    });
                },
    

}


