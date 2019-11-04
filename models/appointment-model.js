var db = require('./db');


module.exports = {

    getByIdReq: function(id, callback){
        console.log(id);
        
            console.log(id);
                    var sql = "select * from appointment where request=0 and complete=0 and pay=0 and cid="+id ; 
                    db.getResults(sql, function(result){
                        
                        if( result.length > 0 ){
                            
                            callback(result);
            
                        }else{
                            
                            callback([]);
                        }
                    });
                },

                getByIdUp: function(id, callback){
                    console.log(id);
                    
                        console.log(id);
                                var sql = "select * from appointment where request=1 and complete=0 and pay=0 and cid="+id ; 
                                db.getResults(sql, function(result){
                                    
                                    if( result.length > 0 ){
                                        
                                        callback(result);
                        
                                    }else{
                                        
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
    getByIdCom: function(id, callback){
        console.log(id);
        
            console.log(id);
                    var sql = "select * from appointment where  request=1 and complete=1 and pay=1 and cid="+id ; 
                    db.getResults(sql, function(result){
                        
                        if( result.length > 0 ){
                            
                            callback(result);
            
                        }else{
                            
                            callback([]);
                        }
                    });
                },

    insert: function(appointment, callback){
	    var sql = "insert into appointment values('','"+appointment.cid+"', '"+appointment.serviceid+"', '"+appointment.location+"','"+appointment.time+"','"+appointment.price+"','','','');";
		db.execute(sql, function(status){
			callback(status);
			
		});
	},


    updatepay: function (id, callback) {
        var sql = "update appointment set complete=1, pay=1 where cid="+id;
        db.execute(sql, function (status) {
            callback(status);
        });

    },

    delete: function (id, callback) {
        var sql = "delete from appointment where cid="+id;
        db.execute(sql, function (status) {
            callback(status);
        });

    }

}


