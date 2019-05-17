//
// Receives symbols emitted from Alpha model and presents them 
// to user.
//

// Construrctor
// - takes jQuery element
function Output(el){
	 this.el=el

	 console.log("Starting output to")
	 var type=el.prop('nodeName')
	 console.log(type)
}
// insert symbol
Output.prototype.emit=function(s){
	 console.log("emit: "+s)
	 var c=this.el.html()
	 this.el.html(c+s)
}

// Backspace
Output.prototype.remove=function(){
	 var c=this.el.html()
	 var l=c.length
	 c=c.substr(0,l-1)
	 this.el.html(c)
}

