
/**
 * Connects to a Mongo Database using raw JavaScript
 */
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('MyMongo', server);

console.log('@db');
db.open(function(err, db){
    if(!err){
        db.dropCollection('mycollection', function(err, result){
            if(err){
                console.log('@dropCollection, #err', err);
            }else{
                console.log('@dropCollection, #result', result);
            }
        });

        db.collection('mycollection', function(err, collection){
            collection.remove(null, {safe: true}, function(err, result){
                if(!err){
                    console.log('@remove, #result', result);
                    var doc1 = {id: 1, title: 'The First Entry'};
                    var doc2 = {id: 2, title: 'The Second Entry'};
                    
                    collection.insert([doc1, doc2], {safe: true}, function(err, result){
                        if(err){
                            console.log('@insert, #error', err);
                        }else{
                            console.log('@insert, #result', result);
                            collection.update({id: 2}, {$set: {
                                    title: 'This Second Entry Has Been Modified!'
                                }}, {safe: true}, function(err, result){
                                    if(!err){
                                        console.log('@update, #result', result);
                                        collection.findOne({id: 2}, function(err, doc){
                                            if(!err){
                                                console.log('@insert, #doc', doc);
                                                db.close();
                                            }else{
                                                console.log('@findOne, #error', err);
                                            }
                                        });
                                    }else{
                                        console.log('@update, #err', err);
                                    }
                                });
                        }
                    });
                    

                }
            });
        });
    }else{
        console.log('@db.open, #err', err);
    }
});


