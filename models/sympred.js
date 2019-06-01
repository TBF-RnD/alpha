
function SymPred(current){
	this.current=current
	this.show_n=12
}

SymPred.prototype.setLibrary=function(lib){
	console.log("Set  library")
	this.lib=lib
}

SymPred.prototype.setDict=function(dict){
	this.dict=dict
}

SymPred.prototype.setCurr=function(ncurr){
	this.current=ncurr
}

SymPred.prototype.insert=function(s,p0,p1,d){
	console.log("insert "+s)
	var head=d.substr(0,p0)
	var tail=d.substr(p1)

	head=typeof(head)=="undefined"?"":head
	tail=typeof(tail)=="undefined"?"":tail

	this.current=head+s+tail

	var res={}
	if(typeof(this.lib)!="undefined"){
		res=this.lib.predict(head+s)
		console.log("using lib")
	}
	else  if(typeof(this.dict)!="undefined")
		res=this.dict.predict(head+s)
	else 
		console.error("Failed to predict")
	var suggestions=[]
	var  i=0; for(var k in res.m) {
		if(i>=this.show_n) break;
		suggestions.push(res.m[k].s)
		i++
	}

	this.onupdate(this.current,suggestions)
}

SymPred.prototype.onupdate=function(cback){
	this.onupdate=cback
}
