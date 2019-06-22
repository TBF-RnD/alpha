function setupInpBtns(el){
	var id=el.attr("id")
	var inps=$("[morse-inp][for='"+id+"'")

	inps.click(function(ev){
		var s=$(this).attr("value")
		console.log(s)
		
		ev.preventDefault()
	})
	inps.on('touchend',function(ev){
		var s=$(this).attr("value")
		console.log(s)
		ev.preventDefault()
	})
}

function initMorse(){
	$("[morse]").each(function(){
		console.log("init")
		var el=$(this)
		var zmap=$(this).is("[z-map]")
		var dict_url=$(this).attr("dict")

		var morseo=new Morse(el.val(),{zmap:zmap})
		el.__doug=morseo

		// Connect to dictionary server
		var cli=new Client(dict_url)
		morseo.setDict(cli)

		// as soon as we're connected query for symbol probability scores
		cli.setonconnect(function(){
//			var map=morseo.getmap(el.val())
			console.log("async")
//			setupmap(morseo,el)
		})
		// on async response from server update map
		morseo.setOnAsync(function(resp){
//			var map=morseo.getmap(resp.q,resp)
			console.log("async")
//			setupmap(morseo,el)
		})

		// set focus
		__focus(el)

		// setup map
//		setupmap(morseo,el)

		// setup input buttons
		setupInpBtns(el)

//		var  map=morseo.getmap(el.val())

	})

}

mobileConsole.init()
$(document).ready(function(){
//	mobileConsole.toggle()

	initMorse()

	// bind menu
	$(".conf").click(showCFG)
	$(".fs").click(function(){
		toggleFullscreen($("#fswrap")[0])
	})
})
