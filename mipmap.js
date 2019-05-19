//TODO
// - probably add some line height padding at top & bottom
MipMap.prototype.fillToCTX=function(ctx,sym,P,s,w){
	 ctx.font=Math.floor(s)+"px serif"
	 ctx.fillStyle="black"
	 ctx.textBaseline="bottom"

	 ctx.fillText(sym,P.x,P.y+s,w)
}

MipMap.prototype.getDim=function(ctx,sym,s){
	 ctx.font=s+"px serif"
	 ctx.fillStyle="black"
	 ctx.textBaseline="bottom"

	 var dim=ctx.measureText(sym)

	 return new Victor(Math.ceil(dim.width),Math.ceil(s))
}

// Test function for debugging prototyping
// Note does not use scaling!!
MipMap.prototype.renderAll=function(ctx,x,y){
	 for(var size in this.bitmaps){
			var bmp=this.bitmaps[size]
			ctx.putImageData(bmp,x,y)
			x+=bmp.width
	 }
}

// Reference for benchmarking
// Renders text using plain canvas fill Text
MipMap.prototype.renderAllRef=function(ctx,x,y){
	 console.log(this.sym)
	 var i=0
	 for(var s in  this.bitmaps){
			var bmp=this.bitmaps[s]
			var size=parseFloat(s)
			this.fillToCTX(ctx,this.sym,new Victor(x,y),size,200)
			
			x+=bmp.width
	 }
}

// Render mip map onto canvas
MipMap.prototype.draw=function(ctx,TP,target_size){
	 var dSizeMin=Infinity
	 var cBestIndex=-1
	 var source_size=-1

	 // Find closest match
	 // can be made more efficient
	 // also:
	 // maybe think in  terms of areas instead of lengths
	 for(var s in this.bitmaps){
			var size=parseFloat(s)
			var dSize=Math.abs(target_size-size)
			if(dSize<dSizeMin){
				 cBestIndex=s
				 dSizeMin=dSize
				 source_size=size
			}
	 }
	 var loc=this.map[cBestIndex]
	 var P=loc.P
	 var D=loc.D
	 var scale=target_size/source_size

	 // Copy and scale best fit glyph from our bitmap 
	 // onto destination canvas context
	 ctx.drawImage(this.iData,
			P.x,P.y,D.x,D.y,
			TP.x,TP.y,scale*D.x,scale*D.y)
}

//  Draw without scaling
MipMap.prototype.put=function(ctx,TP,target_size){
	 var bmp=false
	 var dSizeMin=Infinity
	 var cBestIndex=-1
	 var source_size=-1

	 // Find closest match
	 // can be made more efficient
	 // also:
	 // maybe think in  terms of areas instead of lengths
	 for(var s in this.bitmaps){
			var size=parseFloat(s)
			var dSize=Math.abs(target_size-size)
			/*
			console.log("size:  "+size)
			console.log("dSize: "+dSize)
			console.log("target_size: "+target_size)
			*/
			if(dSize<dSizeMin){
				 cBestIndex=s
				 dSizeMin=dSize
				 source_size=size
			}
	 }
	 /*
	 console.log("Best match: " + cBestIndex)
	 console.log("dSize: "+dSizeMin)
	 */
	 if(cBestIndex!=-1) bmp=this.bitmaps[cBestIndex]
	 if(!bmp){
			console.log("Found no bitmap  for "+cBestIndex)
	 }

	 var loc=this.map[cBestIndex]

	 /*
	 console.log("Put at")
	 console.log(TP)
	 console.log(target_size+" => "+cBestIndex)
	 */
	 ctx.putImageData(bmp,TP.x,TP.y)

	 return new Victor(bmp.width,bmp.height)
}

function MipMap(ctx,sym,max,min){
	 this.bitmaps={}
	 this.map={}
	 this.sym=sym
	 var size=max
	 var P=new Victor(0,0)
	 var n=0
	 
	 var dim=this.getDim(ctx,sym,size)
	 
	 ctx.strokeStyle="black"
//	 ctx.strokeRect(0,0,dim.x*1.5,dim.y)
	 console.log("DIM")
	 console.log(dim)

	 // Set up offscreen canvas
//   Does not work in   FF
//	 this.offscreen=new OffscreenCanvas(dim.x*1.5,dim.y)
//this.hctx=this.offscreen.getContext('2d')

//	 console.log(P)
	 
	 this.fillToCTX(ctx,sym,P,size)
//	 this.fillToCTX(this.hctx,sym,P,size)

	 var bmp=ctx.getImageData(P.x,P.y,dim.x,dim.y)
	 this.bitmaps[size]=bmp
	 this.map[size]=new Rect(P.clone(),dim)

	 P.addX(dim)

	 /*
	 console.log("OP:")
	 console.log(P)
	 */

	 var wp=0.5*dim.x

	 while(size>min){		
			size/=2
			this.fillToCTX(ctx,sym,P,size)
//			this.fillToCTX(this.hctx,sym,P,size)

//			var bmp=this.hctx.getImageData(P.x,P.y,wp,size)
			var bmp=ctx.getImageData(P.x,P.y,wp,size)
			this.bitmaps[size]=bmp
			this.map[size]=new Rect(P.clone(),new Victor(wp,size))

//			console.log("size " +size+" at: ")
//			console.log(this.map[size])
			
			P.y+=size
	 }
//	 this.iData=this.offscreen.transferToImageBitmap()
	 console.log("N="+n)
}
