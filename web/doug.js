//  TODO
//  - overlaps with sympred.js
function initDoug(){
	$("[doug]").each(function(){
		var el=$(this)
		var binds=$(this).attr("bindings")
		var bindo=JSON.parse(binds)

		var dougo=new Doug()
		el.__doug=dougo

		// get signal finger number from keycode
		// returns -1 if keycode is not bound
		function mapKC(which){
			for(k in bindo){
				if(bindo[k]==which)
					return k
			}
			return -1
		}

		el.keydown(function(ev){ 
			var kc=ev.which
			var signal=mapKC(kc)

			if(signal==-1)  return

			dougo.signal(signal)

			ev.preventDefault()
		})
		el.keyup(function(ev){
			var kc=ev.which
			var signal=mapKC(kc)
			
			if(signal==-1)  return

			dougo.unsignal(signal)
			
			ev.preventDefault()
		})
	})
}

mobileConsole.init()
$(document).ready(function(){
	initDoug()	
})
