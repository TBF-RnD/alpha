//  External
var fs=require('fs')
var path=require('path')
var http=require('http')
var url=require('url')
var ws_server=require('websocket').server

// Constants
var mime_types={
	"html":"text/html",
	"css":"text/css",
	"js":"text/javscript"}
var def_mime="text/text"

// TODO probably breaks on windows
var web_path="../web"
var ext_path="../ext"
var mod_path="../models"
var odin_path="."

// Internal 
var dict=require('./dict')
var lib=require('./lib')
var jsonfmt=require('./fmt_json')
var mdfmt=require('./fmt_md')

//  TODO add as switches
var degree=3
var port=22357

//  State
var serving=false
var model=false

// Debug helpers
function getMS(){ return Date.now() }
function logTime(str,ms){ console.log(str+" in "+(getMS()-ms))+"ms" } 
function logMem(){ console.log(process.memoryUsage()) }

function not_implemented(req,res){
	res.writeHead(500)
	res.write("500: Not implemented")
	res.end()	
}

function not_found(req,res){
	res.writeHead(404)
	res.write("404: Not found")
	res.end()	
}

function  httpReq(req,res){
	console.log("Got http request")
		
	if(!model) not_implemented(req,res)

	var pathname=url.parse(req.url).pathname

	//  TODO
	//  	- use path.join
	//  	- sanitize request
	if(pathname=="/") fpath=web_path+"/"+model+".html"
	else if(pathname.substr(0,4)=="/ext") 
		fpath=ext_path+"/"+pathname.substr(4)
	else if(pathname.substr(0,7)=="/models")
		fpath=mod_path+"/"+pathname.substr(7)
	else if(pathname.substr(0,5)=="/odin")
		fpath=odin_path+"/"+pathname.substr(5)
	else fpath=web_path+"/"+pathname

	var ext=path.extname(fpath)
	var  cmime=def_mime
	if(typeof(mime_types[ext])!="undefined") 
		cmime=mime_types[ext]
	
	fs.readFile(fpath,function(err,data){
		if(err){
			not_found(req,res)
			return
		}
		res.writeHead(200,cmime)
		res.write(data)
		res.end()
	})
}

function serve(db,port){
	console.log("Loading library:  "+db)
	var libo=loadLib(db) 


	console.log("Attempting to start server @ port "+port)
	var server=http.createServer(httpReq
	).listen(port,function(){
		console.log("listening to port "+port)
	})

	ws=new ws_server({httpServer:server})
	
	ws.on('request',function(req){
		console.log("Got websocket  request")
		
		con=req.accept()
		con.on('message',function(msg){
			console.log('msg')
			console.log(msg)

			var jo=JSON.parse(msg.utf8Data)
				
			//  FIXME handle jo.t
			//  n : max numbers should not be mandatory

			var  query=jo.q
			
			var resp=libo.predict(query,jo.n)
			console.log(resp)
			con.sendUTF(JSON.stringify(resp))	
		})
		con.on('close',function(){
			console.log("Connection closed")
		})
	})
}

// compiles dictionaries in srcs into library
function compile(dest,srcs){
	console.log("compiling")
	console.log(srcs)
	console.log("into => "+dest)
	var lobj=new lib.lib()
	for(var k in srcs){
		var pathname=srcs[k]
		console.log(pathname)
		var dictobj=load(pathname) 
		
		var ext=path.extname(pathname)
		var name=pathname.substr(0,pathname.length-ext.length)
		lobj.addDict(name,dictobj,1)
	}

	console.log("exporting")
	var t0=getMS()
	var ext=path.extname(dest)
	if(ext==".json"){
		outdata=jsonfmt.format_dict(lobj)
	}else if(ext==".js"){
		outdata="library="+jsonfmt.format_dict(lobj)
	}else{
		console.error("Unsupported extension: "+ext)
		process.exit(1)
	}
	logTime("exported in ",t0)
	logMem()

	console.log("writing")
	var t0=getMS()
	try{
		var data=fs.writeFileSync(dest,outdata,'utf8')
	}catch(e){
		console.error("Failed to write "+dest)
		process.exit(1)
	}
	logTime("Wrote in ",t0)
	logMem()
}

function loadLib(db){
	var ext=path.extname(db)
	if(ext!=".json"){
		console.error("db must be in json format")
		process.exit(1)
	}
	var t0=getMS()
	try{
		var data=fs.readFileSync(db,'utf8')
	}catch(e){
		console.error("Failed to read "+db)
		process.exit(1)
	}
	logTime("Read  " + data.length + " bytes",t0)

	// TODO try catch
	var  t0=getMS()
	var d=JSON.parse(data)
	logTime("Parsed JSON",t0)
	
	var libo=new lib.lib()
	libo.loadData(d)
	
	return libo
}
function load(db){
	var ext=path.extname(db)
	if(ext!=".json"){
		console.error("db must be in json format")
		process.exit(1)
	}
	var t0=getMS()
	try{
		var data=fs.readFileSync(db,'utf8')
	}catch(e){
		console.error("Failed to read "+db)
		process.exit(1)
	}
	logTime("Read  " + data.length + " bytes",t0)

	// TODO try catch
	var  t0=getMS()
	var d=JSON.parse(data)
	logTime("Parsed JSON",t0)

	var dictobj=new dict.dict(options)
	dictobj.loadProfile(d)
	
	return dictobj
}

//  Prints  out strings sorted by frequency
//  only meaningful when m=1,  I think
function  strings_freq(db){
	var dictobj=load(db) 
	strings=dictobj.getStringsByFreq()
	console.log(strings)
}
function  strings_val(db){
	var dictobj=load(db) 
	dictobj.autoAdjustExpk()
	console.log("expk  adjusted to: "+this.expk)
	strings=dictobj.getStringsByVal()
	console.log(strings)
}

// Query a database 
function query(db,query,options){
	var dictobj=load(db) 
	var ret=dictobj.predict(query)
	console.log("QUERY:  "+query)
	console.log(ret)
}

// Analyze a single txt file
function single(srcpath,destpath,options){
	// boring IO stuff
	console.log("Analyzing "+srcpath)
	logMem()
	var t0=getMS()
	try{
		var data=fs.readFileSync(srcpath,'utf8')
	}catch(e){
		console.error("Failed to read "+srcpath)
		process.exit(1)
	}
	logTime("Read  " + data.length + " bytes",t0)
	logMem()

	// Create a  collection containing one text
	var dictobj=new dict.dict(options)
	
	// Add text to dictionary
	console.log("adding "+path+" to dict")
	var t0=getMS()
	dictobj.addText(path,data)
	logTime("added ",t0)
	logMem()

	// Generate frequency profile
	console.log("Processing: "+path)
	var t0=getMS()
	dictobj.procText(path)
	logTime("processed  "+path,t0)
	logMem()

	var ext=path.extname(destpath)
	console.log("exporting")
	var t0=getMS()
	var data=""
	if(ext==".js"){
		var name=destpath.substr(0,destpath.length-ext.length)
		outdata='profiles["'+name+'"]='+jsonfmt.format(dictobj)
	}else if(ext==".json")
		outdata=jsonfmt.format(dictobj)
	else if(ext==".md")
		outdata=mdfmt.format(dictobj)
	else{
		console.error("Unknown format "+ext)
		process.exit(1)
	}
	logTime("exported in ",t0)
	logMem()
	
	try{
		var data=fs.writeFileSync(destpath,outdata,'utf8')
	}catch(e){
		console.error("Failed to write "+destpath)
		process.exit(1)
	}
}

// Parse command line switches and execute
var cmd=process.argv[2]
var argc=process.argv.length

var argv=process.argv
var a=argv.shift()
var n=argv.shift()

var options={permutation:true,degree:degree} 

console.log(a+" executing  "+n)
console.log(argv)

var n=4
var m=1

// Get switches --
while(typeof(argv[0])!="undefined" && argv[0].substr(0,2)=="--"){
	var s=argv.shift().substr(2)
	console.log("S:"+s)
	switch(s){
		case "n":
			if(argv.length<1){
				console.error("To few arguments")
				process.exit(1)
			}
			n=parseInt(argv.shift())
			break;
		case "combination":
			console.log("combination mode: order doesn't matter")
			options.permutation=false
			break;
		case "permutation":
			options.permutation=true
			break;
		case "m":
			if(argv.length<1){
				console.error("To few arguments")
				process.exit(1)
			}
			m=parseInt(argv.shift())
			break;
		default:
			console.error("unknown switch: "+s)
			process.exit(1)
			break;
	}
}

var cmd=argv.shift()
var argc=argv.length

options.n=n
options.m=m

console.log("Alive")

switch(cmd){
	case "doug":
		serving=true
		model="doug"
		if(argc<1){
			console.error("To few arguments")
			process.exit(1)
		}
		serve(argv[0],port)
		break;
	case "serve":
		serving=true
		if(argc<1){
			console.error("To few arguments")
			process.exit(1)
		}
		serve(argv[0],port)
		break;
	case "single":
		if(argc<2){
			console.error("To few arguments")
			process.exit(1)
		}
		single(argv[0],argv[1],options)
		break;
	case  "query":
		if(argc<2){
			console.error("To few arguments")
			process.exit(1)
		}
		query(argv[0],argv[1],options)
		break;
	case "strings_val":
		if(argc<1){
			console.error("To few arguments")
			process.exit(1)
		}
		strings_val(argv[0])
		break;
	case "strings_freq":
		if(argc<1){
			console.error("To few arguments")
			process.exit(1)
		}
		strings_freq(argv[0])
		break;
	case "compile":
		var into=argv.shift()
		if(argc<1){
			console.error("To few arguments")
			process.exit(1)
		}
		compile(into,argv)
		break;
	default:
		console.error("Unknown command "+cmd)
		process.exit(1)
		break;
}

//  Exit 0 on success
if(!serving) process.exit(0)
