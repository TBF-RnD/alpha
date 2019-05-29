
function SymPred(current){
	this.current=current

	console.log("new SymPred:  init'ed  with: "+current)
}

SymPred.prototype.insert=function(s,p0,p1){
	console.log("insert  "  +s)
	var d=this.current
	
	var head=d.substr(0,p0)
	var tail=d.substr(p1)

	this.current=head+s+tail

	this.onupdate(this.current)
}

SymPred.prototype.onupdate=function(cback){
	this.onupdate=cback
}
