var defaults={
	delay: 120
}

function Doug(current,options){
	if(typeof(current)=="undefined") current=""
	this.current=current

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

	var s=String.fromCharCode(96+sum)
	
	console.log(sum+":"+s)

	this.onupdate(s)
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
Doug.prototype.onupdate=function(cback){
	this.onupdate=cback
}

Doug.prototype.setcontent=function(content){
	this.current=content
}

function __bittoarray(a){
//	console.log(a+" becomes")
	var ret=[]
	for(var i=0;i<5;i++){
		ret.push(a&1)
		a=a>>1
	}
//	console.log(ret)
	return ret.reverse()
}

Doug.prototype.getmap=function(bindings){
	var i0=97
	var rows=6
	var cols=5
	var map=[]
	for(var i=0;i<rows;i++) map.push([])
	for(var i=0;i<26;i++){
		var s=String.fromCharCode(i0+i)
//		console.log(s)
		var x0=i%rows
		var y0=Math.floor(i/rows)
		var ba=__bittoarray(i+1)

		map[y0][x0]={s:s,ba:ba,bs:ba.join('')}
	}
	return map
}
