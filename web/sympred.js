// Console for mobile development
mobileConsole.init()


$(document).ready(function(){
	$("[sympred]").each(function(){
		var  el=$(this)

		var spred=new SymPred(el.html())

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
})
