var fs=require("fs")

// Settings
var corpus_path="/storage/emulated/0/corpus_light"
var ngram=5
var out_path="./output/"

var collections=[]

function getMS(){ return Date.now() }
function logTime(str,ms){ console.log(str+" in "+(getMS()-ms))+"ms" } 

function Collection(path,dir){
	 this.path=path+"/"+dir
	 this.dir=dir
	 this.d={}
	 this.read=0

	 var selfref=this

	 console.log("** Collection "+dir)
	 var t0=getMS()
	 var files=fs.readdirSync(this.path,{withFileTypes:true})
	 var n_files_tot=0;
	 var n_files_proc=0;

	 for(var k in files){
			var path=files[k]	
			if(!path.isFile()) continue
			var  selfref=this
			var data=fs.readFileSync(this.path+"/"+path.name,'utf8')
			this.procFile(path.name,data)
	 }
}

Collection.prototype.save=function(){
	 var dest=out_path+this.dir+".json"
	 fs.writeFile(dest,JSON.stringify(this.d),function(err){
			if(err) console.log("Failed to write to "+dest)
			else console.log("Wrote to "+dest)
	 })
}

// TODO a lot of optimizations to be done
Collection.prototype.procFile=function(path,data){
	 console.log("Processing "+path+" of size "+data.length)
//	 console.log(typeof(data))
	 var t0=getMS()

	 for(var j=0;j<=ngram;j++){
			for(var i=0;i<data.length-ngram;i++){
				 var back=data.substr(i,ngram)
				 var s=data[i+ngram]

				 // update freq profile
				 if(typeof(this.d[back])=="undefined")
						this.d[back]={s:1}
				 else if(typeof(this.d[back][s])=="undefined")
						this.d[back][s]=1
				 else this.d[back][s]++
			}
	 }

//	 console.log(JSON.stringify(this.d))
	 logTime(path,t0)
}

console.log("*** Scanning "+corpus_path)
//var path="/gutenberg_selected"
//collections[path]=new Collection(corpus_path,path)
var paths=fs.readdirSync(corpus_path,{withFileTypes:true})
for(var k in paths){
	 var path=paths[k]
	 if(!path.isDirectory()) continue 
	 var c=new Collection(corpus_path,path.name)
	 console.log("Exporting")
	 console.log(process.memoryUsage())
	 c.save()
	 console.log("Saved")

	 console.log("Invoking garbage collector")
	 try{
			if(global.gc) global.gc()
	 }catch(e){
			console.log("run with --expose-gc")
	 }
	 console.log("Garbage collected?")
	 console.log(process.memoryUsage())
}

/*
fs.readdirSync(corpus_path,{withFileTypes:true},function(err,paths){
	 if(err){
			console.log("Error reading dir: "+corpus_path)
			return
	 }
	 
	 console.log(paths.length)
	 for(var k in paths){
			var path=paths[k]
			if(!path.isDirectory()) continue 
			collections[path.name]=new Collection(corpus_path,path.name)
	 }
			//	 paths.forEach(function(path){
//			if(!path.isDirectory()) return 
	 
//			collections[path]=new Collection(corpus_path,path.name)
//	 })

})
*/
