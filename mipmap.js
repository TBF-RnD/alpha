MipMap.prototype.fillToCTX=function(ctx,sym,P,s,w){
	 ctx.font=Math.floor(s)+"px serif"
	 ctx.fillStyle="black"

	 /*
	 console.log(sym)
	 console.log(P)
	 console.log(w)
	 console.log(ctx)
	 */
	 ctx.fillText(sym,P.x,P.y+s,w)
}

MipMap.prototype.getDim=function(ctx,sym,s){
	 ctx.font=s+"px serif"
	 ctx.fillStyle="black"
	 var dim=ctx.measureText(sym)

	 return new Victor(Math.ceil(dim.width),Math.ceil(s))
}

function MipMap(ctx,sym,max,min){
	 var size=max
	 var P=new Victor(0,0)
	 var n=0
	 
	 var dim=this.getDim(ctx,sym,size)
	 
	 ctx.strokeStyle="black"
	 ctx.strokeRect(0,0,dim.x*1.5,dim.y)
	 console.log("DIM")
	 console.log(dim)

	 console.log(P)
	 this.fillToCTX(ctx,sym,P,size)
	 size/=2
	 P.addX(dim)

	 console.log(P)

	 while(size>min){		
			this.fillToCTX(ctx,sym,P,size)
			P.y+=size

			console.log(P)

			console.log("Size:"+size)
			size/=2
			n++
	 }
	 console.log("N="+n)
}
