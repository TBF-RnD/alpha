/* 
 * Connects to an odin server started with. Can query loaded 
 * database remotely. Useful for testing.
 *
 * node ./odin.js serve
 *  
 */

var ws_cli=require("websocket").client

var ws=new ws_cli()

function close(){
	console.log("Connnection closed")
}
function message(msg){
	console.log("Received message:")
	console.log(msg)
}
function connect(con){
	console.log("Got connection")
	
	con.on('close',close)
	con.on('message',message)

	con.sendUTF(JSON.stringify({t:"predict",q:"Telecom",n:12}))
}
function connectFailed(){
	console.error("Failed to connect")
}

ws.on('connect',connect)
ws.on('connectFailed',connectFailed)

ws.connect("http://localhost:22357")
