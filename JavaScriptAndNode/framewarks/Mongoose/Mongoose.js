
/**
 * Connecting to MongoDB via the Mongoose Module
 */
var mongoose = require('mongoose')
  , db = mongoose.connection;
  
mongoose.connect('mongodb://127.0.0.1/WidgetDB', function(err){
    if(!err){
        console.log('@.connect', 'Connected to Mongoose');
    }else{
        console.log('@.connect, #err', 'Could not connect to Mongoose');
    }
});

db.on('open', function(){
    console.log('Connected to Mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;
    var WidgetSchema = new Schema({
        sn: {type: String, require: true, trim: true, unique: true},  // serial number
        name: {type: String, required: true, trim: true},
        desc: String,
        price: Number
    });

    var Widget = mongoose.model('Widget', WidgetSchema);
    
    Widget.remove({sn: '12345asdfg'}, function(err, data){
        if(!err){
            console.log('@remove, #data', data);
        }else{
            console.log('@remove, #err', err);
        }
    });
    Widget.remove({sn: '23456sdfgh'}, function(err, data){
        if(!err){
            console.log('@remove, #data', data);
        }else{
            console.log('@remove, #err', err);
        }
    });

    var entry = {
        sn: '12345asdfg',
        name: 'Widget1',
        price: 20.00,
        desc: 'First widget'
    };
    var entry2 = {
        sn: '23456sdfgh',
        name: 'Widget2',
        price: 40.00,
        desc: 'Second widget'
    };

    var widgetObj = new Widget(entry);
    var widgetObj2 = new Widget(entry2);

    widgetObj.save(function(err, data){
        if(!err){
            console.log('@save, #data', data);
        }else{
            console.log('@save, #err', err);
        }
    });
    widgetObj2.save(function(err, data){
        if(!err){
            console.log('@save, #data', data);
            var entry2Update = {
                sn: '23456sdfgh',
                name: 'Widget2',
                price: 40.00,
                desc: 'Second widget Updated!'
            };
            
            Widget.update({sn: '23456sdfgh'}, entry2Update, function(err, data){
                if(!err){
                    console.log('@update, #data', data);
                    Widget.findOne({sn: '23456sdfgh'}, function(err, doc){
                        if(!err){
                            console.log('@findOne, #doc', doc);
                        }else{
                            console.log('@findOne, #err', err);
                        }
                    });
                    Widget.find({name: /^Widget/}, function(err, docs){
                        if(!err){
                            console.log('@find, #docs', docs);
                        }else{
                            console.log('@find, #err', err);
                        }
                    });
                }else{
                    console.log('@update, #err', err);
                }
            });
        }else{
            console.log('@save, #err', err);
        }
    });
    
            
    
                    
    
});
    











