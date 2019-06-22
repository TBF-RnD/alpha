// FIXME add abbrivations and so forth...
var table={
	".-":"A", "-...":"B", "-.-.":"C", "-..":"D", ".":"E",
	"..-.":"F", "--.":"G", "....":"H", "..":"I", ".---":"J",
	"-.-":"K", ".-..":"L", "--":"M", "-.":"N", "---":"O",
	".--.":"P", "--.-":"Q", ".-.":"R", "...":"S", "-":"T",
	"..-":"U", "...-":"V", ".--":"W", "-..-":"X", "-.--":"Y",
	"-..":"Z", "-----":"0", ".----":"1", "..---":"2", "...--":"3",
	"....-":"4", ".....":"5", "-....":"6", "--...":"7", "---..":"8",
	"----.":"9", ".-...":"&amp;", ".----.":"'", ".--.-.":"@", "-.--.-":")",
	"-.--.":"(", "---...":":", "--..--":",", "-...-":"=", "-.-.--":"!",
	".-.-.-":".", "-....-":"-", ".-.-.":"+", ".-..-.":"\"", "..--..":"?",
	"-..-.":"/", ".-.-":"&auml;", ".--.-":"&aacute;", ".--.-":"&aring;", "----":"Ch",
	"..-..":"&eacute;", "--.--":"&ntilde;", "---.":"&ouml;", "..--":"&uuml;" } 

var defaults={
	delay: 250,
	zmap: false
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
