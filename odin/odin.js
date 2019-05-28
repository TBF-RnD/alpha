var fs=require('fs')

// Analyze a single txt file
function single(path){
	console.log("Analyzing "+path)
	try{
		var data=fs.readFileSync(path,'utf8')
	}catch(e){
		console.error("Failed to read "+path)
		process.exit(1)
	}
	console.log("Read  " + data.length + " bytes")
}

// Parse command line switches and execute
var cmd=process.argv[2]
var argc=process.argv.length

console.log(process.argv)

if(argc<3){
	console.error("To few arguments")
	process.exit(1)
}

switch(cmd){
	case "single":
		if(argc<4){
			console.error("To few arguments")
			process.exit(1)
		}
		
		single(process.argv[3])
		break;
	default:
		console.error("Unknown command "+cmd)
		process.exit(1)
		break;
}

process.exit(0)
