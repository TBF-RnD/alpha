/*  
 * TODO
 * - write timings to test image
 */ 
function getMS(){ return Date.now() }

function logTime(s,t0){
	 var str=s+" in "+(getMS()-t0)+"ms"
	 console.log(str)
	 return str
}

function MipMapTst(el,str){
	 console.log("Str: "+str)
	 var canvas=el[0]
	 var ctx=canvas.getContext('2d')
	 var max_size=256
	 var min_size=6

//	 var m=new MipMap(ctx,"T",max_size,min_size)
	 var t0=getMS()
	 var m=new MipMap(ctx,"Q",max_size,min_size)
	 logTime("new MipMap",t0)

	 // Test parameters
//	 var testSizes=[220,192,96,48,24,12,6]
//	 var testSizes=[220,96,24,8]
	 var testSizes=[72]
	 var n_iterations=16

	 if(el.hasClass("plain")){
		 var P=new Victor(0,max_size)
	
	
		 var P=new Victor(200,max_size*2)
		 var t1=getMS()
		 for(var i in testSizes){
				var size=testSizes[i]
				var t0=getMS()
	//			var dim=m.draw(ctx,P,size)
				for(var j=0;j<n_iterations;j++)
		 			m.fillToCTX(ctx,"Q",P,size,500)
				P.y+=size
	//			logTime("plain "+size,t0)
		 }
		 logTime("plain tot",t1)
	 }

	 if(el.hasClass("mipmap")){
		 var P=new Victor(0,max_size)
		 var dim=false
		 var t1=getMS()
		 for(var i in testSizes){
				var size=testSizes[i]
	
				var t0=getMS()
				for(var j=0;j<n_iterations;j++)
		 			dim=m.draw(ctx,P,size)
				P.y+=size
	//			logTime("mipmap "+size,t0)
		 }
		 logTime("mipmap tot:  ",t1)
	 }
	 
	 if(el.hasClass("put")){
		 var mp=new MipMap(ctx,"Q",max_size,min_size)
		 var P=new Victor(0,max_size)
		 var dim=false
		 var t1=getMS()
		 for(var i in testSizes){
				var size=testSizes[i]
	
				var t0=getMS()
//				console.log(size)
				for(var j=0;j<n_iterations;j++)
		 			dim=mp.put(ctx,P,size)
				P.y+=size
	//			logTime("put "+size,t0)
		 }
		 logTime("put tot",t1)

			var t1=getMS()
			var mmc=new MipMapCache(256,8)
			
		 for(var i in testSizes){
				var size=testSizes[i]

				console.log("put "+str+" at size: "+size)
				mmc.putString(ctx,P,str,size)
				break
			}
		 logTime("putStr tot",t1)
		 for(var i in testSizes){
				var size=testSizes[i]

				console.log("put "+str+" at size: "+size)
				mmc.putString(ctx,P,str,size)
				break
			}
		 logTime("putStr tot",t1)
	 }
}

mobileConsole.init()

$(document).ready(function(){
	 if(false){
			mobileConsole.toggle()
	 }

	 var mipmap=$("#mipmap")
	 var str=$("input.mipmap").val()
	 if(mipmap.length==1) MipMapTst(mipmap,str)
})
