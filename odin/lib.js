if(typeof(exports)!="undefined"){
	var edict=require("./dict.js")
}

function Library(){
	this.dicts={}
	this.n_dicts=0
}

Library.prototype.setDictWeight=function(name,weight){
	if(typeof(this.dicts[name])=="undefined"){
		console.err("No such dict: "+name)
		return
	}
	this.dicts[name].w=weight
}

Library.prototype.addDict=function(name,dict,weight){
	var w=1

	this.n_dicts++

	if(typeof(weight)!="undefined") w=weight

	this.dicts[name]={d:dict,w:w}
}

// Get the dictionaries estimates values for sym appearing after string
Library.prototype.getPredEstimates=function(string,sym){
//	console.log("P("+sym+"|"+string+")")
	var estimates=[]
	for(var k in this.dicts){
		var  dict=this.dicts[k]
		d0=dict
		var sub=dict.d.predictUnsorted(string)
		s0=sub
		var f=sub.m[sym]
		
		// failed to suggest  -> 0  
		if(typeof(f)=="undefined"){
			estimates[k]=0
			continue
		}

//		console.log(f+"/"+sub.sum_f)
		var v=f/sub.sum_f
		estimates[k]=v
	}

	return  estimates
}

// Composite prediction merged from dictionaries adjusted by weight
// mirrors  predict in dict implement abstraction!!
Library.prototype.predict=function(string_in,max_n){
	var comp={}
//	console.log("libpred:  "+string_in)
//	console.log("Got "+this.n_dicts+" dictionaries")
	for(var k in this.dicts){
		var  dict=this.dicts[k]
//		console.log("Looking at:  " +k)
		var sub=dict.d.predict(string_in,max_n)
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

	if(typeof(max_n)!="undefined"){
		var tmp=[]
		var i=0
		for(var k in sorted){
			i++
			if(i>max_n) break
			tmp.push(sorted[k])
		}
		sorted=tmp
	}
	
	/*
	console.log("NTOP sorted")
	for(var i=0;i<4;i++){
		console.log(sorted[i])
	}
	*/
	
	return {m:sorted}
}

Library.prototype.getDictInfo=function(){
	var res=[]
	console.log("Get  dict info")
	for(var name in this.dicts){
		console.log("n:"+name)
		res[name]={w:this.dicts[name].w}
	}
	return res
}

// TODO
// - perhaps to much is passed along in  json object?
Library.prototype.loadData=function(lobj){
	this.n_dicts=lobj.n_dicts
	for(var name in lobj.dicts){
		var ndict
		if(typeof(Dict)!="undefined") ndict=new Dict()
		else ndict=new edict.dict()

		ndict.loadProfile(lobj.dicts[name].d.d)
		
		this.addDict(name,ndict)
		console.log("added "  +name)
	}
}

if(typeof(exports)=="object"){
	exports.lib=Library
}
