
function SymPred(current){
	this.current=current
	this.show_n=12
}

SymPred.prototype.setLibrary=function(lib){
	this.lib=lib
}

SymPred.prototype.setDict=function(dict){
	this.dict=dict
}

SymPred.prototype.setCurr=function(ncurr){
	this.current=ncurr
}

SymPred.prototype.insert=function(s,p0,p1){
	var d=this.current
	
	var head=d.substr(0,p0)
	var tail=d.substr(p1)

	head=typeof(head)=="undefined"?"":head
	tail=typeof(tail)=="undefined"?"":tail

	this.current=head+s+tail

	var res=this.dict.predict(head+s)
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
