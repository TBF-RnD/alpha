function MipMapTst(el){
	 var canvas=el[0]
	 var ctx=canvas.getContext('2d')
	 var max_size=128
	 var min_size=6

//	 var m=new MipMap(ctx,"T",max_size,min_size)
	 var m=new MipMap(ctx,"Q",max_size,min_size)
}

mobileConsole.init()

$(document).ready(function(){
	 if(false){
			mobileConsole.toggle()
	 }

	 var mipmap=$("#mipmap")
	 if(mipmap.length==1) MipMapTst(mipmap)
})
