
function SymPred(current){
	this.current=current

	console.log("new SymPred:  init'ed  with: "+current)
}

SymPred.prototype.setLibrary=function(lib){
	this.lib=lib
}

SymPred.prototype.setDict=function(dict){
	this.dict=dict
	console.log("Dicct is  set!!")
}

SymPred.prototype.insert=function(s,p0,p1){
	var d=this.current
	
	var head=d.substr(0,p0)
	var tail=d.substr(p1)

	this.current=head+s+tail

	this.dict.predict(head+s)

	this.onupdate(this.current)
}

SymPred.prototype.onupdate=function(cback){
	this.onupdate=cback
}
