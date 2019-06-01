
function SymPred(current){
	this.current=current
	this.show_n=12
	this.scores={}
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

function __score_adjust(x){
	return Math.log(x+1)
}

SymPred.prototype.getScores=function(string,sym){
	var res={}
	if(typeof(this.lib)!="undefined"){
		res=this.lib.predict(head+s)
		console.log("using lib")
	}else{
		console.log("Need library for rating")
	}

	for(var k in res){
		var adjusted=__score_adjust(res[k])
		if(typeof(this.scores[k])=="undefined")
			this.scores[k]=adjusted
		else this.scores[k]+=adjusted
	}
}
// Check  that getScores has been run
SymPred.prototype.adjustWeights=function(){
	var tot=0
	for(var k in this.scores) tot+=this.scores[k]
	
	for(var k in this.scores){
		var w=this.scores[k]
		this.lib.setDictWeight(k,w/tot)
	}
}

SymPred.prototype.insert=function(s,p0,p1,d){
	console.log("insert "+s)
	var head=d.substr(0,p0)
	var tail=d.substr(p1)

	head=typeof(head)=="undefined"?"":head
	tail=typeof(tail)=="undefined"?"":tail

	this.current=head+s+tail

	var est=this.lib.getPredEstimates(head,s)

	/*
	console.log("EST")
	console.log(est)
	*/
	for(var k in est){
//		console.log("e[k]="+est[k])
		var adjusted=__score_adjust(est[k])
		if(typeof(this.scores[k])=="undefined")
			this.scores[k]=adjusted
		else this.scores[k]+=adjusted
	}
	console.log("Adjusting weights")
	this.adjustWeights()

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
