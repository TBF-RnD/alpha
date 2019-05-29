// Console for mobile development
mobileConsole.init()

function updateSuggest(el){
	if(!el.is(":focus")){
		$("#suggest").hide()
		return
	}else{
		$("#suggest").show()
	}
	var pos=el.selection('getPos')
	var coord=getCaretCoordinates(el[0],pos.start)

	var suggest=$("#suggest")

	suggest.css("top",(coord.top+18)+"px")
	suggest.css("left",coord.left+"px")
}


function initSymPred(){
	//  create library object  containing dictionaries
	var lib=new Library()

	// Load frequency profiles loaded via javascript files
	for(var name in  profiles){
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
		updateSuggest(el)
//		var  dict=el.attr("dict")
//		console.log("dict: "+dict)

		var spred=new SymPred(el.val())
		spred.setDict(dict)

//		spred.setLibrary(lib)

		/*
		jQuery.get(dict,function(data){
			console.log("Got data")
		}).fail(function(e){
			console.log("fail")
		})*/
		
		spred.onupdate(function(cnt){ 
			el.val(cnt)
		})

		el.change(function(){
			console.log("Changed")
		})

		el.on("input",function(){
			spred.setCurr(el.val())
		})

		$(document).on("input",function(){
//			updateSuggest(el)
		})

		el.keypress(function(ev){
			var el=$(this)
			var pos=el.selection('getPos')
			var s=String.fromCharCode(ev.which)

			spred.insert(s,pos.start,pos.end)

			ev.preventDefault()
		})

		el.focus(function(e){ updateSuggest($(this)) })
		el.blur(function(e){ updateSuggest($(this)) })
		el.keydown(function(e){  updateSuggest($(this)) })
		
		el.keyup(function(e){
			var el=$(this)
		})
	})
}
$(document).ready(function(){
	initSymPred()	
})
