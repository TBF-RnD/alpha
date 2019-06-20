var defaults={
	delay: 250,
	zmap: false
}

// FIXME overlaps with doug model, create parent object
Doug.prototype.onAsyncUpdate=function(resp){
	if(typeof(this.async_cback)=="function")
		this.async_cback(resp)
}
// FIXME overlaps with doug model, create parent object
Doug.prototype.setOnAsync=function(f){
	this.async_cback=f
}
// FIXME overlaps with doug model, create parent object
Doug.prototype.setDict=function(dicto){
	this.dict=dicto
	// In case of async
	var selfref=this
	if(typeof(dicto.setonupdate)=="function"){
		dicto.setonupdate(function(resp){
			selfref.onAsyncUpdate(resp)
		})
	}
}

// FIXME overlaps with doug model, create parent object
function Morse(current,options){
	if(typeof(current)=="undefined") current=""
	this.current=current

	if(typeof(options)=="undefined") options={}
	// Set options to this if defined in defaults
	for(var k in defaults){
		if(typeof(options[k])!="undefined")
			this[k]=options[k]
		else this[k]=defaults[k]
	}
	// Morse specific
}
