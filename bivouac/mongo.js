(function(){
	
	//TODO refactor this into something looking less like the ramblings of a Cthulhu cultist
	
	
	
	var Db = require('mongodb').Db,
	  Connection = require('mongodb').Connection,
	    Server = require('mongodb').Server,
	  BSON = require('mongodb').BSONNative;

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;	
	var db = new Db('guardian', new Server(host, port, {}), {native_parser:true});
	var result = [];
	exports.VERSION = '0.1';	

	exports.get_collection_as_array = function(coll, callback, errcallback) {
		db.open(function(err, db) {
			if (!err) {
				db.collection(coll, function(err, collection) {
					if (!err) {
						collection.find(function(err, cursor) {
							if (!err) {
								//console.log(cursor);
								cursor.toArray(function(err, items) {
									if (!err) {
										result = items;
										if (items.length == 0) {
											return "EMPTY";
										}
										callback(result);
										db.close();
									} else {
										errcallback(err);
									}
								});
							} else {
								errcallback(err);
							}
						});				
					} else {
						errcallback(err);
					}
				});
			} else {
				errcallback(err);
			}
		});		
	};
	
	exports.get_collection_as_array_sorted = function(coll, sort, callback, errcallback) {
		db.open(function(err, db) {
			if (!err) {
				db.collection(coll, function(err, collection) {
					if (!err) {
						collection.find(sort, function(err, cursor) {
							if (!err) {
								//console.log(cursor);
								cursor.toArray(function(err, items) {
									if (!err) {
										if (items.length == 0) {
											console.log("******* empty response *******");
										}
										callback(items);
										db.close();
									} else {
										errcallback(err);
									}
								});
							} else {
								errcallback(err);
							}
						});				
					} else {
						errcallback(err);
					}
				});
			} else {
				errcallback(err);
			}
		});		
	};
	
	
}).call(this);
