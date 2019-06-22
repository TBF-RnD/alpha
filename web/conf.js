function showCFG(ev){
	var cfg=$("#cfg")

	console.log("CFG")

	var ww=$(window).width()/2
	var wh=$(window).height()/2

	var width=ww<320?320:ww
	var height=wh<240?240:wh

	cfg.dialog({
		modal:false,
		width: width,
		height: height,
		buttons:{
			Cancel:function(){
				cfg.dialog("close")
			},
			Apply:function(){
				cfg.dialog("close")
			}
		}
	})
//	ev.preventDefault()
}
