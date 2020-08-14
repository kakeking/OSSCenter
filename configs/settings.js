require('dotenv').config({silent: true})

var path = require('path')
var _ = require('lodash')
var environment = require('./environment.js').get()
var baseLine = {
	app: {
		name: 'osscenter'
	},
	minify: 'default',
	render: {
		cli: 'lodash',
		lodash: {
			options: {}
		},
		ejs: {
			options: {}
		}
	},
	env: environment,
	//Root path of server
	root: path.join(__dirname, '/../../..'),
	//Server IP
	ip: process.env.IP || '0.0.0.0',
	hostname: process.env.HOST || process.env.HOSTNAME || 'localhost',
	//Enable Swagger.io at localhost:[port]/api/
	swagger: true,
	helmet: {
		//secure express apps by setting various HTTP headers
		// https://github.com/helmetjs/helmet
	},
	errorFormatter: function (param, msg, value) {
		var namespace = param.split('.')
		var root = namespace.shift()
		var formParam = root

		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']'
		}
		return {
			param: formParam,
			msg: msg
			value: value
		}
	}	
}

export.get = function (env) {
	return baseLine
}

exports.set = function (identier, value) {
	baseLine[identier] = value
	return baseLine
}