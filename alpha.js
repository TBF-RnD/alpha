// fill entire canvas with bg color
function clear(){
				this.ctx.fillStyle=this.bg

				this.ctx.fillRect(0,0,this.w,this.h)
}

// Insert canvas and initialize ctx
function canvas(width,height){
				console.log("set up canvas stub")

				// create canvas element
				var ce=$("<canvas></canvas>").prop({width:width,height:height})
				// insert into alpha element
				this.el.append(ce)

				// Get context
				this.ctx=ce[0].getContext('2d')

}

// Draws a string
function string(str,x,y,size,w){
	 // Hardly visible 
	 if(size < this.fontsize_th) return;
	 // Don't bother if outside of screen
	 var r=new Rect(new Victor(x,y),new Victor(w,size))
	 if(!r.overlaps(this.screen)) return

	 // Set foreground, fontsize and draw
	 this.ctx.fillStyle=this.fg
	 this.ctx.font=Math.floor(size)+"px sans"
	 this.ctx.fillText(str,x,y,w)
}

function line(x0,y0,x1,y1){
		  this.ctx.strokeStyle=this.fg

		  this.ctx.beginPath()
		  this.ctx.moveTo(x0,y0)
		  this.ctx.lineTo(x1,y1)
		  this.ctx.stroke()
}

function lineV(p0,p1){
	this.ctx.strokeStyle=this.fg
	
	this.ctx.beginPath()
	this.ctx.moveTo(p0.x,p0.y)
	this.ctx.lineTo(p1.x,p1.y)
	this.ctx.stroke()
}

function vector(x0,y0,x1,y1){
   var p0=new Victor(x0,y0)
   var p1=new Victor(x1,y1)
  

   var i=p1.clone()
   i.subtract(p0)
   hl=Math.min(this.hlen,i.magnitude())
   i.normalize()
   
   i.multiply(new Victor(hl,hl))

   var h0=i.clone()
   var h1=i.clone()

   h0.rotateDeg(135)
   h0.add(p1)
   h1.rotateDeg(-135)
   h1.add(p1)

   this.lineV(p1,h0)
   this.lineV(p1,h1)
   this.lineV(p0,p1)
}

function rect(x,y,w,h){
   this.ctx.strokeStyle=this.fg
   this.ctx.strokeRect(x,y,w,h)
}

function touch(){
   var el=this.el
   var selfref=this
	
   el.on("touchstart",function(){
	 selfref.touchstart()
	
	 selfref.moving=true
   })
   el.on("touchmove",function(e){	
      var touch=e.touches[0]
      selfref.tx=touch.clientX
      selfref.ty=touch.clientY
	
      selfref.touchmove({x:selfref.tx,y:selfref.ty})
   })
   el.on("touchend",function(){
      selfref.touchend()
	
      selfref.moving=false
   })
}

function key(){
	var selfref=this;
	console.log("binding keys...")
	$(document).keydown(function(ev){
		console.log("keydown")
		var e={x:0,y:0}
		switch(ev.keyCode){
			case 38:
				e.y=-1
				selfref.key(e)
				break;
			case 39:
				e.x=1
				selfref.key(e)
				break;
			case 40:
				e.y=1
				selfref.key(e)
				break;
			case 37:
				e.x=-1;
				selfref.key(e)
				break;
		}
	})
}

// Constructor for alpha object
function Alpha(el){
	 // Save referenec to DOM element via jQuery object
	 this.el=el
	 this.moving=false
	 this.tx=-1
	 this.ty=-1



	// cfg options
   this.bg='white'
   this.fg='black'
   this.hlen=48
	 this.fontsize_th=8

	 this.w=parseInt(el.attr('width'))
	 this.h=parseInt(el.attr('height'))

	 this.screen=new Rect(new Victor(0,0),new Victor(this.w,this.h))
	 console.log(this.screen)

	 // Functions 
	 this.canvas=canvas
	 this.clear=clear
	 this.rect=rect
	 this.string=string
	 this.line=line
   this.lineV=lineV
   this.touch=touch
   this.vector=vector
	this.key=key

   this.touchstart=function(){
      console.log("A touchstart")
   }
				
   // Load statistical profile
   var profile=el.attr("profile")
   console.log("Trying to load: " + profile)
   this.prof=new FProf(profile)

   //  Set up graphics
   this.canvas(this.w,this.h)

   // bind touch events
   this.touch()
	this.key()

	// For debugging
	fprof=this.fprof
}
