var defaults={
	delay: 750,
	zmap: false,
	tshort: 1,
	tlong: 3,
	tint: 1,
	tgrpsep: 7,
	dual_timeout: 750,
}
// FIXME add abbrivations and so forth...
// 	- not global
// 	- allow for several
// 	- create class? 
var table=[{c:".-",s:"A"}, {c:"-...",s:"B"}, {c:"-.-.",s:"C"},
{c:"-..",s:"D"}, {c:".",s:"E"}, {c:"..-.",s:"F"},
{c:"--.",s:"G"}, {c:"....",s:"H"}, {c:"..",s:"I"},
{c:".---",s:"J"}, {c:"-.-",s:"K"}, {c:".-..",s:"L"},
{c:"--",s:"M"}, {c:"-.",s:"N"}, {c:"---",s:"O"},
{c:".--.",s:"P"}, {c:"--.-",s:"Q"}, {c:".-.",s:"R"},
{c:"...",s:"S"}, {c:"-",s:"T"}, {c:"..-",s:"U"},
{c:"...-",s:"V"}, {c:".--",s:"W"}, {c:"-..-",s:"X"},
{c:"-.--",s:"Y"}, {c:"--..",s:"Z"}, {c:"-----",s:"0"},
{c:".----",s:"1"}, {c:"..---",s:"2"}, {c:"...--",s:"3"},
{c:"....-",s:"4"}, {c:".....",s:"5"}, {c:"-....",s:"6"},
{c:"--...",s:"7"}, {c:"---..",s:"8"}, {c:"----.",s:"9"},
{c:".-...",s:"&amp;"}, {c:".----.",s:"'"}, {c:".--.-.",s:"@"},
{c:"-.--.-",s:")"}, {c:"-.--.",s:"("}, {c:"---...",s:":"},
{c:"--..--",s:","}, {c:"-...-",s:"="}, {c:"-.-.--",s:"!"},
{c:".-.-.-",s:"."}, {c:"-....-",s:"-"}, {c:".-.-.",s:"+"},
{c:".-..-.",s:"\""}, {c:"..--..",s:"?"}, {c:"-..-.",s:"/"},
{c:".-.-",s:"&auml;"}, {c:".--.-",s:"&aacute;"}, {c:".--.-",s:"&aring;"},
{c:"----",s:"Ch"}, {c:"..-..",s:"&eacute;"}, {c:"--.--",s:"&ntilde;"},
{c:"---.",s:"&ouml;"}, {c:"..--",s:"&uuml;"}]

// dupl. mod doug
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

Morse.prototype.feedDual=function(s){
	this.cword+=s

	t64=this
//	if(this.state=="group") clearTimeout(this.dual_to)
	if(this.state=="group") return
	this.state="group"
	var selfref=this
	this.dual_to=setTimeout(function(){
		console.log("G-time is up")
		// rename to group?
		var inp=selfref.cword
		var sym=false
		
		if(typeof(selfref.table[inp])!="undefined") 
			sym=selfref.table[inp]
		selfref.cword=""
		selfref.state="waiting"
		
		if(typeof(selfref.onword)!="function") return

		selfref.onword(sym)
	},this.dual_timeout)
}

// FIXME dead
Morse.prototype.tableSort=function(){
	var ret=[]
	for(var code in this.table){
		ret.push({c:code,s:table[code]})
	}
	ret=ret.sort(function(a,b){ return a.s.localeCompare(b.s)})
	return ret
}

// Recursive Z-map useful since the distances between
// alphabetically close symbols become close measured
// as a 2d  distance as well. 
// FIXME
// 	- move to sep class overlaps model/doug
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

// FIXME overlaps with doug model, create parent object
Morse.prototype.onAsyncUpdate=function(resp){
	if(typeof(this.async_cback)=="function")
		this.async_cback(resp)
}
// FIXME overlaps with doug model, create parent object
Morse.prototype.setOnAsync=function(f){
	this.async_cback=f
}
// FIXME overlaps with doug model, create parent object
Morse.prototype.setDict=function(dicto){
	this.dict=dicto
	// In case of async
	var selfref=this
	if(typeof(dicto.setonupdate)=="function"){
		dicto.setonupdate(function(resp){
			selfref.onAsyncUpdate(resp)
		})
	}
}

Morse.prototype.mapTable=function(table){
	var ret=[]
	for(var i=0;i<table.length;i++){
		var c=table[i]
		ret[c.c]=c.s
	}
	return ret
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
	this.table=this.mapTable(table)
	this.tableSorted=table

	this.cword=''
}

// FIXME copied from doug
Morse.prototype.getmap=function(back_string,pred_res){
//	console.log("Querying server for "+back_string)
	var res=false
	if(typeof(pred_res)=="undefined")
		res=this.dict.predict(back_string.toLowerCase().substr(-7))
	else res=pred_res

	var x0=0
	var y0=0
	// FIXME`
	var rows=8
	var cols=5
	var map=[]

	// FIXME not dynamic, assumes set of ~31 
	if(this.zmap) rows=8
	
	for(var i=0;i<rows;i++) map.push([])
	for(var i=0;i<this.tableSorted.length;i++){
		var sym=this.tableSorted[i].s
		var code=this.tableSorted[i].c

		// Fractal space filling curve
		// FIXME: create mapping object
		if(this.zmap){
			var p=zmap_ind2p(i)
			x0=p.x
			y0=p.y
		}else{
			x0=i%rows
			y0=Math.floor(i/rows)
		}

		map[y0][x0]={s:sym,c:code}
		map[y0][x0].v=__get_score_value(res,sym)
	}
	return map
}
