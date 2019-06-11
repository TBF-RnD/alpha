/* 
 * Connects to an odin server started with. Can query loaded 
 * database remotely. Useful for testing.
 *
 * node ./odin.js serve
 *  
 */

var argc=process.argv.length
var argv=process.argv

if(argc<3){
	console.error("To few arguments")
	process.exit(1)
}
var querys=argv[2]


var ws_cli=require("websocket").client

var ws=new ws_cli()

function close(){
	console.log("Connnection closed")
}
function message(msg){
	console.log("Received message:")
	var data=msg.utf8Data
	var o=JSON.parse(data)
	console.log(o)
	process.exit(0)
}
function connect(con){
	console.log("Got connection")
	
	con.on('close',close)
	con.on('message',message)

	con.sendUTF(JSON.stringify({t:"predict",q:querys,n:12}))
}
function connectFailed(){
	console.error("Failed to connect")
}

ws.on('connect',connect)
ws.on('connectFailed',connectFailed)

ws.connect("ws://localhost:22357")

