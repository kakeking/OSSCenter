const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/osscenter';

class NetactService{
     constructor(req, res){
     	this.req = req
     	this.res = res
     }

     insert(NetactItem, db, callback){
     	db.collection('netact').insertOne({
     		"item": NetactItem
     	}, function(){
     		callback()
     	})
     }

     addNetact(){
     	let self = this;
     	let netactItem = this.req.body.netactItem;
     	try{
     		MongoClient.connect(url, function(err, db){
                  assert.equal(null, err);
                  self.insert(netactItem, db, function(){
                  	db.close()
                  	return self.res.status(200).json({
                  		status: 'success'
                  	})
                  })
     		});
     	}
     	catch(error){
     		return self.res.status(500).json({
     			status: 'error',
     			error: error
     		})
     	}
     }

     getNetact(){
     	let self = this;
     	try{
     		MongoClient.connect(url, function(err, db){
     			assert.equal(null, err);
     			let netactList = []
     			let cursor = db.collection('netact').find();

     			cursor.each(function(err, doc){
     				assert.equal(err, null);
     				if (doc != null){
     					netactList.push(doc)
     				} else{
     					return self.res.status(200).json({
     						status: 'success',
     						data: netactList
     					})
     				}
     			});
     		});
     	}
     	catch(error){
     		return self.res.status(500).json({
     			status: 'error',
     			error: error
     		})
     	}
     }

    getNetactById(){
        let self = this;
        let netactId = Number(this.req.params.id);
        //let netactName = 'clab'+ netactId
        try{
            MongoClient.connect(url, function(err, db){
                assert.equal(null, err);
                db.collection('netact').findOne({"_id": netactId}, function(err, doc){
                    assert.equal(err, null);
                    if (doc != null){
                        return self.res.status(200).json({
                            status: 'success',
                            data: doc
                    })}
                });
            })
         }catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
	 }
	 
	 updateNetact() {
		 let self = this;
		 let netact = this.req.body
		 try{
			 MongoClient.connect(url, function(err, db){
				 assert.equal(null, err);
				 db.collection('netact').update({"_id": netact._id}, netact, {upsert: true}, function(err, doc){
					assert.equal(err, null);
					db.close()
					return self.res.status(200).json({
						status: 'success'
					})
					});
				 })
			 }catch(error){
				 return self.res.status(500).json({
					 status: 'error',
					 error: error
				 })
			 }
		 }

		 deleteNetact() {
			let self = this;
			let netactId = Number(this.req.params.id);
			try{
				MongoClient.connect(url, function(err, db){
					assert.equal(null, err);
					db.collection('netact').remove({"_id": netactId}, function(err, doc){
					   assert.equal(err, null);
					   db.close()
					   return self.res.status(200).json({
						   status: 'success'
					   })
					   });
					})
				}catch(error){
					return self.res.status(500).json({
						status: 'error',
						error: error
					})
				}
			}
	 }
module.exports = NetactService