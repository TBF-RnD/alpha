function start(){
   var selfref=this

   this.interval=setInterval(function(){
      selfref.render()
   },1000/this.FPS)

   console.log("started rendering at "  + this.interval)
}

function end(){
   console.log("Clearing :  " + this.interval)
   clearInterval(this.interval)
   this.moving=false
   this.render()
}
function move(e){
   this.moving=true
//   console.log(e.x)
//   console.log(e.y)

   this.tx=e.x
   this.ty=e.y
//   console.log("D  got "  + this.tx + "x"+this.ty)
//   this.render()
//   console.log("now at " + this.tx +  " " + this.ty)
//   this.vector(this.cx,this.cy,e.x,e.y)
}

// Constructor for dasher model 
function Dasher(el){
   //  Call parent class
   Alpha.call(this,el)
   
   // CFG
   this.clen = 48
   this.cx = this.w/2
   this.cy = this.h*.8
   this.FPS = 30
	 // Velocity
	 this.v = 250

   // State
   this.interval=-1
	 this.pos=new Victor(0,0)

   console.log("Set up dasher model...")
   this.render()

   // Touch / User interaction
   this.touchstart=start
   this.touchmove=move
   this.touchend=end

   // bind touch events
//   this.touch()
}

// Projection coeffecient 
Dasher.prototype.coeff=function(dx){
	 return 1-Math.log(1-dx)
}

// Draw "Dasher" Box 
// Returns width of box, for use as x offset
Dasher.prototype.dBox=function(s,f,w0,h0,xoffs,yoffs,xo){
   var w=f*w0
   var h=f*h0
   var y=h0*0.05+this.pos.y

	 var dy=(y-this.cy)/h0-yoffs
	 var k=this.coeff(dy)*2

   //  draw  rectangle / stroke Rect
   this.rect(xo+k*(xoffs+this.pos.x),0,k*w,k*h)
   // draw text
   this.string(s,xo+k*(xoffs+this.pos.x),h*k,k*h,k*w)
	 
	 var xoi=xo+k*(xoffs+this.pos.x)

	 // next level
   for(var kx in this.prof.sorted){
			var f1=this.prof.f(this.prof.sorted[kx])
			var dy1=dy-1
			var k1=this.coeff(dy1)*2

			var w1=k*w*f1
			var h1=k*h*f1
	 
			this.rect(xoi,0,w1,h1)

			xoi+=w1
	 }

   return w
}
Dasher.prototype.dBoxI=function(s,f,w0,h0,xoffs,yoffs,xo){
   var w=f*w0
   var h=f*h0
   var y=h0*0.05+this.pos.y

	 var dy=(y-this.cy)/h0-yoffs
	 var k=this.coeff(dy)*2

	 if(k*(xoffs+this.pos.x+w)<0)
			return w

   //  draw  rectangle / stroke Rect
   this.rect(k*(xoffs),0,k*w,k*h)
   // draw text
   this.string(s,k*(xoffs),h*k,k*h,k*w)

   return w
}

Dasher.prototype.cursor=function(){
   var x=this.cx
   var y=this.cy
   var l=this.clen

   this.line(x-l,y,x+l,y)
   this.line(x,y-l,x,y+l)
}

Dasher.prototype.touchstart=function(){
   console.log("Dasher touchstart")
}

// update position
Dasher.prototype.update=function(){
	 if(!this.moving) return

	 // cursor
	 var c=new Victor(this.cx,this.cy)
	 // touch input
	 var i=new Victor(this.tx,this.ty)
	 i.subtract(c)
	 i.normalize()
	 i.invertY()
	 i.invertX()

	 var t=1.0/this.FPS
	 var d=t*this.v
	 i.multiply(new Victor(d,d))
	 
	 this.pos.add(i)
	 console.log(i)
}

Dasher.prototype.render=function(){
	 this.update()

   this.clear()

   // needs to be cleared for every render
	 var xoffs=0

   for(var k in this.prof.sorted){
      var f=this.prof.f(this.prof.sorted[k])
			var x0=xoffs

      xoffs+=this.dBox(this.prof.sorted[k],f,
				 this.w,this.h,xoffs,0,0)
   }

   // Draw cursor
   this.cursor()

	 // Draw dir vector
   if(this.moving){
      this.vector(this.cx,this.cy,this.tx,this.ty)
   }
}
