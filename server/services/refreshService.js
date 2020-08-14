const PythonShell = require('python-shell');
const assert = require('assert');
PythonShell.defaultOptions = { scriptPath: '../scripts'};

class RefreshService{
    constructor(req, res){
        this.req = req
        this.res = res
    }
    refresh(){
        let self = this;
        try{
            const pyshell = new PythonShell('oms.py');
            pyshell.on('message', function (message){
                //receive message sent from Python scripty
                res.json(message);
            });
            //end input stream, allow the process to exit
            pyshell.end(function (err){
                assert.equal(null, err);
                //res.send('data refreshed successfully');
                return self.res.status(200),json({
                    status: 'success'
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
}
module.exports = RefreshService