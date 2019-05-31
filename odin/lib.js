if(typeof(exports)!="undefined"){
	var edict=require("./dict.js")
}

function Library(){
	this.dicts={}
	this.n_dicts=0
}


Library.prototype.addDict=function(name,dict,weight){
	var w=1

	this.n_dicts++

	if(typeof(weight)!="undefined") w=weight

	this.dicts[name]={d:dict,w:w}
}

// Composite prediction merged from dictionaries adjusted by weight
// mirrors  predict in dict implement abstraction!!
Library.prototype.predict=function(string_in){
	var comp={}
	console.log("libpred:  "+string_in)
//	console.log("Got "+this.n_dicts+" dictionaries")
	for(var k in this.dicts){
		var  dict=this.dicts[k]
//		console.log("Looking at:  " +k)
		var sub=dict.d.predict(string_in)
		console.log("weight:  "+dict.w)
		for(var  k in sub.m){
//			console.log(k+"/"+sub[k])
			var el=sub.m[k]
//			var v=dict.w*el.f/sub.sum_f
			var v=dict.w*el.f/(sub.sum_f*this.n_dicts)

			if(typeof(comp[el.s])=="undefined") comp[el.s]=v
			else comp[el.s]+=v
//			console.log({s:el.s,v:v})
//			comp.push({s:el.s,v:v})
		}
	}
	/*
	console.log("NTOPunsorted")
	for(var i=0;i<4;i++){
		console.log(comp[i])
	}*/
	var  sorted=[]
	for(var k in comp){ sorted.push({s:k,v:comp[k]}) }
	sorted.sort(function(a,b){ return b.v-a.v })
	
	/*
	console.log("NTOP sorted")
	for(var i=0;i<4;i++){
		console.log(sorted[i])
	}
	*/
	
	return {m:sorted}
}

// TODO
// - perhaps to much is passed along in  json object?
Library.prototype.loadData=function(lobj){
	this.n_dicts=lobj.n_dicts
	for(var name in lobj.dicts){
		var ndict
		if(Dict) ndict=new Dict()
		else ndict=new edict.dict()

		ndict.loadProfile(lobj.dicts[name].d.d)
		
		this.addDict(name,ndict)
		console.log("added "  +name)
	}
}

if(typeof(exports)=="object"){
	exports.lib=Library
}
