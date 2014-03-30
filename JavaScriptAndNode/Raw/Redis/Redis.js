
/**
 * Connects to and runs a Redis bank and makes actions
 */
var redis = require('redis');
var client = redis.createClient();

client.set('someKey', 'someVal', redis.print);

client.get('someKey', function(err, data){
    if(!err){
        console.log('@client:get, #data', data);
    }else{
        console.log('@client:get, #err', err);
    }
});

client.hset('hashid', 'propName', 'propValue', function(err, reply){ !err && console.log('@hset', reply); });

client.hset('hashid', 'key', 'value', function(err, reply){
    if(!err){
        console.log('@client:hset, #reply', reply);
        client.hget('hashid', 'propName', function(err, data){
            if(!err){
                console.log('@client:hget, #data', data);
            }else{
                console.log('@client:hget, #err', err);
            }
        });
    }else{
        console.log('@client:hset, #err', err);
    }
});



