var mongo = require('../mongo.js');
var s = mongo.get_collection_as_array('news', function(t) { console.log(t)});