var db = require('./db');

module.exports = {

    getById: function(id, callback){
        console.log(id);
        
            console.log(id);
                    var sql = "select * from notice where userid="+id; 
                    db.getResults(sql, function(result){
                        
                        if( result.length > 0 ){
                            
                            callback(result);
            
                        }else{
                            callback([]);
                        }
                    });
                },
    

}


