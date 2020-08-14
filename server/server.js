const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const omsService = require('./services/omsService');
const netactService = require('./services/netactService');
const refreshService = require('./services/refreshService');
const app = express();


//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')))

// API location
// app.use('/api', api);
app.post('/api/oms/add', function(req, res){
	let omsServiceObj = new omsService(req, res)
	omsServiceObj.addOms()
})

app.get('/api/oms', function(req, res){
	let omsServiceObj = new omsService(req, res)
	omsServiceObj.getOms()
})

app.get('/api/oms/:id', function(req, res){
	let omsServiceObj = new omsService(req, res)
	omsServiceObj.getOmsById()
})

app.delete('/api/oms/:id', function(req, res){
	let omsServiceObj = new omsService(req, res)
	omsServiceObj.deleteOms()
})

app.post('/api/netact/add', function(req, res){
	let netactServiceObject = new netactService(req, res)
	netactServiceObject.addNetact()
})

app.get('/api/netact', function(req, res){
	let netactServiceObject = new netactService(req, res)
	netactServiceObject.getNetact()
})

app.get('/api/netact/:id', function (req, res) {
    let netactServiceObject = new netactService(req, res)
    netactServiceObject.getNetactById()
})

app.delete('/api/netact/:id', function(req, res){
	let netactServiceObj = new netactService(req, res)
	netactServiceObj.deleteNetact()
})

app.put('/api/netact', function (req, res){
	let netactServiceObject = new netactService(req, res)
	netactServiceObject.updateNetact()
})

/*app.get('/api/refresh', function(req, res){
	let refreshServiceObject = new refreshService(req, res)
	refreshServiceObject.refresh()
})*/

// Send all other requests to the Angular app
//    res.sendFile(path.join(__dirname, './src/index.html'));
//});

app.get('/', function(req, res){
	res.send('Welcome to OSSCenter API')
})

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));