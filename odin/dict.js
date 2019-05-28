// Constructor for dict object
function Dict(degree){
	this.texts={}
	this.degree=degree
	this.d=[]
	for(var i=0;i<=degree;i++) this.d.push({})
}

// TODO
// - implement hashes
// - handle duplicate names
// - switch to enalbe disable data storage for memory considerations
Dict.prototype.addText=function(name,data){
	this.texts[name]=data
}

// Add symbol to alphabet
Dict.prototype.addSymbol=function(symbol){
	if(typeof(this.alphabet[symbol])=="undefined") 
		this.alphabet[symbol]=symbol
}

// Return alphabet as array
// We get the unique from a degree zero table
// and find the symbols that come after empty  string
Dict.prototype.getAlphabet=function(){
	var unique=this.d[0]['']
	var ret=[]
	for(var k in unique) ret.push(k)
	return ret.sort()
}

// Add occurence of symbol appearing after stringg of symbols
Dict.prototype.addOccurence=function(l,string,symbol){
//	console.log("{"+string+"} => ["+symbol+"]")
	if(typeof(this.d[l][string])=="undefined"){
		var to={}
		to[symbol]=1
		this.d[l][string]=to
	}
	else if(typeof(this.d[l][string][symbol])=="undefined")
		this.d[l][string][symbol]=1
	else this.d[l][string][symbol]++
}

Dict.prototype.procText=function(name){
	var data=this.texts[name]
	var degree=this.degree

	for(var j=0;j<=degree;j++){
		for(var i=0;i<data.length-degree;i++){
			var back=data.substr(i,j)
			var s=data[i+j]

			this.addOccurence(j,back,s)
		}
	}
}

Dict.prototype.enterText=function(name,data){
	this.addText(name,data)
	this.procText(name)
}

exports.dict=Dict
