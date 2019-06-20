function initMorse(){
	$("[doug]").each(function(){
		console.log("init")
		var el=$(this)
		var zmap=$(this).is("[z-map]")

		var morseo=new Morse(el.val(),{zmap:zmap})
		el.__doug=morseo

		// Connect to dictionary server
		var cli=new Client(dict_url)
		morseo.setDict(cli)

		// as soon as we're connected query for symbol probability scores
		cli.setonconnect(function(){
			var map=morseo.getmap(el.val())
			console.log("async")
			setupmap(morseo,el)
		})
		// on async response from server update map
		morseo.setOnAsync(function(resp){
			var map=morseo.getmap(resp.q,resp)
			console.log("async")
			setupmap(morseo,el)
		})

		// set focus
		__focus(el)

		// setup map
		setupmap(morseo,el)

		var  map=morseo.getmap(el.val())
	}

}
$(document).ready(function(){

	// bind menu
	$(".conf").click(showCFG)
	$(".fs").click(function(){
		toggleFullscreen($("#fswrap")[0])
	})
})
