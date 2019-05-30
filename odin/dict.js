// Constructor for dict object
function Dict(options){
	// TODO make  exp k configurable
	// - I assume that size ought to be related to alphabet size
	// - so expk ought to be bigger than the alphabet size
	// 27 and eulers number are as such almost arbitrary and chosen because
	// I find the numbers neat! 42*pi would probably also work ok!!
	this.expk=27*Math.E
	this.texts={}
	this.degree=options.degree
	this.permutation=options.permutation
	this.d=[]
	for(var i=0;i<=this.degree;i++) this.d.push({})
}

// Get last n symbols from string
// substr(-0) becomes substr(0) so hence a replacement
function __last_n_sym(s,n){ return s.substr(s.length-n,s.length) }

// Whem dealing with combinations the order of the elements of 
// the  string doesn't matter
// TODO
//   -  runs quite often, possible / meaningful to optimize?
//   maybe  remove functionality in  it's entirety
Dict.prototype.sortString=function(s){
	var a=[]
	for(var i=0;i<s.length;i++) a.push(s[i])
	a.sort()
	var so=""
	for(var k in a) so+=a[k]
	return so
}

// TODO implement cache of string -> results
Dict.prototype.predict=function(string_in){
	var string=this.sortString(string_in)
	var mult=1
	var res={}
	var tot_f_tot=0

	var  degree=this.degree
	var degree=2

	for(var i=0;i<=degree;i++){
		var needle=__last_n_sym(string,i)
		var subset=this.d[i]

		var tot_f=0
		if(typeof(subset[needle])=="undefined") continue
		var matches=subset[needle]
		
		for(var sym in matches){
			var f=matches[sym]

			if(typeof(res[sym])=="undefined") res[sym]=f*mult
			else res[sym]+=f*mult

			tot_f+=f
		}
//		console.log("sum(f)="+tot_f)
		tot_f_tot+=tot_f*mult

		// A n+1 degree match is valued expk times a n degree match
		mult*=this.expk
	}
//	console.log("Sym(tot_f)"+tot_f_tot)
	
	
	// Sort
	var  sorted=[]
	for(var k in res){ sorted.push({s:k,f:res[k]}) }
	sorted.sort(function(a,b){ return b.f-a.f  })

	/*
	for(var k in sorted){
		console.log(sorted[k].s+" "+sorted[k].f)
	}
	*/
	var  i=0
	console.log("TOP")
	for(var k in sorted){
		console.log(sorted[k].s+" "+sorted[k].f)
		i++
		if(i>4)  break
	}

	return {m:sorted,sum_f:tot_f_tot}
}

// loads a JSON object containing statistics
Dict.prototype.loadProfile=function(d){
	console.log("Loaded  profile of degree: "+d.length)
	this.degree=d.length
	this.d=d
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
Dict.prototype.addOccurence=function(l,string_in,symbol){
	var string=this.permutation?string_in:this.sortString(string_in)

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


if(typeof(exports)=="object"){
	exports.dict=Dict
}
