
/**
 * Uses the MySQL driver along with the Queues-Wrapper
 *  (for queues and transactions).
 */
var mysql = require('mysql');
var queues = require('mysql-queues');

var mydb = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: '',
    password: '',
    database: 'mydb'
}).query('USE mydb');

queues(mysql, true);

var q = mysql.createQueue();

q.query('insert into tabletest1 (title, text, created) values(?,?,NOW())', ['Title One', 'Text 1']);

q.execute();

mysql.query('select * from tabletest1 order by id', function(err, results, fields){
    if(!err){
        console.log('@query:select, #results, #fields', results, fields);
        mysql.end();
    }else{
        console.log('@query:select, #err', err);
    }
});


