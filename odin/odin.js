//  External
var fs=require('fs')
// Internal 
var dict=require('./dict')
var jsonfmt=require('./fmt_json')
var mdfmt=require('./fmt_md')

//  TODO add as switches
var degree=2

// Debug helpers
function getMS(){ return Date.now() }
function logTime(str,ms){ console.log(str+" in "+(getMS()-ms))+"ms" } 
function logMem(){ console.log(process.memoryUsage()) }

// Analyze a single txt file
function single(path,destpath){
	// boring IO stuff
	console.log("Analyzing "+path)
	logMem()
	var t0=getMS()
	try{
		var data=fs.readFileSync(path,'utf8')
	}catch(e){
		console.error("Failed to read "+path)
		process.exit(1)
	}
	logTime("Read  " + data.length + " bytes",t0)
	logMem()

	// Create a  collection containing one text
	var dictobj=new dict.dict(degree)
	
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

	// TODO get export format by file ending
	console.log("exporting")
	var t0=getMS()
	var outdata=jsonfmt.format(dictobj)
	logTime("exported in ",t0)
	logMem()

	var outdata=mdfmt.format(dictobj)
	
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

if(argc<3){
	console.error("To few arguments")
	process.exit(1)
}

switch(cmd){
	case "single":
		if(argc<5){
			console.error("To few arguments")
			process.exit(1)
		}
		
		single(process.argv[3],process.argv[4])
		break;
	default:
		console.error("Unknown command "+cmd)
		process.exit(1)
		break;
}

process.exit(0)
