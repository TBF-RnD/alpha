var defaults={
	delay: 120
}

function Doug(options){
	if(typeof(options)=="undefined") options={}
	// Set options to this if defined in defaults
	for(var k in defaults){
		if(typeof(options[k])!="undefined")
			this[k]=options[k]
		else this[k]=defaults[k]
	}

	// wait for first keydown
	this.state=0
	this.active_signals={}

	/*
	var selfref=this
	setInterval(function(){
		console.log(selfref.active_signals)
	},500)
	*/
}

Doug.prototype.trigger=function(n){
	this.state=0
	var sum=0
	for(var k in this.active_signals){
		sum+=Math.pow(2,parseInt(k))
	}
	if(sum==0) return
	console.log(sum)
}

Doug.prototype.unsignal=function(n){
	if(typeof(this.active_signals[n])=="undefined") return
	delete this.active_signals[n]
}

Doug.prototype.signal=function(n){
	if(this.state==0){
	// Wait and capture signals for delay miliseconds
		var selfref=this
		this.state=1

		setTimeout(function(){
			selfref.trigger()
		},this.delay)
	}
	
	this.active_signals[n]=1
}
