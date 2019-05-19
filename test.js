/*  
 * TODO
 * - write timings to test image
 */ 
function getMS(){ return Date.now() }

function logTime(s,t0){
	 console.log(s+" in "+(getMS()-t0)+"ms")
}

function MipMapTst(el){
	 var canvas=el[0]
	 var ctx=canvas.getContext('2d')
	 var max_size=128
	 var min_size=6

//	 var m=new MipMap(ctx,"T",max_size,min_size)
	 var t0=getMS()
	 var m=new MipMap(ctx,"Q",max_size,min_size)
	 logTime("new MipMap",t0)

	 // Render all sizes, with bitmaps
	 var t0=getMS()
	 m.renderAll(ctx,0,max_size)
	 logTime("renderAll",t0)

	 // Render all sizes, as usual
	 var t0=getMS()
	 m.renderAllRef(ctx,400,max_size)
	 logTime("renderAllReg",t0,400)


	 var P=new Victor(0,max_size*2)

	 // Sizes to test
	 var testSizes=[220,192,96,48,24,12,10,8,6,5,3]
	 var P=new Victor(0,max_size*2)
	 var dim=false
	 for(var i in testSizes){
			var size=testSizes[i]

			var t0=getMS()
			for(var j=0;j<16;j++)
	 			dim=m.draw(ctx,P,size)
			P.y+=dim.y
			logTime("mipmap "+size,t0)
	 }
	 
	 var P=new Victor(500,max_size*2)
	 for(var i in testSizes){
			var size=testSizes[i]
			var t0=getMS()
//			var dim=m.draw(ctx,P,size)
			for(var j=0;j<16;j++)
	 			m.fillToCTX(ctx,"Q",P,size,500)
			P.y+=size
			logTime("plain "+size,t0)
	 }
}

mobileConsole.init()

$(document).ready(function(){
	 if(false){
			mobileConsole.toggle()
	 }

	 var mipmap=$("#mipmap")
	 if(mipmap.length==1) MipMapTst(mipmap)
})
