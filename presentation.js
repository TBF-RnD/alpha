function getObj(){
	 return $("alpha")[0].__aobj
}

mobileConsole.init()

// Toggle fullscreen, takes DOM element as argument
function toggleFullscreen(el){
		  if(document.fullscreen) document.exitFullscreen()
		  else el.requestFullscreen()
}

$(document).ready(function(){
				var editor=$("#editor")
				if(true){
					toggleFullscreen(editor[0])
					mobileConsole.toggle()
				}
				
				$("#fs").click(function(){ toggleFullscreen(editor[0])  })

				console.log("Document ready")

				$("alpha").each(function(){
								var model=$(this).attr("model")
								console.log("Model =  " + model)
								$(this).__aobj=new window[model]($(this))
				})
})
