// var OMS = {
// 	HOST:"10.68.152.202",
// 	USERNAME:"Nemuadmin",
// 	PASSWORD:"nemuuser",
// }
// var host = {
// 	server: {
// 		host: OMS.HOST,
// 		userName: OMS.USERNAME,
// 		password: OMS.PASSWORD
// 	},
// 	commands: [
// 	    "su root",
// 		"printIOR `fsnwi3ctl -i | grep 'NAR_REG_SERVICE_IOR' | sed -e 's/NAR_REG_SERVICE_IOR=//'` | grep host"

// 	],
// 	onCommandProcessing( command, response, sshObj, stream){
// 		if (command.match(/root/)&& response.indexOf("Password"!= -1)){
// 			stream.write('nsn\n');
// 		}
// 	},
// 	onEnd( sessionText, sshObj) {
//         this.emit("msg", sessionText);
// 	}
// };
// var SSH2Shell = require('ssh2shell');

// SSH = new SSH2Shell(host);
// callback = function(sessionText){
// 	console.log(sessionText)
// }

// var output  = SSH.connect();
// console.log(output);
var Connection = require('ssh2');

exports.getNetactNode7Ip = function(oms, result){
return new Promise(function(resolve, reject){
commands = ["su root",
                "printIOR `fsnwi3ctl -i | grep 'NAR_REG_SERVICE_IOR' | sed -e 's/NAR_REG_SERVICE_IOR=//'` | grep host",
                "currentset"];
command = "";
pwSent = false;
sudosu = false;
conn = new Connection();

conn.on('ready', function(err, data){
	if (err) {
		// callback(err);
		return(err);
	}else {
	// console.log('Connection :: ready');
	conn.shell(function(err, stream){
		if(err) {throw err};
		stream.on('close', function(){
			//console.log('stream :: close');
			conn.end();
		}).on('data', function(data){
			//handle su password prompt
			if (command.match(/root/) && !pwSent) {
				if (command.indexOf("su root") > -1) {
					sudosu = true;
				}
				if (data.indexOf(":") >= data.length -2) {
					pwSent = true;
					stream.write(oms.superpw + "\n");
				}
			}else{
				//detect the right condition to send the next command
				var dataLength = data.length;
				if (dataLength > 2 && (data.indexOf("$") >= dataLength -2 || data.indexOf("#") >= dataLength -2)){
					
					if (commands.length > 0) {
						command = commands.shift();
						stream.write(command + '\n');
					}else{
						//su requires two exit commands to close the session
						if (sudosu) {
							sudosu = false;
							stream.write('exit\n');
						} else {
							stream.end('exit\n');
						}
					}
				}else{
					   if (data.indexOf("host") >= -1){
                       var output = data.toString();
                       // console.log(output);
                       var re = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
                       var release = /.*R_GOMS.*/;
                       var match = output.match(re);
                       var releasematch = output.match(release);
                       if (match !== null){
                       	let netactNode7Ip = match[0];
                       	
                       }
                       if (releasematch !== null){
                       	var temp = releasematch[0];
                       	let release = temp.replace('CLA-0', '').trim();
                        //callback(netactNode7Ip);
                        }
                        resolve([netactNode7Ip,release]);

					//console.log('STDERR: ' + data);
				        }
					}
			}

		}).stderr.on('data', function(data) {
			// console.log('STDERR: ' + data);
		});
		//first command
		command = commands.shift();
		console.log + "first command: " + command;
		stream.write( command + '\n');
	});
}}).connect({
	host: oms.south,
	port: 22,
	username: oms.username,
	password: oms.password
})
})};

exports.getNetactHostName = function(netactNode7Ip, result){
	return new Promise(function(resolve, reject){
	command ='cat /etc/hosts';
	var conn = new Connection();
    
	conn.on('ready', function(err, data){
	if (err) {
		// callback(err);
		return err;
	}else {
	// console.log('Connection :: ready');
	conn.shell(function(err, stream){
		if(err) {//callback(err)};
		return err;}
		stream.on('close', function(){
			// console.log('stream :: close');
			conn.end();
		}).on('data', function(data){		
				//detect the right condition to send the next command
				var dataLength = data.length;
				if (dataLength > 2 && (data.indexOf("$") >= dataLength -2 || data.indexOf("#") >= dataLength -2)){
					if(command.length > 0){
					// if (command.length > 0) {
						stream.write(command + '\n');
						command = '';
									
					}else{
						stream.write('exit\n');	
					}                        
					   // console.log('STDERR: ' + data)
					   // stream.write('exit\n');
			  }else{
			  	if(data.indexOf('node18') >= -1){
			  		var output = data.toString();
			  		var reline = /.*clab\d{3,4}node18.*/;
			  		var match = output.match(reline);
			  		if (match != null){
			  		var matchline = match[0];
			  		var reip = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
			  		var rename = /clab\d{3,4}node18/;
			  		var matchip = matchline.match(reip);
			  		var matchname = matchline.match(rename);
			  		name = matchname[0].replace('node18', '');
			  		if (matchip != null){
			  		result= matchip[0]+name;
			  		resolve(result);
			  	     }
			  	   }
           
			  	}else{
			  		console.log("netact not stable, not able to get information");
			  	}

			  }

		}).stderr.on('data', function(data) {

		});
	});
}}).connect({
	host: netactNode7Ip,
	port: 22,
	username: 'omc2',
	password: 'zhouhang2'
})
})}










