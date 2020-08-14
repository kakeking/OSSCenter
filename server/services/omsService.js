const assert = require('assert');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/osscenter';

class OmsService{
     constructor(req, res){
     	this.req = req
     	this.res = res
     }

     addOms(){
     	let self = this;
        let omsItem = this.req.body;
        let omsId = Number(this.req.body._id) ;
        omsItem._id = omsId;
     	try{
     		MongoClient.connect(url, function(err, db){
                  assert.equal(null, err);
                  db.collection('oms').insertOne(omsItem, function(){
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

     getOms(){
     	let self = this;
     	try{
     		MongoClient.connect(url, function(err, db){
     			assert.equal(null, err);
     			let omsList = []
     			let cursor = db.collection('oms').find();

     			cursor.each(function(err, doc){
     				assert.equal(err, null);
     				if (doc != null){
     					omsList.push(doc)
     				} else{
     					return self.res.status(200).json({
     						status: 'success',
     						data: omsList
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

     getOmsById(){
        let self = this;
        let omsId = Number(this.req.params.id);
        try{
            MongoClient.connect(url, function(err, db){
                assert.equal(null, err);
                db.collection('oms').findOne({"_id": omsId}, function(err, doc){
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
	 getOmsByVersion(){
        let self = this;
        let version = this.req.params.version;
        try{
            MongoClient.connect(url, function(err, db){
                assert.equal(null, err);
                db.collection('oms').findOne({"version": version}, function(err, doc){
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

     deleteOms() {
        let self = this;
        let omsId = Number(this.req.params.id);
        try{
            MongoClient.connect(url, function(err, db){
                assert.equal(null, err);
                db.collection('oms').remove({"_id": omsId}, function(err, doc){
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
module.exports = OmsService