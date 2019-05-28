// Constructor for dict object
function Dict(degree){
	this.texts={}
	this.degree=degree
	this.d={}
}

// TODO
// - implement hashes
// - handle duplicate names
// - switch to enalbe disable data storage for memory considerations
Dict.prototype.addText=function(name,data){
	this.texts[name]=data
}

// Add occurence of symbol appearing after stringg of symbols
Dict.prototype.addOccurence=function(string,symbol){
//	console.log("{"+string+"} => ["+symbol+"]")
	if(typeof(this.d[string])=="undefined"){
		var to={}
		to[symbol]=1
		this.d[string]=to
	}
	else if(typeof(this.d[string][symbol])=="undefined")
		this.d[string][symbol]=1
	else this.d[string][symbol]++
}

Dict.prototype.procText=function(name){
	var data=this.texts[name]
	var degree=this.degree

	for(var j=0;j<=degree;j++){
		for(var i=0;i<data.length-degree;i++){
			var back=data.substr(i,j)
			var s=data[i+j]

//			console.log(j+"/"+degree+":"+i+"/"+data.length)
			this.addOccurence(back,s)
		}
	}
}

Dict.prototype.enterText=function(name,data){
	this.addText(name,data)
	this.procText(name)
}

exports.dict=Dict
