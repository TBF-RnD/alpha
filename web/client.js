/*
 * Ought to mirror Dict object in odin i.e. share a subset
 * of an "interface"
 *
 * Also see client.js in odin
 *
 * TODO
 *  - preemptive querying
 */

Client.prototype.onMessage=function(ev){
	console.log("Got message")
	console.log(ev.data)

	// TODO try catch
	var msg=JSON.parse(ev.data)

	console.log(msg)

	this.cache[msg.q]=msg

	if(msg.q==this.cquery) this.onupdate(msg)
}

function Client(url){
	this.ws=new WebSocket(url)
	this.state="waiting"
	this.cquery=""
	var selfref=this
	this.cache={}

	this.ws.onopen=function(){
		selfref.state="connected"
		console.log("Connected to "+url)
	}
	this.ws.onmessage=function(ev){ 
		console.log("got msg")
		selfref.onMessage(ev) 
	}
}
// Callback to run when receiving async reply on latest query
Client.prototype.setonupdate=function(cback){
	this.onupdate=cback
}

// Initiate asynchronous query to server
Client.prototype.asyncQuery=function(string_in,max_n){
	if(this.state!="connected"){
		console.error("Not connected")
		return
	}

	var msg={t:"predict",q:string_in}
	if(typeof(max_n)!="undefined")
		data.max_n=max_n

	this.ws.send(JSON.stringify(msg))

	return null
}

Client.prototype.predict=function(string_in,max_n){
	t0=this.cache
	t1=string_in
	console.log("querying cache for  "+string_in)
	if(typeof(this.cache[string_in])=="undefined"){
		console.log("MISS!!")
		// Start a query in background
		this.asyncQuery(string_in,max_n)
		// We're only interested in returning latest query
		// other queries still get cached
		this.cquery=string_in
		// return what we have in cache for now
	}else  console.log("HIT")
	return this.cache[string_in]
}
