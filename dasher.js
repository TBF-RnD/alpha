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
   console.log(e.x)
   console.log(e.y)

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

// Draw "Dasher" Box 
Dasher.prototype.dBox=function(s,f){
//   console.log("DBOX @ f="+f)

   var w=f*this.w
   var h=f*this.h
// y - subject to change
   var y=this.h*0.2+this.pos.y

   //  draw  rectangle / stroke Rect
   this.rect(this.xoffs+this.pos.x,y,w,h)

   // draw text
   this.string(s,this.xoffs+this.pos.x,y+h,h,w)

   this.xoffs+=w
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
   this.xoffs=0

   for(var k in this.prof.sorted){
      var f=this.prof.f(this.prof.sorted[k])
//      console.log(this.prof.sorted[k]+" => "  +  f)

      this.dBox(this.prof.sorted[k],f)
   }

   // Draw cursor
    this.cursor()
//   console.log(this.tx)
//   console.log(this.ty)
   if(this.moving){
      console.log("moving")
      this.vector(this.cx,this.cy,this.tx,this.ty)
   }
}
