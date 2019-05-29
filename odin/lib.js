function Library(){
	this.dicts={}
	this.n_dicts=0
}

Library.prototype.addDict=function(name,dict,weight){
	var w=1

	if(typeof(weight)!="undefined") w=weight

	this.dicts[name]={d:dict,w:weight}
}

Library.prototype.predict=function(s){
	for(var k in this.dicts){
	}
}

if(typeof(exports)=="object"){
	exports.lib=Library
}
