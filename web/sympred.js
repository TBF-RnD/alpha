// Console for mobile development
mobileConsole.init()

function initSymPred(){
	//  create library object  containing dictionaries
	var lib=new Library()

	// Load frequency profiles loaded via javascript files
	for(var name in  profiles){
		console.log("Loading profile:  "+name)
		
		var dict=new Dict()

		dict.loadProfile(profiles[name])
		lib.addDict(name,dict,1)
	}

	// temporarily testing with only dict to eliminate variables
	var dict=new Dict()
	dict.loadProfile(profiles["morse"])
	

	// Find all DOM elements with sympred attribute and set up  event bindings to the model
	$("[sympred]").each(function(){
		var  el=$(this)
//		var  dict=el.attr("dict")
//		console.log("dict: "+dict)

		var spred=new SymPred(el.html())
		spred.setDict(dict)

//		spred.setLibrary(lib)

		/*
		jQuery.get(dict,function(data){
			console.log("Got data")
		}).fail(function(e){
			console.log("fail")
		})*/
		
		spred.onupdate(function(c){ el.html(c) })

		el.keypress(function(ev){
			var el=$(this)
			var pos=el.selection('getPos')
			var s=String.fromCharCode(ev.which)

			spred.insert(s,pos.start,pos.end)

			ev.preventDefault()
		})

		el.keydown(function(e){
			var el=$(this)
		})
		el.keyup(function(e){
			var el=$(this)
		})
	})
}
$(document).ready(function(){
	initSymPred()	
})
