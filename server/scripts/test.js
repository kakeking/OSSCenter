var sshcon = require('../scripts/sshcon.js');
var async = require('async');

oms ={
	'name': 'OMS-253',
	'ID': '253',
	'south': '10.68.160.242',
	'north': '10.68.160.243',
	'username': 'Nemuadmin',
	'password': 'nemuuser',
	'superpw': 'nsn'
}

// function callback(data){
// 	console.log(data);
// }

// sshcon.getNetactNode7Ip(oms).then(function(result){
// 	console.log('netact node7 Ip is '+ result);
// 	return sshcon.getNetactHostName(result);
// }).then(function(result){
// 	console.log('netact Node18 Ip is' + result);
// })
sshcon.getNetactNode7Ip(oms).then (function([result,result1]){
	console.log(result+result1);
});

// sshcon.getNetactHostName('10.91.146.203');

// sshcon.getNetactHostName('10.91.146.203').then(function(result){
// 	console.log(result);
// });


