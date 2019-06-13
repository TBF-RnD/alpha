var defaults={
	delay: 120,
	zmap: false
}

// Generate key tables
Doug.prototype.genMaps=function(){
	this.maps=[]
	this.cmap=0

	var az=[]
	var AZ=[]
	var pt=[]
	for(var i=97;i<128;i++) az.push(String.fromCharCode(i))
	for(var i=65;i<96;i++) AZ.push(String.fromCharCode(i))
	for(var i=32;i<64;i++) pt.push(String.fromCharCode(i))

	this.maps.push(az)
	this.maps.push(AZ)
	this.maps.push(pt)

	t99=this.maps
}

Doug.prototype.nextmap=function(){
	this.cmap=(++this.cmap)%this.maps.length
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

	this.genMaps()
}

Doug.prototype.trigger=function(n){
	this.state=0
	var sum=0
	for(var k in this.active_signals){
		sum+=Math.pow(2,parseInt(k))
	}
	if(sum==0) return

	var s=this.maps[this.cmap][sum-1]
	
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

Doug.prototype.onAsyncUpdate=function(resp){
//	console.log("gotAsyncUpdate")	
	if(typeof(this.async_cback)=="function")
		this.async_cback(resp)
}

Doug.prototype.setOnAsync=function(f){
	this.async_cback=f
}

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

// FIXME not dynamic
Doug.prototype.getMapDim=function(){
//	if(this.zmap) return {w:
}

// Gives symbol a value [1,42] based on probability
// TODO
// inefficient see todo note above getmap
function __get_score_value(pred_res,sym){
	if(typeof(pred_res)=="undefined"){
		return 1
	}
	var v
	for(var k in pred_res.m){
		var c=pred_res.m[k]
		if(c.s!=sym) continue

		if (c.f<Math.E) v=1
		else v=Math.log(c.f)

		if(v>42) return 42

		return  v
	}
	return 1
}

// Recursive Z-map useful since the distances between
// alphabetically close symbols become close measured
// as a 2d  distance as well. 
function zmap_ind2p(i){
	var p={x:0,y:0}
	var n=0
	while(i!=0){
		p.x=p.x|((i&1))<<n
		i=i>>1
		p.y=p.y|((i&1))<<n
		i=i>>1
		n=!n?1:n<<1
	}
	return p
}

// TODO when querying for predictions do not 
// ask for sorted response, do ask only for
// symbols within set though if possible.
Doug.prototype.getmap=function(back_string,pred_res){
//	console.log("Querying server for "+back_string)
	var res=false
	if(typeof(pred_res)=="undefined")
		res=this.dict.predict(back_string)
	else res=pred_res

	var x0=0
	var y0=0
	var rows=6
	var cols=5
	var map=[]

	// FIXME not dynamic, assumes set of ~31 
	if(this.zmap) rows=8
	
	for(var i=0;i<rows;i++) map.push([])
	for(var i=0;i<31;i++){
//		var s=String.fromCharCode(i0+i)
		var s=this.maps[this.cmap][i]
		if(this.zmap){
			var p=zmap_ind2p(i)
			x0=p.x
			y0=p.y
		}else{
			x0=i%rows
			y0=Math.floor(i/rows)
		}
		var ba=__bittoarray(i+1)

		map[y0][x0]={s:s,ba:ba,bs:ba.join('')}
		map[y0][x0].v=__get_score_value(res,s)
	}
	return map
}
