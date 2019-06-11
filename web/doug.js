function renderMap(){
}

//  TODO
//  - overlaps with sympred.js
function initDoug(){
	$("[doug]").each(function(){
		var el=$(this)
		var binds=$(this).attr("bindings")
		var bindo=JSON.parse(binds)

		var dougo=new Doug(el.val())
		el.__doug=dougo

		console.log("Get map")
		var  map=dougo.getmap()
		console.log(map)

		// get signal finger number from keycode
		// returns -1 if keycode is not bound
		function mapKC(which){
			for(k in bindo){
				if(bindo[k]==which)
					return k
			}
			return -1
		}

		// callback that runs upon new symbol 
		// from doug model insert in selection 
		// if any. Afterwards update
		dougo.onupdate(function(s){
			var pos=el.selection('getPos')
			
			// dupl from mod  sympred
			p0=pos.start
			p1=pos.end
			d=el.val()

			var head=d.substr(0,p0)
			var tail=d.substr(p1)

			current=head+s+tail

			//  update internal state of model
			dougo.setcontent(current)

			// update HTML
			el.val(current)
		})

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
